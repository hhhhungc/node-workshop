# promise

解決 callback hell --> 改用 Promise

Promise 是一個表示非同步運算的「最終」完成或失敗的物件。

- 非同步
- 物件 --> new Promise();
- 最終完成 --> 成功的時候，呼叫 resolve
- 最終失敗 --> 失敗的時候，呼叫 reject

Promise 物件本身會有三個狀態

- 擱置（pending）：初始狀態，不是 fulfilled 與 rejected。
- 實現（fulfilled）：表示操作成功地完成。
- 拒絕（rejected）：表示操作失敗了。

```javascript
job1
    .then((resolve) => {
        console.log("第1個函式", resolve);
    })
    .catch((reject) => {
        console.log("第1個函式", reject);
    })
    .finally(()=>{
        console.log("finally")
    });
```

### Promise.then

然後做什麼事（兩個參數，第一個是負責成功，第二個負責失敗），會回傳一個promise

### Promise.catch

負責捕捉失敗，會回傳一個promise

### Promise.finally

無論結果如何都會回傳

---

## Async / Await
promise的語法糖，await 一定要在 async 裡面使用

await 等到後面那個promise物件的狀態變成fulfilled

```js
async function oneDay(){
    let job1=await doWork("刷牙", 3000, true);
    console.log(job1);
}
oneDay();
```
