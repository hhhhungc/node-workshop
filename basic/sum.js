console.log("Hello World");

// 回傳 1 + 2 + ... + n 的結果

// 方法1
function sum2(n) {
  // n = 10 ==> 1
  // n = 1000 ==>1
  // O(1) 不管 n 是多少，執行速度是一個"常數"
  return ((n + 1) * n) / 2;
}
// console.log(sum2(10));

// 方法2
function sum1(n) {
  // n = 10  ===> 10秒
  // n = 100 ===> 100秒
  // 成正比的關係
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
}
// console.log(sum1(1));
// console.log(sum1(2));
// console.log(sum1(10));

console.time("SUM1");
for (let i = 1; i <= 10000; i++) {
    sum1(10);
}
console.timeEnd("SUM1");

console.time("SUM2");
for (let i = 1; i <= 10000; i++) {
    sum2(10);
}
console.timeEnd("SUM2");