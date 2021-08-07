// 請問下列程式碼印出的順序為何？

function syncF() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 0);
    console.log(3);
}

console.log(4);
syncF();
console.log(5);

// 4, 1, 3, 5, 2

// 先印出 L12 (4)
// 下一個呼叫 L13 -> L3 -> 印出L4 (1)
// 依序執行 L6 (setTimeout) -> 丟給暗樁 (在 nodeJS 不是叫 webapi )
// 印出 L9 (3)
// 印出 L14 (5)
// stack 都空了，eventloop 才會把工作搬到 stack -> 執行 L6 -> 印出 L7 (2)
