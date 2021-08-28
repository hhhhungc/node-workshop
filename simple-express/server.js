const { res } = require("express");
const cors = require("cors");
const express = require("express");
const connection = require("./utils/db");
// 利用 express 建立一個 express application
let app = express();

// 處理 cors 問題
app.use(cors());

// 要使用這個中間件才可以讀到body的資料 (內建的)
app.use(express.urlencoded({ extended: true }));

// 要使用這個中間件，才可以解析到json的資料
app.use(express.json());

// app.use(handler) 使用中間件 middleware
app.use("/", (req, res, next) => {
    let current = new Date();
    console.log(`有人來訪惹 ${current.toISOString()}`);
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
        next({
            code: "330001",
            message: "沒有登入無法使用",
            status: 401,
        });
    }
    // next()的錯誤訊息，是可以自訂的
    next({
        code: "330001",
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
app.use((err, req, res, next) => {
    console.log(err);
    // res.status(500).json({ message: "請洽系統管理員" });
    res.status(err.status).json({ message: err.message });
});

app.listen(3001, async function () {
    // await connection.connectAsync();
    console.log("我的web server建立好囉～");
});
