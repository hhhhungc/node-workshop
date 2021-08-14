let doWork = function (job, timer, isOK) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if (isOK) {
                // 成功
                reslove(`完成工作: ${job} at ${dt.toISOString()}`);
            } else {
                // 失敗
                reject(`出問題了: ${job}`);
            }
        }, timer);
    });
};

let job1 = doWork("刷牙", 5000, true);
let job2 = doWork("寫功課", 1000, true);
let job3 = doWork("打籃球", 3000, true);
let job4 = doWork("吃餅乾", 2000, true);

// Promise.all
// 丟一個陣列進去，全部執行完才會回傳，依照原本順序
Promise.all([job1, job2, job3, job4]).then((response) => {
    console.log("Promise.all ",response);
});

// Promise.race
// 只回傳最快完成的，但還是要等全部執行完才結束
Promise.race([job1, job2, job3, job4]).then((response) => {
    console.log("Promise.race ",response);
});
