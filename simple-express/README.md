# Express

-   NodeJS 的網站框架
-   由上往下
-   遇到 response 就結束了

1. 執行 npm 初始化

```js
npm init -f
```

2. 安裝 express

```js
npm i express
```

3. 使用 / 路由

```js
const express = require("express");
// 利用 express 建立一個 express application
let app = express();

app.get("/", function (req, res, next) {
    res.send("Hello");
});

app.listen(3000, function () {
    console.log("我們的web server啟動囉～");
});
```

4. 中間件 middleware

要記得 next() 才會往下走

```js
app.use((req, res, next) => {
    console.log("我是中間件^_^");
    next();
});
```

-   回應方法

| 方法       | 說明               |
| :--------- | ------------------ |
| res.send() | 傳送各種類型的回應 |
| res.json() | 傳送 JSON 回應     |

-   注意

```js
// 放兩個 /about 只會出現上面那個
app.get("/about", function (req, res, next) {
    res.send("About us ---A");
});
app.get("/about", function (req, res, next) {
    res.send("About us ---B");
});
```
