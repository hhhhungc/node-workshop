// await/async 版

const axios = require("axios");
const moment = require("moment");
let today = moment().format("YYYYMMDD");
const fs = require("fs");

// 1. 用 async / await 直接包起來
async function stockday() {
    let stockCode = await new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                // console.log(err);
                reject(err);
            } else {
                // console.log(stockCode);
                resolve(stockCode);
            }
        });
    });

    let response = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
        {
            params: {
                response: "json",
                date: today,
                stockNo: stockCode,
            },
        }
    );
    console.log(response.data.title);
}
stockday();


// 2. 用 function 先包起來，後面再用 async 讓程式更好讀
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

// function getResponse(stockCode) {
//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//         params: {
//             response: "json",
//             date: today,
//             stockNo: stockCode,
//         },
//     });
// }

// async function stockDay() {
//     try {
//         let stockCode = await getStockCode();
//         let response = await getResponse(stockCode);
//         console.log(response.data.title);
//     } catch (error) {
//         console.log(error);
//     }
// }
// stockDay();
