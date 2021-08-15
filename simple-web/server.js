// NodeJS有內建http
const http = require("http");

// client  ----> http request ---> web server
//         <---- http response <---
const server = http.createServer((request, response) => {
    let url = request.url;
    // console.log(request.url);
    switch (url) {
        case "/":
            rhesponse.end("<h1>Hello Hello!!</h1>");
            break;
        case "/about":
            response.end("About Web!!");
            break;
    }
});

// 告訴他port多少
server.listen(3000, () => {
    console.log("啟動web server了～");
});
