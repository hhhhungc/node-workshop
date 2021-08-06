// Promise 是一個表示非同步運算的「最終」完成或失敗的物件。
//  最終成功
//  最終失敗
//  new Promise

let doWork = function (job, timer, isOK) {
    // 解決：callback hell
    // --> 把callback 改用 promise
    // 物件：new Promise();
    // 建構式一定要傳入一個函式，而且這個函式本身有兩個參數resolve, reject

    return new Promise((reslove, reject) => {
        // 模擬一個非同步工作
        // console.log("in promise"); // 是同步進行的
        setTimeout(() => {
            let dt = new Date();
            if (isOK) {
                // 當這個非同步工作成功，呼叫 resolve 並且把結果傳出去
                // cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
                reslove(`完成工作: ${job} at ${dt.toISOString()}`);
            } else {
                // 當這個非同步工作失敗，呼叫 reject 把失敗原因傳出去
                reject(`出問題了: ${job}`);
            }
        }, timer);
    });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課
// doWork回傳的是 ==> promise物件
// 用then() 來接收"然後"的結果

let job1 = doWork("刷牙", 3000, true);
// console.log(job1); // =>pending
job1.then(
    function (resolve) {
        // 接收成功的回覆
        console.log("第一個函式被呼叫了", resolve);
    },
    function (reject) {
        // 接收失敗的回覆
        console.log("第一個函式被呼叫了", reject);
    }
);

// 原本的callback hell
// doWork("刷牙", 3000, function (err, data) {
//     // 刷完牙後會被回呼的函示（已經刷完牙）
//     if (err) {
//         console.log("發生錯誤了:", err);
//         return;
//     }
//     console.log(data);
//     doWork("吃早餐", 5000, function (err, data) {
//         // 已經吃完早餐
//         if (err) {
//             console.log("發生錯誤了:", err);
//             return;
//         }
//         console.log(data);
//         doWork("寫功課", 3000, function (err, data) {
//             if (err) {
//                 console.log("發生錯誤了:", err);
//                 return;
//             }
//             console.log(data);
//         });
//     });
// });