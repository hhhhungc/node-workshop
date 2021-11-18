// auth的模組
const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");

// 驗證
const { body, validationResult } = require("express-validator");
// 規則自己寫，可以把它當中間件直接丟進去
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

// multer 為了處理 multipart/form-data 需要用到其他中間件
// 上傳，要告訴他上傳的檔案存在哪裡
// 通常存在硬碟 --> diskStorage
const multer = require("multer");
const storage = multer.diskStorage({
    // 設定儲存的目的地
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    // 檔案命名(用原本的名字)
    filename: function (req, file, cb) {
        // console.log(file);
        // {
        //     fieldname: 'photo',
        //     originalname: 'disney.jpeg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg'
        // }
        // console.log(file.originalname); //抓到原本檔案名

        // 抓到副檔名，原本檔名用split拆開，抓 . 後面的 = 副檔名
        let subName = file.originalname.split(".").pop();
        // console.log(subName);

        // 取新檔名，每個頁面建一個資料夾member-用現在的時間Date.now()
        let newPhotoName = `member-${Date.now()}.${subName}`;
        // console.log(newPhotoName);

        // cb(error, 新名字)
        // cb(null, file.originalname);
        cb(null, newPhotoName); // ---> 就會有新的filename
    },
});

// 真正使用multer
const uploader = multer({
    storage: storage,
    //檔案驗證(很重要)
    fileFiter: function (req, file, cb) {
        // console.log(file.mimetype);
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
        // 1M  1024 * 1024,
        // 1K  1024
        fileSize: 1024 * 1024,
    },
});

// 路由的中間件，指定某一個路由，塞在真正處理函式前面
// app.post("path", "中間件1(真正的處理函示)")
// app.post("path", "中間件1", "中間件2",...,"中間件N(真正的處理函示)")
// 1.建立好路由
router.post(
    "/register",
    // multer中間件，必須放在validation中間件前面
    // 因為現正規則需要使用到解譯後的資料，所以需要先經過multer
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

        // 檢查帳號是否重複
        let member = await connection.queryAsync(
            "SELECT * FROM members WHERE email=?;",
            [req.body.email]
        );
        // member.length > 0 代表資料庫有資料，跳去預設的錯誤處理
        if (member.length > 0) {
            return next({
                code: "330002",
                message: "此帳號已經被註冊過",
                status: 400,
            });
        }

        // 2.確認資料有沒有拿到，前端傳來所以是request
        console.log(req.body);
        // {
        //     name: 'Ruby',
        //     email: 'ruby1@test.com',
        //     password: 'tester',
        //     confirmPassword: 'tester',
        //     photo: ''
        // }

        // 確認file有拿到(如果Multer有成功的話)
        // console.log(req.file);
        // {
        //     fieldname: 'photo',
        //     originalname: 'pika.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg',
        //     destination: '/Users/hung/git/node-workshop/simple-express/public/uploads',
        //     filename: 'member-1631179453267.jpg',
        //     path: '/Users/hung/git/node-workshop/simple-express/public/uploads/member-1631179453267.jpg',
        //     size: 19393
        // }

        // 會上傳存進資料庫的檔名，存成網址存取的目錄
        let filename = req.file ? "/uploads/" + req.file.filename : "";
        // console.log(filename);

        // 3.存進資料庫
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        let result = await connection.queryAsync(
            "INSERT INTO members (email,name,password,photo) VALUE (?)",
            [[req.body.email, req.body.name, hashPassword, filename]]
        );
        res.json({});
    }
);

// 登入
router.post("/login", async (req, res, next) => {
    console.log(req.body);
    // { email: 'ruby@test.com', password: 'tester' }
    // 1.確認有沒有帳號
    //   -> 如果沒有這個帳號回覆錯誤400

    // 檢查帳號是否重複
    // 測試1: 有註冊過的email
    // 測試2: 沒有註冊過的email
    let member = await connection.queryAsync(
        "SELECT * FROM members WHERE email=?;",
        [req.body.email]
    );
    // console.log(member);
    // [
    //     RowDataPacket {
    //       id: 1,
    //       email: 'ruby@test.com',
    //       password: '$2b$10$pgEOwusPLqglW3KImI26ROCbwFPh4G1tOixzzSBco9VoyM4Mfz/Ha',
    //       name: 'Ruby',
    //       photo: '/uploads/member-1631248237196.jpg',
    //       update_date: '2021-09-10 12:30:37',
    //       created_at: '2021-09-10 12:30:37'
    //     }
    // ]
    // 透過陣列長度去檢查 member.length === 0 代表資料庫沒有資料
    if (member.length === 0) {
        return next({
            message: "找不到帳號",
            status: 400,
        });
    }
    // 有找到，應該只有一個，因為註冊的時候有擋email是否重複
    member = member[0];

    // 2.密碼比對
    //   --> 不一致，回覆錯誤400
    //   --> 使用這個套件底層的方法驗證 bcrypt.compare
    //   --> 測試1: 密碼對
    //   --> 測試2: 密碼錯
    let result = await bcrypt.compare(req.body.password, member.password);
    if (!result) {
        return next({
            message: "密碼錯誤",
            status: 400,
        });
    }

    // 有帳號且密碼正確
    //   -> 紀錄session
    //   -> CSR 回覆成功訊息 (前端自己決定)
    let returnMember = {
        id: member.id,
        email: member.email,
        name: member.name,
        photo: member.photo,
    };
    req.session.member = returnMember;
    res.json({ returnMember });
});
module.exports = router;
