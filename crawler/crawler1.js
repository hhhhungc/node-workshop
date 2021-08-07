// cb版本

const axios = require("axios");
const moment = require("moment");

let today = moment().format("YYYYMMDD");
const fs = require("fs");

fs.readFile("stock.txt", "utf8", (err, stockCode) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(stockCode);
        axios
            .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
                params: {
                    response: "json",
                    date: today,
                    stockNo: stockCode,
                },
            })
            .then((response) => {
                console.log(response.data.title);
            });
    }
});
