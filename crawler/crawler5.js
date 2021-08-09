// file system Promise版 + mysql2 Promise版
// createPool版 ??

const axios = require("axios");
const moment = require("moment");
// const fs = require("fs");
const fs = require("fs/promises");
// const mysql = require("mysql");
const mysql = require("mysql2");

require("dotenv").config();

// const connection = mysql.createConnection({
// host: process.env.DB_HOST,
// user: process.env.DB_USER,
// port: process.env.DB_PORT,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME,
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
//     // return new Promise((resolve, reject) => {
//     //     connection.query(
//     //         "SELECT * FROM stock WHERE stock_id =?",
//     //         [stockCode],
//     //         function (error, results, fields) {
//     //             if (error) {
//     //                 reject(error);
//     //             }
//     //             resolve(results);
//     //             // console.log(results);
//     //         }
//     //     );
//     // });
// }

// function insertSQL(parseddata) {
//     return new Promise((resolve, reject) => {
//         promisePool.query(
//             "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUE ?",
//             [parseddata],
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
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    const promisePool = pool.promise();

    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        // let stockCode = await getStockCode(); // fs改promise版
        let stockCode = await fs.readFile("stock.txt", "utf8");
        // console.log("stockCode :", stockCode);

        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        // let stockQuery = await getQuery(stockCode); // mysql1改mysql2版
        let [rows] = await promisePool.query(
            "SELECT * FROM stock WHERE stock_id =?",
            [stockCode]
        );
        // console.log("資料庫連線成功", rows);

        if (rows.length === 0) {
            // console.warn("此筆股票資料不在資料庫裡!");
            throw "此筆股票資料不在資料庫裡!";
        }

        // 3. 如果是，才去證交所抓資料
        let response = await getResponse(stockCode);
        let stockData = response.data;
        if (stockData.stat !== "OK") {
            console.log("證交所資料有問題");
        }
        let parseddata = stockData.data.map((item) => {
            item = item.map((value) => {
                return value.replace(/,/g, "");
            });

            item[0] = parseInt(item[0].replace(/\//g, "")) + 19110000;
            item.unshift(stockCode);
            return item;
            // console.log(item);
        });
        // console.log(parseddata);

        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        // let results = await insertSQL(parseddata);
        let [insertResult] = await promisePool.query(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUE ?",
            [parseddata]
        );

        console.log(insertResult);
    } catch (error) {
        console.log(error);
    } finally {
        // 不關閉連線，認為程式一直在執行
        // connection.end();
        pool.end();
    }
}
stockDay();
