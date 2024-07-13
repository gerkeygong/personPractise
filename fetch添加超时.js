// 给fetch添加超时功能
// 方法1
// function request(url, options){
//     const timeout = options.timeout || 5000;
// }
// 上面这种做法存在问题：1. 每一次request 都要传入timeout 这个配置，当然也可以不传，都默认5000.那这样还不如写死，如果写死，又不能跨项目通用了。所以不太好

// 方法2
// const oldFetch = window.fetch;
// window.fetch = () => {
//     //xxxx
// }
// 上面这种做法存在问题：太粗暴，影响范围很广

// 方法3-高阶函数
// 思路：1.首先创建一个高阶函数(返回一个新的函数)-> 可以生成多个应用实例函数 根据传入的timeout不同。。服用+跨项目
function createFetchWithTimeout(timeout) {
    return function (url, options) {
        // 思路2:返回一个promise: 因为要添加超时功能 ，在内部处理 fetch 和 setTimeout的返回，在修改promise状态
        return new Promise((resolve, reject) => {
            // 思路4: 取消请求
            const singalController = new AbortController();
            fetch(url, {
                ...options,
                signal: singalController.signal
            }).then(resolve, reject)
            setTimeout(() => {
                reject('超时了');
                singalController.abort();
            }, timeout)
            // 思路3: fetch返回数据 和 setTimeout 相比较，哪个先结束，内部代码先运行去修改promise状态，一旦修改promise状态被确认
        })

    }
}

const request1 = createFetchWithTimeout(5000)
const request2 = createFetchWithTimeout(6000)
