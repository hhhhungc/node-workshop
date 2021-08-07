// promise版本

const axios = require("axios");
const moment = require("moment");
let today = moment().format("YYYYMMDD");
const fs = require("fs");

new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
        if (err) {
            // console.log(err);
            reject(err);
        } else {
            // console.log(stockCode);
            resolve(stockCode);
        }
    });
})
    .then((stockCode) => {
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
            params: {
                response: "json",
                date: today,
                stockNo: stockCode,
            },
        });
    })
    .then((response) => {
        console.log(response.data.title);
    })
    .catch((err) => {
        console.log(err);
    });
