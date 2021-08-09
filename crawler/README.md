# 爬蟲專案

## 如何使用

1. 建立設定檔案，修改裡面的設定

```bash
複製 .env.example 到 .env
```

---

## 使用套件注意事項

1. 安裝套件 $ npm i { 套件名稱 }
2. 可以從 package.json 確認是否安裝成功
3. 引用 $ const fs = require("fs");
4. 如果是 npm 內建的，直接引用 require("dotenv").config();
5. 看文件QQQ

## Promise 寫法

1. 做出 Promise 基本版型
2. 把非同步工作搬進來（但還是非同步），只是改變工作回傳的方式
3. 找到原本處理成功的地方，用 resolve 把結果傳出去
4. 找到原本處理失敗的地方，用 reject 把結果傳出去
5. 用 then 的第一個參數來接住 resolve （then可是一個chain）
6. 用 catch 來統一處理 reject

## await / async 寫法

1. 加一個變數，把 .then 斷掉
2. 把下一個 Promise 拿出來
3. 最後想做的事情拿出來

## 別相信任何人!!!!!
