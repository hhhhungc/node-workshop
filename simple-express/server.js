const { res } = require("express");
const cors = require("cors");
const express = require("express");
const connection = require("./utils/db");

// 利用 express 建立一個 express application
let app = express();

// 處理 cors 問題
app.use(cors());

// app.use(handler) 使用中間件 middleware
app.use("/about", (req, res, next) => {
    let current = new Date();
    console.log(`有人來訪惹 ${current.toISOString()}`);
    next();
});

// HTTP Method: get, post, put, patch, delete...
app.get("/", function (req, res, next) {
    res.send("<h1>Have a good day! Hello! 8/26禮拜四</h1>");
});

app.get("/about", function (req, res, next) {
    res.send("About us ---A");
});

app.use((req, res, next) => {
    console.log("到stock中間件^_^ ", req.originalUrl);
    next();
});

app.get("/stock", async function (req, res, next) {
    let result = await connection.queryAsync("SELECT * FROM stock");
    res.json(result);
});

app.get("/stock/:stockCode", async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT * FROM stock_price WHERE stock_id=? ORDER BY date DESC",
        [req.params.stockCode]
    );
    // 再多抓一個table的資料
    let stock = await connection.queryAsync(
        "SELECT * FROM stock WHERE stock_id=?",
        [req.params.stockCode]
    );

    if (stock.length > 0) {
        stock = stock[0];
    }
    // 要把新增的stock這個table這個資料也輸出
    res.json({ stock, result });
    // res.json(result)
});

// 錯誤的要放在最下面
app.use((req, res, next) => {
    // res.status(404).send("error message");
    res.status(404).json({ message: "NOT FOUND" });
});

app.listen(3001, async function () {
    // await connection.connectAsync();
    console.log("我的web server建立好囉～");
});
