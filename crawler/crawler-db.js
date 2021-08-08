const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
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

// 不關閉連線，認為程式一直在執行
connection.end();

async function stockday() {
    let stockCode = await new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                // console.log(err);
                reject(err);
            } else {
                // console.log(stockCode);
                // 可以使用 .trim() 把空行過濾掉
                resolve(stockCode);
            }
        });
    });

    // let response = await axios.get(
    //     "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    //     {
    //         params: {
    //             response: "json",
    //             date: moment().format("YYYYMMDD"),
    //             stockNo: stockCode,
    //         },
    //     }
    // );
    // console.log(response.data.title);

    // connection.query('SELECT * FROM stock WHERE stock_id=?',[stockCode], function (error, results, fields) {
    //     if (error) throw error;
    //     // connected!
    //     console.log(results)
    //   });


}
stockday();
