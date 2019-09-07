## Objects

<dl>
<dt><a href="#Promise">Promise</a> : <code>object</code></dt>
<dd><p>Native Promise</p>
</dd>
<dt><a href="#Deferred">Deferred</a> : <code>object</code></dt>
<dd><p>A deferred to many promise</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parse">parse(promise)</a> ⇒ <code><a href="#Promise">Promise</a></code></dt>
<dd><p>Transform a promise to a native Promise instance</p>
</dd>
<dt><a href="#defer">defer()</a> ⇒ <code><a href="#Deferred">Deferred</a></code></dt>
<dd><p>Create a new deferred</p>
</dd>
<dt><a href="#isPromiseLike">isPromiseLike(promise)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if any value has a <code>.then</code> function</p>
</dd>
</dl>

<a name="Promise"></a>

## Promise : <code>object</code>
Native Promise

**Kind**: global namespace  

* [Promise](#Promise) : <code>object</code>
    * [.fail(onReject)](#Promise+fail) ⇒ [<code>Promise</code>](#Promise)
    * [.finally(onFinally)](#Promise+finally) ⇒ [<code>Promise</code>](#Promise)
    * [.spread(onFulfilled, onRejected)](#Promise+spread) ⇒ [<code>Promise</code>](#Promise)

<a name="Promise+fail"></a>

### promise.fail(onReject) ⇒ [<code>Promise</code>](#Promise)
Appends a rejection handler callback to the promise,
and returns a new promise resolving to the return value of the callback if it is called,
or to its original fulfillment value if the promise is instead fulfilled.

**Kind**: instance method of [<code>Promise</code>](#Promise)  
**Returns**: [<code>Promise</code>](#Promise) - Internally calls Promise.prototype.then on the object upon which it was called,
                        passing the parameters undefined and the received onRejected handler.
                        Returns the value of that call, which is a Promise.  

| Param | Type | Description |
| --- | --- | --- |
| onReject | <code>function</code> | A Function called when the Promise is rejected. This function has one argument:             reason             The rejection reason. |

<a name="Promise+finally"></a>

### promise.finally(onFinally) ⇒ [<code>Promise</code>](#Promise)
Appends a handler to the promise,
and returns a new promise which is resolved when the original promise is resolved.
The handler is called when the promise is settled, whether fulfilled or rejected.

**Kind**: instance method of [<code>Promise</code>](#Promise)  
**Returns**: [<code>Promise</code>](#Promise) - Returns a Promise whose finally handler is set to the specified function, onFinally.  

| Param | Type | Description |
| --- | --- | --- |
| onFinally | <code>function</code> | A Function called when the Promise is settled. |

<a name="Promise+spread"></a>

### promise.spread(onFulfilled, onRejected) ⇒ [<code>Promise</code>](#Promise)
Like then, but "spreads" the array into a variadic fulfillment handler.
If any of the promises in the array are rejected,
instead calls onRejected with the first rejected promise's rejection reason.

**Kind**: instance method of [<code>Promise</code>](#Promise)  

| Param | Type |
| --- | --- |
| onFulfilled | <code>function</code> | 
| onRejected | <code>function</code> | 

<a name="Deferred"></a>

## Deferred : <code>object</code>
A deferred to many promise

**Kind**: global namespace  

* [Deferred](#Deferred) : <code>object</code>
    * [promise](#promise) : [<code>Promise</code>](#Promise)
    * _instance_
        * [.resolve(value)](#Deferred+resolve)
        * [.reject(reason)](#Deferred+reject)

<a name="promise"></a>

### Deferredpromise : [<code>Promise</code>](#Promise)
Linked promise

<a name="Deferred+resolve"></a>

### deferred.resolve(value)
Resolve a promise

**Kind**: instance method of [<code>Deferred</code>](#Deferred)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="Deferred+reject"></a>

### deferred.reject(reason)
Reject a promise

**Kind**: instance method of [<code>Deferred</code>](#Deferred)  

| Param | Type |
| --- | --- |
| reason | <code>\*</code> | 

<a name="parse"></a>

## parse(promise) ⇒ [<code>Promise</code>](#Promise)
Transform a promise to a native Promise instance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promise | <code>any</code> | If a promise is provided, it transformed to a native Promise, if any other type is provided, the returned promise will be resolved. |

<a name="defer"></a>

## defer() ⇒ [<code>Deferred</code>](#Deferred)
Create a new deferred

**Kind**: global function  
<a name="isPromiseLike"></a>

## isPromiseLike(promise) ⇒ <code>boolean</code>
Check if any value has a `.then` function

**Kind**: global function  

| Param | Type |
| --- | --- |
| promise | <code>any</code> | 

**Example**  
```js
$q.isPromiseLike(true); // false

$q.isPromiseLike({
 then: function () {}
}); // true

$q.isPromiseLike($q.resolve()); // true
```
