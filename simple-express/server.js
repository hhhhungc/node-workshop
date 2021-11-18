const { res } = require("express");
const cors = require("cors");
const express = require("express");
const connection = require("./utils/db");
const path = require("path");
require("dotenv").config();

// 利用 express 建立一個 express application
let app = express();

// 處理 cors 問題，後端必須要開放允許跨源請求
// 這樣跨源的前端才不會被瀏覽器檔下來
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true, //如果要把 credentials 設成 true，那origin就不能是 *
    })
);

// 啟用 session 機制
const expressSession = require("express-session");
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
    })
);

// 要使用這個中間件才可以讀到body的資料 (內建的)
// extended->body有巢狀結構才會用到
app.use(express.urlencoded({ extended: true }));
// 要使用這個中間件，才可以解析到json的資料
app.use(express.json());
// 用中間件來設定靜態檔案的位置，跟資料庫沒關-->圖片，前端的js css html ...
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "react")));

// app.use(handler) 使用中間件 middleware
app.use("/", (req, res, next) => {
    let current = new Date();
    // console.log(`有人來訪惹 ${current.toISOString()}`);
    console.log(`現在時間是 ${current.toLocaleString()}`);
    next();
});

// HTTP Method: get, post, put, patch, delete...
app.get("/", function (req, res, next) {
    res.send("<h1>Have a good day! Hello! 8/26禮拜四</h1>");
});

app.get("/about", function (req, res, next) {
    console.log("我是About");
    // 已經 res 所以就是終點，如果不呼叫 res 就沒有終點
    // res.send("About us ---A");
    // 沒有 res 終點，要加上next() 不然不會往下一個
    // next(); // 這樣會去下一個
    // next("去看看B"); // 這樣不會去下一個
    // 如果next中間有參數(不可以是router)，等於通知express有錯誤
    let isLogin = false;
    if (isLogin) {
        next();
    } else {
        // 如果每次有錯誤訊息都要自己寫太麻煩
        // res, status(500).json({ message: "NOT FOUND" });
        next({
            code: "330001",
            message: "沒有登入無法使用",
            status: 401,
        });
    }

    // next()的錯誤訊息，是可以自訂的
    next({
        code: "330002",
        message: "next() 中間有放參數，導致有錯誤",
        status: 500,
    });
});
app.get("/about", function (req, res, next) {
    res.send("About us ---BBB");
});

// 把stock這router引用進來
// 開頭是/stock都
let stockRouter = require("./routers/stock");
app.use("/stock", stockRouter);

// 引入auth router中間件
let authRouter = require("./routers/auth");
app.use("/auth", authRouter);

// 必須把錯誤的中間件放在最下面(捕捉前面所有錯誤)
// app.use((req, res, next) => {
//     // res.status(404).send("error message");
//     res.status(404).json({ message: "NOT FOUND" });
// });

// 超級特殊的中間件 middleware
// 有四個參數 err 捕捉錯誤用的(類似catch)
// 1. 沒有處理的exception
// 2. 流程上設計，想跳到這邊 --> next(xxx) 在next傳遞參數
const multer = require("multer");
app.use((err, req, res, next) => {
    console.error("來自四個參數的錯誤處理 ", err);

    // multer丟出來的錯誤有自己制定的格式
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ code: 320001, message: "檔案太大" });
        }
        return res.status(400).json({ message: err.message });
    }

    // 除果不符合上述特殊的錯誤類別，表示是我們自訂的

    // res.status(500).json({ message: "請洽系統管理員" });
    res.status(err.status).json({ message: err.message });
});

const port = 3001;
app.listen(port, async function () {
    // await connection.connectAsync();
    console.log(`我的web server ${port} 建立好囉～`);
});
