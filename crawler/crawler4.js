// file system Promise版 + mysql2 Promise版

const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql2/promise");
require("dotenv").config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//     if (err) {
//         console.error("資料庫連不上");
//     }
// });

// function getStockCode() {
//     return new Promise((resolve, reject) => {
//         fs.readFile("stock.txt", "utf8", (err, stockCode) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(stockCode);
//             }
//         });
//     });
// }

// function getQuery(stockCode) {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             "SELECT * FROM stock WHERE stock_id = ?",
//             [stockCode],
//             function (error, results, fields) {
//                 if (error) {
//                     reject(error);
//                 }
//                 resolve(results);
//             }
//         );
//     });
// }

// function insertPrice(parsedData) {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUE ?",
//             [parsedData],
//             function (error, results, fields) {
//                 if (error) {
//                     reject(error);
//                 }
//                 resolve(results);
//             }
//         );
//     });
// }

function getResponse(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode,
        },
    });
}

async function stockDay() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    connection.connect((err) => {
        if (err) {
            console.error("資料庫連接有問題");
        }
    });

    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        let stockCode = await fs.readFile("stock.txt", "utf8");
        // console.log("stockCode: ", stockCode);

        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        // let stockQuery = await getQuery(stockCode);

        let [stockQuery, fields] = await connection.execute(
            "SELECT * FROM stock WHERE stock_id = ?",
            [stockCode]
        );
        if (stockQuery.length === 0) {
            throw "此股票代碼不在資料庫內，請確認";
        }

        // 3. 如果是，才去證交所抓資料
        let response = await getResponse(stockCode);
        let stockData = response.data;

        if (stockData.stat !== "OK") {
            console.log("證交所資料有問題，請確認");
        }

        parsedData = stockData.data.map((item) => {
            item = item.map((num) => {
                return num.replace(/,/g, "");
            });
            item[0] = parseInt(item[0].replace(/\//g, "")) + 19110000;
            item.unshift(stockCode);
            return item;
        });
        // console.log(parsedData);

        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        const [rows, fields2] = await connection.query(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUE ?",
            [parsedData]
        );
        console.log(rows);
    } catch (error) {
        console.log(error);
    } finally {
        connection.end();
    }
}
stockDay();
