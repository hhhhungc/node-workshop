// 這裡是stock router的模組
const express = require("express");
const router = express.Router();
// 慣用寫法都會用router
// router就是一個在app底下的小app
// 也是中間件
const connection = require("../utils/db");

// let app = express();
// app.use
// app.get
// app.post
// router.use()
// router.get
// router.post

router.use("/", (req, res, next) => {
    console.log("到stock中間件^_^ ", req.originalUrl);
    next();
});

router.get("/", async function (req, res, next) {
    let result = await connection.queryAsync("SELECT * FROM stock");
    res.json(result);
});

// 前端告訴後端我在第幾頁，後端給出該頁的資料
// 後端分頁/stock/2330?page=1
router.get("/:stockCode", async (req, res, next) => {
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

module.exports = router;
