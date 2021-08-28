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

app.use((req, res, next) => {
    console.log("到stock中間件^_^ ", req.originalUrl);
    next();
});

app.get("/stock", async function (req, res, next) {
    let result = await connection.queryAsync("SELECT * FROM stock");
    res.json(result);
});

// 前端告訴後端我在第幾頁，後端給出該頁的資料
// 後端分頁/stock/2330?page=1
app.get("/stock/:stockCode", async (req, res, next) => {
    // req.params.stockCode
    // req.query.page

    // 1.設定page變數，目前在第幾頁，預設第一頁，每一頁幾筆
    let page = req.query.page || 1;
    const perPage = 10;

    // 2.總共有幾筆 用sql的語法 COUNT
    let count = await connection.queryAsync(
        "SELECT COUNT(*) AS total FROM stock_price WHERE stock_id=?",
        [req.params.stockCode]
    );
    // console.log(count);
    // [ RowDataPacket { total: 36 } ]
    const totalCount = count[0].total;
    console.log(totalCount);

    // 3.總共有幾頁，無條件進位Math.ceil
    const totalPage = Math.ceil(totalCount / perPage);
    console.log(totalPage);

    // 4.取得這頁的資料
    // LIMIT 要取幾筆資料(這一頁要幾筆資料)
    // OFFSET 要跳過多少(跳過perPage)
    let offset = (page - 1) * perPage;
    let result = await connection.queryAsync(
        "SELECT * FROM stock_price WHERE stock_id=? ORDER BY date  LIMIT ? OFFSET ? ",
        [req.params.stockCode, perPage, offset]
    );
    let pagination = {
        totalCount, //總共幾筆
        perPage, //一頁幾筆
        totalPage, //總共幾頁(最後一頁)
        page, //目前在第幾頁
    };
    // let result = await connection.queryAsync(
    //     "SELECT * FROM stock_price WHERE stock_id=? ORDER BY date DESC ",
    //     [req.params.stockCode]
    // );

    // 再多抓一個table的資料
    let stock = await connection.queryAsync(
        "SELECT * FROM stock WHERE stock_id=?",
        [req.params.stockCode]
    );

    if (stock.length > 0) {
        stock = stock[0];
    }
    // 要把新增的stock這個table這個資料也輸出
    // res.json({ stock, result });
    res.json({ stock, pagination, result });
    // res.json(result)
});

//驗證
const { body, validationResult } = require("express-validator");
//規則自己寫，可以把它當中間件直接丟進去
const registerRules = [
    body("email").isEmail().withMessage("Email 不符合格式"),
    body("password").isLength({ min: 6 }).withMessage("密碼至少六碼"),
    body("confirmPassword")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("兩次輸入密碼不一致"),
];

// 密碼加密bcrypt.hash(正常,salt)
const bcrypt = require("bcrypt");

// app.post("path", "中間件1(真正的處理函示)")
// app.post("path", "中間件1", "中間件2",...,"中間件(真正的處理函示)")
// 1.建立好路由
app.post("/auth/register", registerRules, async (req, res, next) => {
    const validateResult = validationResult(req);
    // console.log(validateResult);
    // 有訊息=有錯=驗證不通過，把錯誤拿出來回覆前端第一個錯誤error[0]
    if (!validateResult.isEmpty()) {
        let error = validateResult.array();
        console.log(error);
        // 回覆的json格式自己設計
        return res
            .status(400)
            .json({ field: error[0].param, message: error[0].msg });
    }
    // 2.確認資料有沒有拿到
    console.log(req.body);
    // 3.存進資料庫
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await connection.queryAsync(
        "INSERT INTO members (email,name,password) VALUE (?)",
        [[req.body.email, req.body.name, hashPassword]]
    );
    res.json({});
});

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
