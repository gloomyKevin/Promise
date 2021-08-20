const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise (callback) {
    var _this = this
    _this.onResolvedCallbacks = []
    _this.onrejectionhandled = []

    _this.value = void 0
    _this.readyState = PENDING

    _this.resolve = function (res) {
        setTimeout(() => {
            if (_this.readyState === PENDING) {
                _this.readyState = FULFILLED
                _this.value = res
                _this.onResolvedCallbacks.forEach(cb => cb())
            }
        })
    }

    _this.reject = function (res) {
        setTimeout(() => {
            if (_this.readyState === PENDING) {
                _this.readyState = REJECTED
                _this.value = res
                _this.onrejectionhandled.forEach(cb => cb())
            }
        })
    }

    // 执行异步回调，并通过闭包抛出api
    callback(_this.resolve, _this.reject)
}

// then方法的入参onFulfilled和onRejected均为可选
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    var _this = this
    var promise2

    // 值穿透
    // 传入为function时，走function中的入参，如果不是function，则走上一个resolve中的入参
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    // 承前
    // 只有promise1的状态切换为fulfilled，才执行promise2
    if (_this.currentState === RESOLVED) {
        return promise2 = new MyPromise((resolve, reject) => {
            // 通过setTimeout保证异步
            setTimeout(() => {
                // 启后
                // 如果onFulfilled是一个promise，则执行
                var x = onFulfilled(_this.value)
                if (x instanceof MyPromise) {
                    x.then(resolve, reject)
                }
                // onFulfilled不是promise，则直接使用以前的值
                resolve(x)
            })
        })
    }

    if (_this.currentState === REJECTED) {
        return promise2 = new MyPromise((resolve, reject) => {
            var x = onFulfilled(_this.value)
            if (x instanceof MyPromise) {
                x.then(resolve, reject)
            }
            resolve(x)
        })
    }

}

// 测试方法
const test = new MyPromise((resolve, reject) => {
    resolve()
})