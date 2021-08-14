console.log("我是index");
let car = require("./car");
console.log("在car1之後");
let car2 = require("./car2");
console.log("在car2之後");

console.log(car2.getOwner());

// let car2 = require('./car2') 在car1已經引用過
// 在index 就不會再讀第二次（檢查記憶體裡面是否有被引用過）

// console.log(car)
// console.log(car.getBrand())
// console.log(car.getColor())
// console.log(car.getPrice())
// car.setOwner("Ruby")
// console.log(car.getOwner())
