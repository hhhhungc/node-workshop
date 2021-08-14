function TWSEData(stockCode, rawData) {
    // 通常未處理的資料會叫 rawData
    return rawData.map((item) => {
        item = item.map((value) => {
            // 處理千位符
            return value.replace(/,/g, "");
        });

        // 處理日期，民國 --> 西元 --> 轉數字 --> +19110000
        item[0] = parseInt(item[0].replace(/\//g, "")) + 19110000;

        // 因為資料庫有一個欄位需要知道，加上 stock_id
        item.unshift(stockCode);
        // console.log(item);
        return item;
    });
}

// 因為之後可能會擴充其他方法，所以使用物件方式
module.exports = { TWSEData };
