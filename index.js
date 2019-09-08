/*
 * Copyright 2019 Allanic.me ISC License License
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * Created by mallanic <maxime@allanic.me> at 06/09/2019
 */

/**
 * Native Promise
 *
 * @alias Promise
 * @class Promise
 * @namespace
 */

if (!Promise.prototype.fail)
    /**
     * Appends a rejection handler callback to the promise,
     * and returns a new promise resolving to the return value of the callback if it is called,
     * or to its original fulfillment value if the promise is instead fulfilled.
     * @alias Promise.prototype.catch
     * @name Promise.prototype.fail
     * @memberof Promise
     * @instance
     * @function
     * @param {function} onReject A Function called when the Promise is rejected. This function has one argument:
            reason
            The rejection reason.
    * @return {Promise} Internally calls Promise.prototype.then on the object upon which it was called,
                        passing the parameters undefined and the received onRejected handler.
                        Returns the value of that call, which is a Promise.
    */
    Promise.prototype.fail = Promise.prototype.catch;

if (!Promise.prototype.finally)
    /**
     * Appends a handler to the promise,
     * and returns a new promise which is resolved when the original promise is resolved.
     * The handler is called when the promise is settled, whether fulfilled or rejected.
     *
     * @name Promise.prototype.finally
     * @memberof Promise
     * @instance
     * @function
     * @param {function} onFinally A Function called when the Promise is settled.
     * @return {Promise} Returns a Promise whose finally handler is set to the specified function, onFinally.
     */
    Promise.prototype.finally = function (callback) {
        return this.then(callback, callback);
    };

if (!Promise.prototype.spread)
    /**
     * Like then, but "spreads" the array into a variadic fulfillment handler.
     * If any of the promises in the array are rejected,
     * instead calls onRejected with the first rejected promise's rejection reason.
     *
     * @name Promise.prototype.spread
     * @memberof Promise
     * @instance
     * @function
     * @param {function} onFulfilled
     * @param {function} onRejected
     * @return {Promise}
     */
    Promise.prototype.spread = function (onFulfilled, onRejected) {
        return this.then((collection) => {
            if (Array.isArray(collection)) {
                return onFulfilled(...collection);
            }

            return onFulfilled(collection);
        }, onRejected);
    };


/**
 * A deferred to many promise
 *
 * @alias Deferred
 * @class Deferred
 * @namespace
 */
class Deferred {

    constructor () {
        var self = this;

        /**
         * Linked promise
         *
         * @alias promise
         * @memberof Deferred
         * @type {Promise}
         */
        this.promise = new Promise((resolve, reject) => {
            self._resolve = resolve;
            self._reject = reject;
        });
    }

    /**
     * Resolve a promise
     * @memberof Deferred
     * @function
     * @param {*} value
     */
    resolve(value) {
        this._resolve(value);
    }

    /**
     * Reject a promise
     * @function
     * @param {*} reason
     */
    reject(reason) {
        this._reject(reason);
    }
}

/**
 * Transform a promise to a native Promise instance
 *
 * @param {any} promise If a promise is provided, it transformed to a native Promise, if any other type is provided, the returned promise will be resolved.
 * @returns {Promise}
 */
function parse (promise) {
    return new Promise(function (resolve, reject) {
        if (Promise.isPromiseLike(promise))
            promise.then(resolve, reject);
        else
            resolve(promise);
    })
};
module.exports = Promise.parse = parse;

/**
 * Create a new deferred
 * @returns {Deferred}
 */
function defer() {
    return new Deferred();
};
module.exports.defer = Promise.defer = defer;

/**
 * Check if any value has a `.then` function
 *
 * @param {any} promise
 * @return {boolean}
 *
 * @example
 * $q.isPromiseLike(true); // false
 *
 * $q.isPromiseLike({
 *  then: function () {}
 * }); // true
 *
 * $q.isPromiseLike($q.resolve()); // true
 */
function isPromiseLike(promise) {
    return promise && typeof promise.then === 'function';
};
module.exports.isPromiseLike = Promise.isPromiseLike = isPromiseLike;

/**
 * The Promise.allSettled() method returns a promise that resolves after
 * all of the given promises have either resolved or rejected,
 * with an array of objects that each describe the outcome of each promise.
 *
 * @param {Array} promises
 * @return {Promise}
 *
 * @example
 * var d1 = $q.defer();
 * var d2 = $q.defer();
 * $q.allSettled([
 *      d1.promise,
 *      d2.promise
 * ])
 *      .then((results) => {
 *          // results contain [{status: 'fulfilled', value: 'test'}, {status: 'rejected', reason: 'test2'}]
 *      });
 * d1.resolve('test'); // Not resolved
 * d2.reject('test2'); // Resolved
 *
 */
module.exports.allSettled = Promise.allSettled = function (promises) {
    let wrappedPromises = promises.map((p) => {
        return Promise.resolve(p)
            .then(val => ({ status: 'fulfilled', value: val }),
                err => ({ status: 'rejected', reason: err }))
    });
    return Promise.all(wrappedPromises);
};

/**
 * Calls a Node.js-style function with the given variadic arguments,
 * returning a promise that is fulfilled if the Node.js function calls back with a result,
 * or rejected if it calls back with an error (or throws one synchronously).
 *
 * @param {function} command
 * @param {any} ...args
 * @return {Promise}
 *
 * @example
 * $q.nfcall(FS.readFile, "foo.txt", "utf-8").done(function (text) {
 * });
 *
 */
module.exports.nfcall = Promise.nfcall = function (command, ...args) {
    var deferred = defer();
    args.push(function (error, resolve) {
        if (error)
            deferred.reject(error);
        else
            deferred.resolve(resolve);
    });
    command.apply(null, args);
    return deferred.promise;
};

module.exports.resolve = (value) => {
    return Promise.resolve(value);
};

module.exports.reject = (value) => {
    return Promise.reject(value);
};

module.exports.all = (promises) => {
    return Promise.all(promises);
};