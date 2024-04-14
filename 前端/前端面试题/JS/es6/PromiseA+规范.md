# PromiseA+规范

## 术语

1. promise 是一个有then方法的对象或者是函数，行为遵循本规范
2. thenable 是一个有then方法的对象或者是函数
3. value 是promise状态成功时的值，也就是resolve的参数, 包括各种数据类型, 也包括undefined/thenable或者是 promise
4. reason 是promise状态失败时的值, 也就是reject的参数, 表示拒绝的原因
5. exception 是一个使用throw抛出的异常值

## 规范

### Promise States 

promise应该有三种状态

1. pending

    1.1 初始的状态, 可改变.
    1.2 一个promise在resolve或者reject前都处于这个状态。
    1.3 可以通过 resolve -> fulfilled 状态;
    1.4 可以通过 reject -> rejected 状态;

2. fulfilled

    2.1 最终态, 不可变.
    2.2 一个promise被resolve后会变成这个状态.
    2.3 必须拥有一个value值

3. rejected

    3.1 最终态, 不可变.
    3.2 一个promise被reject后会变成这个状态
    3.3 必须拥有一个reason

Tips: promise的状态流转如下

pending -> resolve(value) -> fulfilled
pending -> reject(reason) -> rejected

### then

promise应该提供一个then方法, 用来访问最终的结果, 无论是value还是reason.

```js
promise.then(onFulfilled, onRejected)
```

1. 参数要求

    1.1 onFulfilled 必须是函数类型, 如果不是函数, 应该被忽略.
    1.2 onRejected 必须是函数类型, 如果不是函数, 应该被忽略.

2. onFulfilled 特性

    2.1 在promise变成 fulfilled 时，应该调用 onFulfilled, 参数是value
    2.2 在promise变成 fulfilled 之前, 不应该被调用.
    2.3 只能被调用一次(所以在实现的时候需要一个变量来限制执行次数)

3. onRejected 特性

    3.1 在promise变成 rejected 时，应该调用 onRejected, 参数是reason
    3.2 在promise变成 rejected 之前, 不应该被调用.
    3.3 只能被调用一次(所以在实现的时候需要一个变量来限制执行次数)

4. onFulfilled 和 onRejected 是微任务

    可以使用queueMicrotask来实现微任务的调用.

5. then方法可以被调用多次

    5.1 promise状态变成 fulfilled 后，所有的 onFulfilled 回调都需要按照then的顺序执行, 也就是按照注册顺序执行(所以在实现的时候需要一个数组来存放多个onFulfilled的回调)
    5.2 promise状态变成 rejected 后，所有的 onRejected 回调都需要按照then的顺序执行, 也就是按照注册顺序执行(所以在实现的时候需要一个数组来存放多个onRejected的回调)

6. 返回值

    then 应该返回一个promise

    ```js
    promise2 = promise1.then(onFulfilled, onRejected);
    ```

    6.1 onFulfilled 或 onRejected 执行的结果为x, 调用 resolvePromise（该方法逻辑很复杂，单独解释）
    6.2 如果 onFulfilled 或者 onRejected 执行时抛出异常e, promise2需要被reject
    6.3 如果 onFulfilled 不是一个函数, promise2 以promise1的value 触发fulfilled
    6.4 如果 onRejected 不是一个函数, promise2 以promise1的reason 触发rejected

7. resolvePromise
   
   ```js
   resolvePromise(promise2, x, resolve, reject)
   ```

    7.1 如果 promise2 和 x 相等，那么 reject TypeError
    7.2 如果 x 是一个 promsie
            如果x是pending态，那么promise必须要在pending,直到 x 变成 fulfilled or rejected.
            如果 x 被 fulfilled, fulfill promise with the same value.
            如果 x 被 rejected, reject promise with the same reason.
    7.3 如果 x 是一个 object 或者 是一个 function
        let then = x.then.
        如果 x.then 这步出错，那么 reject promise with e as the reason.
        如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromise)
            resolvePromiseFn 的 入参是 y, 执行 resolvePromise(promise2, y, resolve, reject);
            rejectPromise 的 入参是 r, reject promise with r.
            如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
            如果调用then抛出异常e 
                如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
                则，reject promise with e as the reason
        如果 then 不是一个function. fulfill promise with x.

## 扩展：微任务方法 queueMicrotask

`queueMicrotask` 是一个浏览器提供的全局方法，它允许开发者将微任务（microtask）排队到微任务队列中。微任务队列在JavaScript事件循环的当前任务结束后、下一个任务开始前执行。这意味着微任务在宏任务（如setTimeout或setInterval等）之前执行。

微任务通常用于确保某些操作在当前执行栈结束后尽快运行，但在事件循环继续之前。`queueMicrotask` 方法是一个替代直接使用 `Promise` 或 `MutationObserver` 来创建微任务的更直接和易用的方法。

使用 `queueMicrotask` 方法的一个例子：

```js
console.log('1. Script start');

queueMicrotask(() => {
  console.log('3. Executed microtask');
});

console.log('2. Script end');
```

这个例子中，输出将会是：

```shell
1. Script start
2. Script end
3. Executed microtask
```

这是因为 `queueMicrotask` 排队的回调函数会在当前的宏任务（即整个脚本）结束后、下一个宏任务开始前立即执行。

`queueMicrotask` 方法是在较新的浏览器版本中引入的，所以在旧浏览器上可能不可用。在不支持 `queueMicrotask` 的环境中，你可以通过返回 `Promise.resolve().then(callback)` 来达到类似的效果，因为 `then` 或 `catch` 方法注册的回调也会作为微任务执行。

## 参考

[Promises/A+](https://promisesaplus.com/)

