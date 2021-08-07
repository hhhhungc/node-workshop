// await / async

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

// await / async
// await 等到後面那個promise物件的狀態變成fulfilled
// await 一定要在async裡面用

async function oneDay(){
    let job1=await doWork("刷牙", 3000, true);
    console.log(job1);
    let job2=await doWork("吃早餐", 3000, true)
    console.log(job2);
    let job3=await doWork("睡午覺", 3000, true)
    console.log(job3);
}
oneDay();

// doWork("刷牙", 3000, true)
//     .then((resolve) => {
//         console.log("第1個函式", resolve);
//         return doWork("吃早餐", 5000, true);
//     })
//     .then((resolve) => {
//         console.log("第2個函式", resolve);
//         return doWork("寫功課", 3000, true);
//     })
//     .then((resolve) => {
//         console.log("第3個函式", resolve);
//         return doWork("睡午覺", 3000, true);
//     })
//     .then((resolve) => {
//         console.log("第4個函式", resolve);
//     })
//     .catch((reject) => {
//         console.log("第1個函式", reject);
//     })
//     .finally(()=>{
//         // console.log("finally")
//     });