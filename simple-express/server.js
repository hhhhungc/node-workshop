const { response } = require("express");
const express = require("express");

// 利用 express 建立一個 express application
let app = express();

// HTTP Method: get, post, put, patch, delete
app.get("/", function (request, response, next) {
    response.send("Have a good day!");
});

// 再建一個頁面
app.get("/about", function (request, response, next) {
    response.send("About us ---");
});

app.listen(3000, function () {
    console.log("我的web server建立好囉～");
});
