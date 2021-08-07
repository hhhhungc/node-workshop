// 多個job同時進行，沒有達成，因為非同步

let doWork = function (job, timer, isOK) {
    return new Promise((reslove, reject) => {
        // 模擬一個非同步工作
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

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課


let job1 = doWork("刷牙", 3000, true);
// console.log(job1); // =>pending
job1.then(
    (resolve) => {
        console.log("第1個函式被呼叫了", resolve);
    // console.log(job1);
    },
    (reject) => {
        console.log("第1個函式被呼叫了", reject);
    // console.log(job1); // false的時候會變成 rejected
    }
);

let job2 = doWork("吃早餐", 5000, false);
job2.then(
    (resolve) => {
        console.log("第2個函式被呼叫了", resolve);
    },
    (reject) => {
        console.log("第2個函式被呼叫了", reject);
    }
);

let job3 = doWork("寫功課", 5000, true);
job3.then(
    (resolve) => {
        console.log("第3個函式被呼叫了", resolve);
    },
    (reject) => {
        console.log("第3個函式被呼叫了", reject);
    }
);
