const { response } = require("express");
const express = require("express");

// 利用 express 建立一個 express application
let app = express();

// app.use(handler) 使用中間件 middle
app.use((requset, response, next) => {
    let current = new Date();
    console.log(`第一個中間件來惹 ${current.toISOString()}`);
    next();
});

app.use((requset, response, next) => {
    console.log("第二個中間件^_^");
    next();
});

// HTTP Method: get, post, put, patch, delete
app.get("/", function (request, response, next) {
    response.send("<h1>Have a good day! Hello!</h1>");
});

// 遇到response就結束，由上往下，放兩個只會出現上面那個
// 再建一個頁面
app.get("/about", function (request, response, next) {
    response.send("About us ---A");
});
app.get("/about", function (request, response, next) {
    response.send("About us ---B");
});

app.listen(3000, function () {
    console.log("我的web server建立好囉～");
});
