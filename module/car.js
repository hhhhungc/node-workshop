// 模組化

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
    return price*0.9;
}
function getOwner(name) {
    return `${name}`;
}

// JS幫我們定義一個預設的空物件
// exports = module.exports = {};

// exports.getBrand = getBrand;
// exports.getColor = getColor;
// exports.getPrice = getPrice;
// exports.getOwner = getOwner;

// 如果這樣定義，在index執行時，只會得到空物件{}
// exports = {
//     getBrand: getBrand,
//     getColor: getColor,
//     getPrice: getPrice,
//     getOwner: getOwner,
// };

module.exports = {
    getBrand,
    getColor,
    getPrice,
    getOwner,
}

// JS幫我們回傳的是module.exports
// return module.exports;
