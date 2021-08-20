// // 思考：构造一个状态机
// const PENDING = 'pending'
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'

// function Promise (callback) {
//     var _this = this
//     _this.currentState = PENDING

//     var onResolvedCallbacks = []
//     var onRejectedCallbacks = []

//     _this.resolve = function (res) {
//         // 保证异步顺序执行
//         setTimeout(() => {
//             // pending时才更改状态
//             if(_this.currentState === PENDING) {
//                 _this.value = res
//                 _this.onResolvedCallbacks.forEach(cb => cb())
//                 _this.currentState = FULFILLED
//             }
//         })
//     }

//     _this.reject = function (res) {
//         setTimeout(() => {
//             if(_this.currentState === PENDING) {
//                 _this.value = res
//                 _this.onResolvedCallbacks.forEach(cb => cb())
//                 _this.currentState = REJECTED
//             }
//         })
//     }

//     callback(_this.resolve, _this.reject)
// }

// 复盘
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise (callback) {
    var _this = this
    _this.currentState = PENDING
    _this.value = void 0
    // 这两个数组的方案会在后续给出
    _this.onResolvedCallbacks = []
    _this.onRejectedCallbacks = []

    _this.resolve = function (res) {
        // 通过setTimeout实现异步
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.value = res
                _this.currentState = FULFILLED
                // 通过这种方式存储后续需要链式调用的
                _this.onResolvedCallbacks.forEach(cb => cb())
            }
        })
    }

    _this.reject = function (res) {
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.value = res
                _this.currentState = REJECTED
                _this.onRejectedCallbacks.forEach(cb => cb())
            }
        })
    }

    // 在没有promise的时代，通过callback回调实现先后顺序的执行是最原始的方法
    // 同时也用到闭包思想，将内部封装好的resolve和reject抛出给使用者
    callback(_this.resolve, _this.reject)
}

// 核心方法，待后续构造
MyPromise.prototype.then()