// then, catch, finally

let doWork = function (job, timer, isOK) {
    return new Promise((reslove, reject) => {
        // console.log("test")
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
// let job2 = doWork("吃早餐", 5000, true); //寫在這邊，在doWork時就立刻執行Promise
// let job3 = doWork("寫功課", 2000, true);
// console.log(job1); // =>pending
job1
    .then((resolve) => {
        console.log("第1個函式", resolve);
        // return 1; // 會包成 promise 物件 => Promise.resolve(1)
        // return job2;
        return doWork("吃早餐", 5000, true);
    })
    .then((resolve) => {
        console.log("第2個函式", resolve);
        return doWork("寫功課", 3000, false);
    })
    .then((resolve) => {
        console.log("第3個函式", resolve);
        return doWork("睡午覺", 3000, true);
    })
    .then((resolve) => {
        console.log("第4個函式", resolve);
    })
    .catch((reject) => {
        // 捕捉失敗，捕捉前面所有 promise 物件的 reject，統一集中在這裡處理錯誤
        console.log("第1個函式", reject);
    })
    .finally(()=>{
        // console.log("finally")
        // 不管成功或失敗，都會執行
    });

    
// let p2 = job1.then(() => {
//     // 處理成功的情況
// });
// // p2也是一個promise物件
// let p3 = p2.catch((error) => {});

// // p3也是一個promise物件
// p3.finally(() => {
// });
