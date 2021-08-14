const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
// 兩種引用方式都可以
// const { readFile } = require("fs");
// readFile ("stock.txt", "utf8",callback)

const mysql = require("mysql");
require("dotenv").config(); // 直接 require

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上");
    }
});

function getStockCode() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                reject(err);
            } else {
                resolve(stockCode);
            }
        });
    });
}

function getResponse(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode,
        },
    });
}

function getQuery(stockCode) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM stock WHERE stock_id = ?",
            [stockCode],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                // 因為職責劃分，不建議把錯誤放在這邊
                // if(results.length===0){
                //     reject("此筆股票資料不在資料庫裡!!!!!!!!");
                // }
                resolve(results);
            }
        );
    });
}

function insertPrice(parsedData) {
    return new Promise((resolve, reject) => {
        // ignore避免插入同樣資料的方法
        // '日期',     '成交股數',
        // '成交金額', '開盤價',
        // '最高價',   '最低價',
        // '收盤價',   '漲跌價差',
        // '成交筆數'
        connection.query(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUE ?",
            [parsedData],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                    // console.error(error)
                }
                // console.log(results);
                resolve(results);
            }
        );
    });
}

async function stockDay() {
    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        let stockCode = await getStockCode();

        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        let stockQuery = await getQuery(stockCode);
        if (stockQuery.length === 0) {
            // console.warn("此筆股票資料不在資料庫裡!");
            throw "此筆股票資料不在資料庫裡!";
        }
        // console.info("此筆資料有在資料庫裡");

        // 3. 如果是，才去證交所抓資料
        let response = await getResponse(stockCode);
        stockData = response.data;
        // console.log(stockData)
        if (stockData.stat !== "OK") {
            throw "證交所查到資料有誤";
        }
        let parsedData = stockData.data.map((item) => {
            item = item.map((value) => {
                // 處理千位符
                return value.replace(/,/g, "");
            });

            // 處理日期，民國 --> 西元 --> 轉數字 --> +19110000
            item[0] = parseInt(item[0].replace(/\//g, "")) + 19110000;

            // 因為資料庫有一個欄位需要知道，加上 stock_id
            item.unshift(stockCode);
            // console.log(item);
            return item;
        });
        // console.log(parsedData)

        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        let insertResult = await insertPrice(parsedData);
        console.log(insertResult);
    } catch (error) {
        console.log("**************");
        console.log(error);
    } finally {
        // 不關閉連線，認為程式一直在執行
        connection.end();
    }
}
stockDay();
