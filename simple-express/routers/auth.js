// auth的模組
const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
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

// 為了處理 multipart/form-data 需要用到其他中間件
// 上傳，要告訴他上傳的檔案存在哪裡
// 通常存在硬碟 --> diskStorage
const multer = require("multer");
const { raw } = require("mysql");
const storage = multer.diskStorage({
    // 設定儲存的目的地
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../", "public", "uploads"));
    },
    // 檔案命名(用原本的名字)
    filename: function (res, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});

// 真正使用multer
const uploader = multer({
    storage: storage,
    //檔案驗證(很重要)
    fileFiter: function (req, file, cb) {
        console.log(file.mimetype);
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/jpg" &&
            file.mimetype !== "image/png"
        ) {
            cb(new Error("不接受的檔案類型"), false);
        }
        cb(null, true);
    },
    //檔案大小
    limits: {
        // 1M
        fileSize: 1024 * 1024,
    },
});

// app.post("path", "中間件1(真正的處理函示)")
// app.post("path", "中間件1", "中間件2",...,"中間件(真正的處理函示)")
// 1.建立好路由
router.post(
    "/register",
    // multer中間件，必須放在validation中間件前面
    uploader.single("photo"),
    registerRules,
    async (req, res, next) => {
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

        // 確認file有拿到(如果Multer有成功的話)
        console.log(req.file);

        // 3.存進資料庫
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        let result = await connection.queryAsync(
            "INSERT INTO members (email,name,password) VALUE (?)",
            [[req.body.email, req.body.name, hashPassword]]
        );
        res.json({});
    }
);

module.exports = router;
