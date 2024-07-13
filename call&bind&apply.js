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


function fn(a, b, c, d) {
    console.log(a, b, c, d)
    console.log(this)
    return 123
}
// const newFn = fn.bind('ctx', 1, 2)
// newFn(3, 4)

// 手写bind函数
// 目的: fn.bind 返回一个函数：1.修改原本这个函数的上下文this 2. 将新函数参数和原本函数的参数 都打印出来
Function.prototype.myBind = function (ctx) {
    // 思路1: 获取传入myBind上面的参数（类数组截取，忽略到第一个参数ctx 然后拿到剩下的参数）
    let args = Array.prototype.slice.call(arguments, 1)
    // 思路2: this指向就是 原本函数fn, 因为：myBind作为函数调用 是fn.myBind方式，所以this指向是fn
    let selffn = this;
    // 思路3:高阶函数-> 运算的延续 返回一个新的函数
    return function A() {
        // 思路4：resetArgus参数 来自于 fn.myBind('ctx', 1, 2) 返回函数newFn 调用newFn，实际是调用返回的函数function A,所以resetArgus来自于newFn上面的
        let resetArgus = Array.prototype.slice.call(arguments)
        let allArgus = args.concat(resetArgus)
        // 思路5: 获取到所有参数 -> 数组
        // 思路6: 将原本函数fn this指向使用apply 换成ctx （this指向替换）并传入所有参数
        // 思路7:return 就是返回fn 返回的结果（fn的this指向已经改变，参数也改变了）
        if (是new的方式调用) {
            const obj = {}
            Object.setPrototypeOf(obj, selffn.prototype)
            fn.apply(obj, allArgus)
            return obj;
        } else {
            return selffn.apply(ctx, allArgus)
        }

    }
    // 原本函数.apply(ctx)
}
const newFn = fn.myBind('ctx', 1, 2)
let result = newFn(3, 4)
console.log(result)

// 假如是new 调用newFn
const result2 = new newFn(4, 5)

function Person() {
    this.name = name;
    this.sayHello = function () {
        console.log(`Hello, my name is ${this.name}`);
    };
}
function _new(Constructor, ...args) {
    let obj = {}
    Object.setPrototypeOf(obj, Constructor.prototype)
    const result = Constructor.apply(obj, ...args)

}