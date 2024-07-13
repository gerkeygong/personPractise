```javascript
function Person() {
    this.name = name;
    this.sayHello = function () {
        console.log(`Hello, my name is ${this.name}`);
    };
}
// 思路1：传入构造器和相关参数
function _new(Constructor, ...args) {
    // 思路2：新建一个对象
    let obj = {}
    // 思路3：将这个新对象原型 = 构造器的原型对象 -> 具备了构造函数原型对象上面的属性和方法
    Object.setPrototypeOf(obj, Constructor.prototype)
    // 思路4: 执行构造器 this指向新的对象
    const result = Constructor.apply(obj, ...args)
    // 思路5: 规则：1. 如果构造器执行完返回一个新的对象(包括函数)，则new后返回这个对象 而不是新建的对象 2. 如果构造器执行完返回是非对象类型（如字符串、数字、布尔值或undefined）则返回新的对象
    if((typeof result === 'object' && result !== undefined) || typeof result === 'function') {
        return result
    } else {
        return obj
    }
}
const person = _new(Person, 'John Doe');
person.sayHello(); // 输出: Hello, my name is John Doe
```