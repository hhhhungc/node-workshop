async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 0);
    });
    console.log(3);
}

console.log(4);
asyncF();
console.log(5);

// 4, 1, 5, 2, 3

// 先印出 L12 (4)
// 下一個呼叫 L13 -> L1 -> 印出L2 (1)
// 依序執行 L3 -> 遇到 await Promise 丟給暗樁
// 印出 L14 (5)
// stack 空了，eventloop 才會把工作搬到 stack -> 印出 L5 (2)
// 印出 L9 (3)