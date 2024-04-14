# Promise概要

1. **Promise 基础**:

   - 什么是`Promise`，以及它解决了什么问题？

     - `Promise` 是一种异步编程的解决方案，用于处理异步操作。它允许你在未来的某个时间点得到一个成功的值或一个失败的原因。

   - `Promise`的三种状态是什么？

     - `Promise` 有三种状态：pending（等待中）、fulfilled（已成功）和rejected（已失败）。

   - 如何创建一个新的`Promise`？

     - 创建一个新的`Promise`对象通常使用构造函数`new Promise()`，并传入一个执行器函数，该函数接收两个参数：`resolve`和`reject`。例如：

       ```js
       const myPromise = new Promise((resolve, reject) => {
         // 异步操作
         if (/* 操作成功 */) {
           resolve(value);
         } else {
           reject(error);
         }
       });
       ```

       

2. **Promise 链式调用**:

   - 如何使用`.then()`方法进行链式调用？
     - `.then()` 方法用于指定成功状态（fulfilled）的回调函数，它可以被链式调用。
   - `.then()`方法的返回值是什么？
     - `.then()` 方法返回一个新的`Promise`，它的结果由`.then()`内部的回调函数返回值决定。
   - 如何处理链式调用中的错误？
     - 链式调用中的错误可以被随后的`.catch()`捕获。

3. **错误处理**:

   - 如何使用`.catch()`来捕获错误？
     - `.catch()` 方法用于指定失败状态（rejected）的回调函数，捕获前面`Promise`链中的错误。
   - `.then()`方法中的第二个回调函数和`.catch()`之间有什么区别？
     - `.then()` 方法中的第二个回调函数也可以处理错误，但它只处理前一个`.then()`产生的错误，而`.catch()`可以捕获之前所有`Promise`中的错误。

4. **Promise 静态方法**:

   - `Promise.all()`是做什么的，它如何工作？
     - `Promise.all()` 用于将多个`Promise`实例包装成一个新的`Promise`实例。它接收一个数组，只有所有`Promise`实例都成功时，返回的`Promise`才会成功；如果有一个失败，返回的`Promise`就会立即失败。
   - `Promise.race()`是做什么的，它如何工作？
     - `Promise.race()` 也是将多个`Promise`实例包装成一个新的`Promise`实例，但它的状态由第一个改变状态的`Promise`决定。
   - `Promise.resolve()`和`Promise.reject()`有什么用？
     - `Promise.resolve()` 和 `Promise.reject()` 分别用于快速返回一个成功或失败的`Promise`。

5. **Promise 和异步编程**:

   - `Promise`如何与`async/await`搭配使用？
     - `async/await` 是基于`Promise`的语法糖，允许你以同步的方式写异步代码。`async` 函数总是返回一个`Promise`，而 `await` 用于等待一个`Promise`。
   - 如何将基于回调的异步函数转换为返回`Promise`的函数？
     - 将基于回调的异步函数转换为返回`Promise`的函数，通常需要将回调模式重构为使用`new Promise()`构造函数。

6. **微任务（Microtask）**:

   - `Promise`的回调是微任务吗，它们是如何被调度的？
     - `Promise`的回调确实是微任务（microtasks），它们会在当前执行栈的末尾执行，优先于宏任务（macrotasks）。
   - 微任务和宏任务（macrotasks）之间有什么区别？
     - 微任务比宏任务有更高的优先级，例如 `Promise` 回调（微任务）会在 `setTimeout`（宏任务）之前执行。

7. **错误处理和调试**:

   - 面对未捕获的`Promise`错误，如何调试？
     - 对于未捕获的`Promise`错误，可以通过全局事件监听器来调试，例如在浏览器中监听 `unhandledrejection` 事件。
   - 如何避免`Promise`中的“地狱回调”（callback hell）？
     - 避免“地狱回调”，可以通过合理使用 `.then()` 链式调用和 `async/await` 来实现。

## 地狱回调

"地狱回调"（callback hell），也被称为"回调金字塔"，是指多层嵌套的回调函数导致代码难以理解和维护的情况。在`Promise`中，这种情况可能发生在连续的异步操作中，如果不恰当地使用链式调用的话。

为了避免`Promise`中的“地狱回调”，我们可以采用以下方法：

1. **利用链式调用**: 使用`Promise`的链式调用特性，使得异步操作按顺序执行，同时保持代码的平坦结构。
2. **返回Promise**: 在`.then()`回调函数中返回新的`Promise`，这样可以将后续的`.then()`调用放在外层，而不是嵌套在内层。
3. **使用`async/await`**: `async/await`是基于`Promise`的语法糖，它可以让你以同步的方式编写异步代码，从而避免嵌套。

下面分别用嵌套和链式调用的方式来展示如何避免“地狱回调”。

**嵌套回调的例子（地狱回调）**:

```js
getData(function(a){
    getMoreData(a, function(b){
        getMoreData(b, function(c){
            getMoreData(c, function(d){
                getMoreData(d, function(e){
                    // ...
                });
            });
        });
    });
});
```

**链式调用避免地狱回调的例子**:

```js
getData()
.then(function(a){
    return getMoreData(a);
})
.then(function(b){
    return getMoreData(b);
})
.then(function(c){
    return getMoreData(c);
})
.then(function(d){
    return getMoreData(d);
})
.then(function(e){
    // ...
})
.catch(function(error){
    // 错误处理
});
```

**使用`async/await`避免地狱回调的例子**:

```js
async function asyncCall() {
    try {
        const a = await getData();
        const b = await getMoreData(a);
        const c = await getMoreData(b);
        const d = await getMoreData(c);
        const e = await getMoreData(d);
        // ...
    } catch (error) {
        // 错误处理
    }
}

asyncCall();
```

在这些例子中，我们可以看到，避免使用嵌套的回调，而是使用链式调用或`async/await`，可以使代码更加清晰和可维护。尤其是`async/await`，它提供了一种更加直观和近似同步的方法来处理异步操作。

## 示例

### 题目1：基本的Promise执行顺序

```js
console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Then 1');
  })
  .then(() => {
    console.log('Then 2');
  });

console.log('End');
```

```shell
Start
End
Then 1
Then 2
```

### 题目2：结合setTimeout的事件循环

```js
console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('End');
```

```shell
Start
End
Promise 1
Promise 2
setTimeout
```

### 题目3：嵌套Promise和微任务

```js
Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    Promise.resolve()
      .then(() => {
        console.log('Promise 1-1');
      })
      .then(() => {
        console.log('Promise 1-2');
      });
  })
  .then(() => {
    console.log('Promise 2');
  });
```

```shell
Promise 1
Promise 1-1
Promise 1-2
Promise 2
```

### 题目4：结合异步函数async/await

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('Promise1');
  resolve();
}).then(() => {
  console.log('Promise2');
});

console.log('script end');
```

```shell
script start
async1 start
async2
Promise1
script end
async1 end
Promise2
setTimeout
```

### 题目5：Promise.all的使用

```js
const promise1 = Promise.resolve('Promise 1');
const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise 2');
  }, 100);
});
const promise3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise 3');
  }, 50);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```

```shell
["Promise 1", "Promise 2", "Promise 3"]
```

### 题目6：Promise.race的使用

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, 'One');
});
const promise2 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'Two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log('Resolved:', value);
}).catch((reason) => {
  console.log('Rejected:', reason);
});
```

```shell
Resolved: Two
```

