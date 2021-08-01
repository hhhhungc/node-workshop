console.log("Hello World");

// 1+2+...+n
// 方法1
function sum2(n){
    return (n+1)*n/2
}
console.log(sum2(10));

// 方法2
function sum(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}
console.log(sum(1));
console.log(sum(2));
console.log(sum(10));