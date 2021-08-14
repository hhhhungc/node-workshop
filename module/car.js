// 模組化
console.log("我是car1");
let car2 = require("./car2");

car2.setOwner("car1的");

// 在 L3 讀取 ("./car2") --> 執行 L5 --> 在 car2 就 setOwner
// 回到index 就不會重複讀取 ("./car2")

let brand = "TESLA";
let color = "white";
let price = 10000;
let owner = "";

function getBrand() {
    return brand;
}
function getColor() {
    return color;
}
function getPrice() {
    return price * 0.9;
}
function setOwner(name) {
    return (owner = name);
}

// JS幫我們定義一個空的物件
// exports = module.exports = {};

// 透過 exports 匯出函式 (封裝)
// 下面兩個其實是一樣的
// exports.getBrand = getBrand;
// module.exports.getBrand = getBrand;

// 在原本的 {} 中，加一個新的屬性而已
// exports.getColor = getColor;
// exports.getPrice = getPrice;
// exports.setOwner = setOwner;

// 一個一個設定很煩，直接給他一個物件，但這樣定義在index執行時，只會得到空物件{}
// exports = {
//     getBrand: getBrand,
//     getColor: getColor,
//     getPrice: getPrice,
//     setOwner: setOwner,
// };

module.exports = {
    getBrand,
    getColor,
    getPrice,
    setOwner,
};

// JS幫我們回傳的是module.exports
// return module.exports;
