# Async、await

Async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用。

## Async function

让我们以 `async` 这个关键字开始。它可以被放置在一个函数前面，如下所示：

```js
async function f() {
  return 1;
}
```

在函数前面的 “async” 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。

例如，下面这个函数返回一个结果为 `1` 的 resolved promise，让我们测试一下：

```js
async function f() {
  return 1;
}

f().then(console.log); // 1
```

……我们也可以显式地返回一个 promise，结果是一样的：

```js
async function f() {
  return Promise.resolve(1);
}

f().then(console.log); // 1
```

所以说，`async` 确保了函数返回一个 promise，也会将非 promise 的值包装进去。很简单，对吧？但不仅仅这些。还有另外一个叫 `await` 的关键词，它只在 `async` 函数内工作，也非常酷。

## await

语法如下：

```js
// 只在 async 函数内工作
let value = await promise;
```

关键字 `await` 让 JavaScript 引擎等待直到 promise 完成（settle）并返回结果。

这里的例子就是一个 1 秒后 resolve 的 promise：

```js
async function f() {
    
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // 等待，直到 promise resolve (*)

  console.log(result); // "done!"
}

f();
```

这个函数在执行的时候，“暂停”在了 `(*)` 那一行，并在 promise settle 时，拿到 `result` 作为结果继续往下执行。所以上面这段代码在一秒后显示 “done!”。

让我们强调一下：`await` 实际上会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行。这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：执行其他脚本，处理事件等。

相比于 `promise.then`，它只是获取 promise 的结果的一个更优雅的语法。并且也更易于读写。

> **不能在普通函数中使用 `await`**
> 
> 如果我们尝试在非 async 函数中使用 `await`，则会报语法错误：
> 
> ```js
> function f() {
>   let promise = Promise.resolve(1);
>   let result = await promise; // Syntax error
> }
> ```
> 
> 如果我们忘记在函数前面写 `async` 关键字，我们可能会得到一个这个错误。就像前面说的，`await` 只在 `async` 函数中有效。

让我们拿 [Promise 链](https://zh.javascript.info/promise-chaining) 那一章的 `showAvatar()` 例子，并将其改写成 `async/await` 的形式：

1. 我们需要用`await` 替换掉`.then` 的调用。
2. 另外，我们需要在函数前面加上`async` 关键字，以使它们能工作。

```js
async function showAvatar() {

  // 读取我们的 JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // 读取 github 用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 显示头像
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 等待 3 秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

简洁明了，是吧？比之前可强多了。

> **现代浏览器在 modules 里允许顶层的 `await`**
> 
> 在现代浏览器中，当我们处于一个 module 中时，那么在顶层使用 `await` 也是被允许的。我们将在 [模块 (Module) 简介](https://zh.javascript.info/modules-intro) 中详细学习 modules。
> 
> 例如：
> 
> ```js
> // 我们假设此代码在 module 中的顶层运行
> let response = await fetch('/article/promise-chaining/user.json');
> let user = await response.json();
> 
> console.log(user);
> ```
> 
> 如果我们没有使用 modules，或者必须兼容 [旧版本浏览器](https://caniuse.com/mdn-javascript_operators_await_top_level) ，那么这儿还有一个通用的方法：包装到匿名的异步函数中。
> 
> 像这样：
> 
> ```js
> (async () => {
>   let response = await fetch('/article/promise-chaining/user.json');
>   let user = await response.json();
>   ...
> })();
> ```

> **`await` 接受 “thenables”**
> 
> 像 `promise.then` 那样，`await` 允许我们使用 thenable 对象（那些具有可调用的 `then` 方法的对象）。这里的想法是，第三方对象可能不是一个 promise，但却是 promise 兼容的：如果这些对象支持 `.then`，那么就可以对它们使用 `await`。
> 
> 这有一个用于演示的 `Thenable` 类，下面的 `await` 接受了该类的实例：
> 
> ```js
> class Thenable {
>   constructor(num) {
>     this.num = num;
>   }
>   then(resolve, reject) {
>     console.log(resolve);
>     // 1000ms 后使用 this.num*2 进行 resolve
>     setTimeout(() => resolve(this.num * 2), 1000); // (*)
>   }
> }
> 
> async function f() {
>   // 等待 1 秒，之后 result 变为 2
>   let result = await new Thenable(1);
>   console.log(result);
> }
> 
> f();
> ```
> 
> 如果 `await` 接收了一个非 promise 的但是提供了 `.then` 方法的对象，它就会调用这个 `.then` 方法，并将内建的函数 `resolve` 和 `reject` 作为参数传入（就像它对待一个常规的 `Promise` executor 时一样）。然后 `await` 等待直到这两个函数中的某个被调用（在上面这个例子中发生在 `(*)` 行），然后使用得到的结果继续执行后续任务。

> **Class 中的 async 方法**
> 
> 要声明一个 class 中的 async 方法，只需在对应方法前面加上 `async` 即可：
> 
> ```js
> class Waiter {
>     async wait() {
>         return await Promise.resolve(1);
>     }
> }
> 
> new Waiter()
>     .wait()
>     .then(console.log); // 1
> ```
> 
> 这里的含义是一样的：它确保了方法的返回值是一个 promise 并且可以在方法中使用 `await`。

## Error处理

如果一个 promise 正常 resolve，`await promise` 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error，就像在这一行有一个 `throw` 语句那样。

这个代码：

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

……和下面是一样的：

```js
async function f() {
  throw new Error("Whoops!");
}
```

在真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 `await` 抛出（throw）一个 error 之前会有一个延时。

我们可以用 `try..catch` 来捕获上面提到的那个 error，与常规的 `throw` 使用的是一样的方式：

```js
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    console.log(err); // TypeError: failed to fetch
  }
}

f();
```

如果有 error 发生，执行控制权马上就会被移交至 `catch` 块。我们也可以用 `try` 包装多行 `await` 代码：

```js
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // 捕获到 fetch 和 response.json 中的错误
    console.log(err);
  }
}

f();
```

如果我们没有 `try..catch`，那么由异步函数 `f()` 的调用生成的 promise 将变为 rejected。我们可以在函数调用后面添加 `.catch` 来处理这个 error：

```js
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() 变成了一个 rejected 的 promise
f().catch(console.log); // TypeError: failed to fetch // (*)
```

如果我们忘了在这添加 `.catch`，那么我们就会得到一个未处理的 promise error（可以在控制台中查看）。我们可以使用在 [使用 promise 进行错误处理](https://zh.javascript.info/promise-error-handling) 一章中所讲的全局事件处理程序 `unhandledrejection` 来捕获这类 error。

> **`async/await` 和 `promise.then/catch`**
> 
> 当我们使用 `async/await` 时，几乎就不会用到 `.then` 了，因为 `await` 为我们处理了等待。并且我们使用常规的 `try..catch` 而不是 `.catch`。这通常（但不总是）更加方便。
> 
> 但是当我们在代码的顶层时，也就是在所有 `async` 函数之外，我们在语法上就不能使用 `await` 了，所以这时候通常的做法是添加 `.then/catch` 来处理最终的结果（result）或掉出来的（falling-through）error，例如像上面那个例子中的 `(*)` 行那样。

> **`async/await` 可以和 `Promise.all` 一起使用**
> 
> 当我们需要同时等待多个 promise 时，我们可以用 `Promise.all` 把它们包装起来，然后使用 `await`：
> 
> ```js
> // 等待结果数组
> let results = await Promise.all([
>   fetch(url1),
>   fetch(url2),
>   ...
> ]);
> ```
> 
> 如果出现 error，也会正常传递，从失败了的 promise 传到 `Promise.all`，然后变成我们能通过使用 `try..catch` 在调用周围捕获到的异常（exception）。

## 总结

### async await的基本使用

1. 函数前面加上 async 后，这个函数里就可以使用await了
2. async的函数，总是会返回一个promise，其他的值自动被包装在一个resolve的promise里
   ```js
   async function fn() {
       console.log('aaa');
       // 如果不给返回值，默认返回一个 Promise.resolve(undefined)
       // 有返回值 就会被包装一下 Promise.resolve(value)
       // 也可以显示的返回一个Promise  return Promise.resolve(value)
   }
   
   fn().then(res => {
       console.log(res); // undefined
   })
   ```
3. await 后跟的promise会卡住，代码执行到这的时候，会一直等待promise返回结果（不管是fulfilled或者rejected，反正得有一个结果，当 await 检测到自己后面的promise没有状态改变后，会立即终止程序，不会继续等待，但是await后面的代码不会被执行）
   ```js
   async function fn() {
   
       let promise = new Promise((resolve, reject) => {
           // 试一下不返回结果，await 后面的代码会一直不执行
           /* setTimeout(() => {
               resolve(1)
           }, 2000) */
       })
   
       console.log('aaaa');
   
       let a = await promise
   
       // 如果上面await后面的promise一直不改变状态，这后面的代码就不会被执行
       // await 检测到没有状态改变后，会立即终止程序，不会继续等待
       console.log(a);
       console.log('bbb');
   }
   
   fn()
   ```
4. 不能在普通函数中使用 await，会报错
5. 现代浏览器中的 modules 里 允许顶层的await，但是如果没有使用modules，可以使用闭包来模拟
   ```js
   (async ()=>{
       // ...
   })()
   ```
6. await 接收 thenables，就是后面的对象里可以有一个类似promise的then 方法也是可以的
   ```js
   async function fn() {
       let obj = {
           then: function (resolve, reject) {
               setTimeout(() => {
                   resolve(1)
               }, 2000)
           }
       }
   
       let a = await obj
       console.log(a); // 1s后也会把1打印出来
   }
   fn()
   ```
7. class 中的 async方法，直接在方法前面加 async即可

### async await 的错误处理

1. 如果正常的被reject，就会被throw一个error
   ```js
   // 就好像这样
   async function f() {
     await Promise.reject(new Error("Whoops!"));
   }
   // 上面的和下面的是等价的
   async function f() {
     throw new Error("Whoops!");
   }
   ```
2. 错误的两种接收方式
   1. 直接在函数调用的最外部接收
      ```js
      async function fn() {
          let promise = new Promise((resolve, reject) => {
              reject(new Error('出错了'))
          })
          await promise
      }
      
      fn().catch(err => {
          console.log(err);
      })
      ```
   2. 使用`try...catch`把使用await的地方包裹一下，也是可以接收到的
      ```js
      async function fn() {
          let promise = new Promise((resolve, reject) => {
              reject(new Error('出错了'))
          })
      
          try {
              await promise
          } catch (error) {
              console.log(error);
          }
      }
      fn()
      ```

### async await的并行和串行

1. 串行，第一个await执行完，再继续执行下一个
   ```js
   // 延时函数
   function delay(time) {
       return new Promise((resolve, reject) => {
           setTimeout(() => {
               resolve()
           }, time)
       })
   }
   
   // 模拟一个延迟接口
   async function getData(data) {
       await delay(2000)
       return data
   }
   
   
   async function fn() {
       // 串行的promise
       // 一个一个执行（如果不知道这个知识点的话，我们一般都会串行写）
       // 其实很多时候并行执行 await 速度更快
       // 这个例子先演示串行
       let a = await getData(111)
       let b = await getData(222)
       console.log(a);
       console.log(b);
       // 这样子使用 打印出来 a b 的结果 大约是4s，每个请求都会延迟2s
   }
   
   fn()
   ```
2. 并行，多个await一块执行
   上面的实例，换成并发就会好很多
   1. 方法一，先拿到promise，然后再await
      ```js
      function delay(time) {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve()
              }, time)
          })
      }
      
      // 模拟一个延迟接口
      async function getData(data) {
          await delay(2000)
          return data
      }
      
      
      async function fn() {
          // 串行的promise
          // 一个一个执行（如果不知道这个知识点的话，我们一般都会串行写）
          // 其实很多时候并行执行 await 速度更快
          // 看一下并行，方法一，先接收promise 在一起await
      
          let promise1 = getData(111)
          let promise2 = getData(222)
      
          let a = await promise1
          let b = await promise2
          console.log(a);
          console.log(b);
          // 这样子使用 打印出来 a b 的结果 大约是2s，并发执行了
      }
      
      fn()
      ```
   2. 方法二，使用Promise.all，（推荐这么写）
      ```js
      function delay(time) {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve()
              }, time)
          })
      }
      
      // 模拟一个延迟接口
      async function getData(data) {
          await delay(2000)
          return data
      }
      
      
      async function fn() {
          // 串行的promise
          // 一个一个执行（如果不知道这个知识点的话，我们一般都会串行写）
          // 其实很多时候并行执行 await 速度更快
          // 看一下并行，方法二，使用promise.all，推荐！！！！
      
          let [a, b] = await Promise.all([
              getData(111),
              getData(222)
          ])
          console.log(a);
          console.log(b);
          // 这样子使用 打印出来 a b 的结果 大约是2s，并发执行了
      }
      
      fn()
      ```

## 参考

[https://zh.javascript.info/async-await](https://zh.javascript.info/async-await)

[https://www.bilibili.com/video/BV1xW411J7K6?from=search&amp;seid=8212472971833036185&amp;spm_id_from=333.337.0.0](https://www.bilibili.com/video/BV1xW411J7K6?from=search&seid=8212472971833036185&spm_id_from=333.337.0.0)
