console.log("我是car2");

let owner = "car2的";

module.exports = {
    // set 設定
    setOwner: function (name) {
        owner = name;
    },
    // get 取得資料
    getOwner: function () {
        return owner;
    },
};
