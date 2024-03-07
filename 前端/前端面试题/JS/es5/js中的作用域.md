## 前言

我们知道js有作用域的概念，能否访问到某个变量，跟作用域有很大关系。在ES6之前，有全局作用域、函数作用域的概念，在ES6出现后，因为`let const`，出现了块级作用域的概念。我们通过例子来学习一下这几个作用域。

## 全局作用域

在代码中任何地方都能访问到的变量属于全局作用域。

### 例子1

最外层函数和最外层函数外面定义的变量属于全局作用域。

```js
var a = 'aaa' // 最外层的变量

function fn() { // 最外层的函数

    var b = 'bbb' // 内层变量

    function fn2() { // 内层函数
        console.log(b);
    }
    fn2()
}

console.log(a); // aaa

fn() // bbb

console.log(b); // ReferenceError: b is not defined

fn2() // ReferenceError: fn2 is not defined
```

### 例子2

所有未定义直接赋值的变量，自动声明为拥有全局作用域。会直接挂载到全局对象上，浏览器端为`window`对象，node端为`global`对象。

```js
// 浏览器端
function fn() {
    a = 'aaa'
    var b = 'bbb'
}
fn()
console.log(a); // aaa
console.log(window.a); // aaa
console.log(b); // ReferenceError: b is not defined
```

```js
// node环境
function fn() {
    a = 'aaa'
    var b = 'bbb'
}
fn()
console.log(a); // aaa
console.log(global.a); // aaa
console.log(b); // ReferenceError: b is not defined
```

### 例子3

所有全局对象下的属性拥有全局作用域。（浏览器端是`window`，node端是`global`）

```js
// 浏览器端
function fn() {
    console.log(alert); // ƒ alert() { [native code] }
}
fn()
console.log(alert); // ƒ alert() { [native code] }
```

```js
// node端
function fn() {
    console.log(setImmediate); // [Function: setImmediate]
}
fn()
console.log(setImmediate); // [Function: setImmediate]
```

### 小结

1. 最外层函数 和 在最外层函数外面定义的变量属于全局作用域。
2. 所有未定义，直接赋值的变量自动声明为属于全局作用域，比如`a = 'aaa'`
3. 全局对象下的属性属于全局作用域（浏览器端是`window`，node端是`global`）

> ?在最外层使用`var`声明的变量，或者使用`function`声明的函数变量，浏览器端默认就直接挂载到了全局对象window上面，比如：
> 
> ```js
> function fn() { }
> var a = 'aaa'
> 
> console.log(window.a); // aaa
> console.log(window.fn); // ƒ fn() { }
> ```
> 
> 如果，我们在最外层写了很多这样的代码，变量定义都没有用函数包裹，那么就全部挂载到了`window`对象上，很容易就污染全局命名空间，引起命名冲突。（node端没啥事，node这样写不会挂在在`global`对象上，如果想挂载上面一个新的全局对象，可以使用`globalThis.xxx = 'aaa'，或者啥也不加xxx = 'aaa'`）。
> 
> 其实导致这样的原因，还是因为`var`这个早期的变量声明方式，改成`let`就没啥事了，不过`function`声明的变量还是挂载上去：
> 
> ```js
> function fn() { }
> let a = 'aaa'
> 
> console.log(window.a); // undefined
> console.log(window.fn); // ƒ fn() { }
> ```
> 
> 所以想避免，最好使用匿名的立即执行函数包裹一下：
> 
> ```js
> (function () {
>     var a = 'aaa'
>     function b() { }
> })()
> 
> console.log(a); // ReferenceError: a is not defined，包裹后就不会污染全局对象了
> console.log(b); // ReferenceError: b is not defined
> ```

## 函数作用域

函数作用域也是我们说的局部作用域，是指声明在函数内部的变量，只允许在函数的内部访问。函数作用域是分层的（因为可以函数套函数），内层作用域可以访问到外层的变量，反之则不行。比如：

```js
function fn1() {
    var a = 'aaa'
    function fn2() {
        console.log(a);
    }
    fn2()
}
fn1() // aaa
console.log(a); // ReferenceError: a is not defined
fn2() // ReferenceError: fn2 is not defined
```

## 块级作用域

要想弄懂块级作用域，先得搞懂`var `和  `let、const `。

### var 和  let 、const

* `var`和`function`声明的变量，在运行时，会先做一次变量提升，`var`提升的只是声明，真正赋值的还在之前的地方。
  块级作用域是`ES6`有了`let const`而新出的概念，在`ES5`时代，声明变量只能够使用`var`，但是`var`有很多反人类的设定，比如，你使用`var`声明一个变量后，你在声明位置处之前都能调用到这个变量，虽然是`undefined`，但是也很难受。我们都知道，这是因为js在执行一段代码时，会先有一个预编译的过程，`var`和`function`声明的变量都会做一个提升，比如下面的这段代码，你很难一眼看出来它输出个啥：
  
  ```js
  console.log(a);
  var a = 'aaa'
  function a() { }
  console.log(a);
  ```
  
  我们其实可以在脑海里做一下提升，`var`和`function`都会提升，提升之后的效果就是最上面一排是`var`，然后是`function`，记住`var`只提升声明，提升后的效果如下：
  
  ```js
  var a // 提升
  function a() { } // 提升
  console.log(a); // [Function: a]
  a = 'aaa'
  console.log(a); // aaa
  ```
  
  所以最后就看出来了，先输出`[Function: a]`，再输出`aaa`。
* `var`声明的变量能够重复声明，不会报错，`let`和`const`就不行。
  如果我们用 `let` 在同一作用域下将同一个变量声明两次，则会出现错误：
  
  ```js
  let user;
  let user; // SyntaxError: 'user' has already been declared
  ```
  
  但是使用 `var`，我们可以重复声明一个变量，不管多少次都行。如果我们对一个已经声明的变量使用 `var`，这条新的声明语句会被忽略：
  
  ```js
  var user = "Pete";
  var user = "John"; // 这个 "var" 无效（因为变量已经声明过了）
  // ……不会触发错误
  console.log(user) // John
  ```
* `var`声明的变量没有块级作用域（来了来了，太奇葩了）。
  用 `var` 声明的变量，不是函数作用域就是全局作用域。它们在代码块外也是可见的（也就是说，`var` 声明的变量只有函数作用域和全局作用域，没有块级作用域），比如下面这个例子：
  
  ```js
  if (true) {
    var test = true; // 使用 "var" 而不是 "let"
  }
  console.log(test) // true，变量在 if 结束后仍存在
  ```
  
  由于 `var` 会忽略代码块，因此我们有了一个全局变量 `test`。
  
  如果我们在第二行使用 `let test` 而不是 `var test`，那么该变量将仅在 `if` 内部可见：
  
  ```js
  if (true) {
    let test = true; // 使用 "let"
  }
  console.log(test) // Error: test is not defined
  ```
  
  对于循环也是这样的，`var` 声明的变量没有块级作用域也没有循环局部作用域：
  
  ```js
  for (var i = 0; i < 10; i++) {
    var one = 1;
    // ...
  }
  console.log(i) // 10，"i" 在循环结束后仍可见，它是一个全局变量
  console.log(one) // 1，"one" 在循环结束后仍可见，它是一个全局变量
  ```
  
  对于普通代码块也是这样的，比如：
  
  ```js
  {
      var message = "Hello";
  }
  
  {
      var message = "Goodbye";
  }
  
  console.log(message); // Goodbye
  ```
  
  根本就没有块的概念，直接在最外边拿到了最后一次赋值的`Goodbye`，但是`let`却有块的概念，如果改为`let`声明，在代码块的外部是访问不到`message`的，只能在代码块的内部访问，比如：
  
  ```js
  {
      let message = "Hello";
      console.log(message) // Hello
  }
  
  {
      let message = "Goodbye";
      console.log(message) // Goodbye
  }
  
  console.log(message); // ReferenceError: message is not defined
  ```
  
  可以看到，`var` 穿透了 `if`，`for` 和其它代码块。这是因为在早期的 JavaScript 中，块没有词法环境，而 `var` 就是这个时期的代表之一。

> `const`与`let`的基本特性都是一致的，无法重复声明，声明位置处之前是无法使用的，有块级作用域。它俩唯一的区别是，`const`声明的变量，声明时就必须给个初始值，不给就会报错。而一旦初始化值后，该值是不允许在改变的。所以`const`一般用来声明一些不需要改变的值，比如`Math.PI`等等。

### 块级作用域小结

通过了解`var`和`let、const`的区别后，我们也已经知道了块级作用域到底是个什么东西，如果变量全部使用老古董`var`去声明，根本就没有块级作用域的概念，只有当使用`let、const`声明时，才有这个概念。所以简单的总结一下。

1. 块级作用域可以通过`let`和`const`来触发，`var`不会触发块级作用域。
2. 只要有花括号`{}`，使用`let`和`const`后，都可以触发块级作用域，比如基本的代码块`{}`、`if`中的代码块`if(){}`、`for`中的代码块`for(){}`、`function`中的代码块`function(){}`等等。
3. 使用`let`和`const`触发块级作用域后，变量不会提升，不允许重复声明，声明的变量只能在当前的代码块内部使用。

## 作用域链

作用域也有链的概念，在函数作用域声明变量时，函数里面可以套函数，这样层层嵌套，最后也形成了一个链式结构。当访问一个变量时，类似于原型链，也会一层一层的向上找，如果当前作用域找不到，就到父作用域找，一直找到全局作用域如果还没找到，那么就直接报错（`ReferenceError: xxx is not defined`）。

> ?在作用域链中找一个变量时，会首先在函数创建的那个作用域里找，这里必须强调一下“创建”，而不是“调用”。比如：
> 
> ```js
> let a = 10
> function fn() {
>     let b = 20
>     function fn2() {
>         console.log(a + b);
>     }
>     return fn2
> }
> 
> let x = fn()
> let b = 200
> x() // 30 最后结果是 30 而不是 210，所以与创建的作用域有关，与在哪里调用无关
> ```

## 总结

1. 在ES6之前，js只有全局作用域和函数作用域的概念（也称局部作用域），ES6之后，随着`let和const`的出现，出现了块级作用域的概念。
2. 全局作用域是指：使用`function`声明在最外层的函数 或者 声明在最外层函数外边的变量，这些变量就属于全局作用域。
   1. 如果在浏览器环境下，在最外层使用`var`和`function`声明的变量，会默认挂在在全局对象`window`下面。
   2. 全局对象下的属性和方法，都属于全局作用域（浏览器端为`window`，node端为`global`）。
   3. 如果不加任何修饰，直接对一个变量赋值，比如`a = 10`，那么这个变量将会直接被挂载到全局对象上（浏览器端挂载在`window`上，node端挂载到`global`上）。
3. 函数作用域也称局部作用域，是指声明在函数内部的变量，只有在函数内部才能访问到。函数作用域是分层的，内层作用域可以访问到外层的变量，反之不可以。
4. 块级作用域是ES6出现的概念，只有当使用`let`或者`const`才会触发，`var`不会触发块级作用域。
   1. 只要有花括号`{}`，使用`let`和`const`后，都可以触发块级作用域，比如基本的代码块`{}`、`if`中的代码块`if(){}`、`for`中的代码块`for(){}`、`function`中的代码块`function(){}`等等。
   2. 使用`let`和`const`触发块级作用域后，变量不会提升，不允许重复声明，变量只能在当前的代码块内部使用。
5. 作用域链的概念类似于原型链，当访问一个变量时，会首先在函数当前作用域中找，如果找不到就去父作用域中找，直到找到为止，如果找不到，就会报错（`ReferenceError: xxx is not defined`）。
   1. 注意：找变量时，是在函数`创建`的作用域下一层一层往上找，跟`调用`的位置没关系。
6. `var`和`let、const`的区别
   1. `var`有变量提升，允许重复声明，可以在声明前调用。（注意，`function`声明的函数也会提升，如果同时存在`var`和`function`，最终提升的效果是`var`的声明总会在`function`的上面）。
   2. `var`只有全局作用域和函数作用域的概念，那些花括号包裹的代码块，比如`{}`、`if(){}`、`for(){}`、`while(){}`，（除了`function`包裹的函数作用域外），`var`全都会无视它们，都会将变量的声明提升到花括号外面去。
   3. `let`和`const`不存在变量提升、不允许重复声明、不允许在声明之前调用。
   4. 使用`let`和`const`声明的变量会触发块级作用域，即上面说的那些花括号`{}`包裹的变量，变量只能在当前块下面访问，外部是访问不到的。
   5. `const`相较于`let`还是有点区别的，`const`一般用于声明常量，且在声明时必须初始化一个值，否则会报错，而一旦初始化值后，就不能再改变。`let`则可以先声明，等使用的时候再进行赋值，也可以声明时直接赋值。`let`声明的变量允许改变。

## 参考

[https://zh.javascript.info/var#var-mei-you-kuai-ji-zuo-yong-yu](https://zh.javascript.info/var#var-mei-you-kuai-ji-zuo-yong-yu)
