/*
 * Copyright 2019 Allanic.me ISC License License
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * Created by mallanic <maxime@allanic.me> at 08/09/2019
 */

const $assert = require('assert');
const $q = require('./index');

describe('isPromiseLike', function() {
    it('should return false when value is not promise', function () {
        var result = $q.isPromiseLike(true);
        $assert.equal(result, false);
    });

    it('should return true when value is promise', function () {
        var result = $q.isPromiseLike(new Promise(() => { }));
        $assert.equal(result, true);
    });
});

describe('allSettled', function () {
    it('should resolve', function (done) {
        var d1 = $q.defer();
        var d2 = $q.defer();
        $q.allSettled([
            d1.promise,
            d2.promise
        ])
            .then((results) => {
                $assert.deepStrictEqual(results, [
                    {
                        status: 'fulfilled', value: 'test'
                    }, {
                        status: 'rejected', reason: 'test2'
                    }
                ]);
                done();
            });
        d1.resolve('test'); // Not resolved
        d2.reject('test2'); // Resolved
    })
});

describe('defer', function () {
    it('should defer a promise and resolve it', function (done) {
        var deferred = $q.defer();
        deferred.promise.then(function (value) {
            $assert.equal(value, 'test');
            done();
        });
        deferred.resolve('test');
    });

    it('should defer a promise and reject it', function (done) {
        var deferred = $q.defer();
        deferred.promise.then(() => { }, function (value) {
            $assert.equal(value, 'test');
            done();
        });
        deferred.reject('test');
    });
});

describe('parse', function () {
    it('should parse a promise and resolve it', function (done) {
        var _callbackResolve;
        var promise = $q({
            then: function (callbackResolve, callbackReject) {
                _callbackResolve = callbackResolve;
            }
        });

        promise.then(function (value) {
            $assert.equal(value, 'test');
            done();
        });
        _callbackResolve('test');
    });

    it('should parse a promise and reject it', function (done) {
        var _callbackReject;
        var promise = $q({
            then: function (callbackResolve, callbackReject) {
                _callbackReject = callbackReject;
            }
        });

        promise.then(function () { }, function (value) {
            $assert.equal(value, 'test');
            done();
        });
        _callbackReject('test');
    })
});