// Promise本质是一个绑定回调的对象
function Promise (callback) {
    var _this = this
    // Promise resolve回调函数
    var onResolvedCallbacks = []
    // Promise reject回调函数
    var onRejectedCallbacks = []

    _this.resolve = function (value) {
        // 通过setTimeout实现异步
        setTimeout(() => {
            _this.onResolvedCallbacks.forEach(cb => cb())
        })
    }

    _this.reject = function (value) {
        setTimeout(() => {
            _this.onRejectedCallbacks.forEach(cb => cb())
        })
    }

    callback(_this.resolve, _this.reject)

}

Promise.prototype.then = (resolve, reject) { }