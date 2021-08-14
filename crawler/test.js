//test test

// function build(data) {
//     return new Promise((resolve, reject) => {
//         data.map((item) => {
//             console.log("In promise");
//             console.log("before resolve");
//             resolve(item * 2);
//         });
//     });
// }
// (async () => {
//     let result = await build([1, 3, 5]);
//     console.log(result);
// })();

// In promise
// before resolve
// In promise
// before resolve
// In promise
// before resolve
// 2

// 測試1 for-loop --------------------
function double(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i * 2);
        }, 0);
    });
}

(async () => {
    let data1 = [1, 3, 5, 7];
    for (let i = 0; i < data1.length; i++) {
        data1[i] = await double(data1[i]);
    }
    console.log("test1: ", data1);
})();

test1: [2, 6, 10, 14];

// 測試2 map --------------------
let data2 = [1, 3, 5, 7];
data2 = data2.map(async (d) => {
    let result = await double(d);
    return result;
});
console.log("test2: ", data2);

// test2:  [
//     Promise { <pending> },
//     Promise { <pending> },
//     Promise { <pending> },
//     Promise { <pending> }
// ]

//測試3 forEach --------------------
let data3 = [1, 3, 5, 7];
data3.forEach(async (d, i) => {
    data3[i] = await double(d);
});
console.log("test3: ", data3);
//test3:  [ 1, 3, 5, 7 ]
