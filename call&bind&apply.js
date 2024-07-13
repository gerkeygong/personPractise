const arr = [1, 3, 4, 5, 2]
// const newArr = arr.slice(1, 3)
// console.log(newArr)
const newArr = Array.prototype.slice.call(arr, 1, 3);
const newArr1 = Array.prototype.slice.apply(arr, [1, 3]);
console.log(newArr)
console.log(newArr1)
// 1. call apply 作用就是绑定this指向，立即执行。参数格式不同
const newSlice = Array.prototype.slice.bind(arr);
console.log(newSlice(1, 3))
// 2. bind 作用就是绑定this指向-> 返回一个新的函数
// 3. call apply bind 都是函数原型上的方法

