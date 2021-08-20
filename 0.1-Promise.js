// Promise本质是一个绑定回调的对象
function Promise (callback) {
    var _this = this
    // Promise resolve回调函数
    var onResolvedCallbacks
    // Promise reject回调函数
    var onRejectedCallbacks

    _this.resolve = function (value) {
        onResolvedCallbacks()
    }

    _this.reject = function (value) {
        onRejectedCallbacks()
    }

    callback(_this.resolve, _this.reject)

}

Promise.prototype.then = (resolve, reject) {}