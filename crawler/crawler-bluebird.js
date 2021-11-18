const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const connection = require("./utils/db");
const { TWSEData } = require("./utils/TWSEData");

function getResponse(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode,
        },
    });
}

(async () => {
    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        let stockCode = await fs.readFile("stock.txt", "utf8");
        // console.log(stockCode);

        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        await connection.connectAsync();
        let stockQuery = await connection.queryAsync(
            "SELECT * FROM stock WHERE stock_id = ?",
            [stockCode]
        );
        // console.log(stockQuery);
        if (stockQuery.length === 0) {
            throw 此股票代碼不在資料庫內;
        }

        // 3. 如果是，才去證交所抓資料
        let response = await getResponse(stockCode);
        let stockData = response.data;
        if (stockData.stat !== "OK") {
            console.log("此股票代碼有問題，請洽證交所");
        }
        let parsedData = TWSEData(stockCode, stockData.data);
        console.log(parsedData);

        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        let insertResult = await connection.queryAsync(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUE ?",
            [parsedData]
        );
        console.log(insertResult);
    } catch (error) {
        console.log(error);
    } finally {
        connection.end();
    }
})();
