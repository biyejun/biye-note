## 前言

js中的`typeof`关键字可以用来判断数据的基本类型，它会返回一个字符串，比如`number`、`string`、`boolean`、`object`、`undefined`等等。其实除了可以使用`typeof`来判断数据类型，我们还可以使用`Object.prototype.toString.call()`，这个方法更灵活好用，本章我们都来学习一下。

## typeof

### typeof的所有可返回值

| 类型                       | 结果           |
| ---------------------------- | ---------------- |
| Undefined                  | "undefined"    |
| Null                       | "object"       |
| Boolean                    | "boolean"      |
| Number                     | "number"       |
| BigInt                     | "bigint"       |
| String                     | "string"       |
| Symbol                     | "symbol"       |
| 宿主对象（由 JS 环境提供） | 取决于具体实现 |
| Function对象               | "function"     |
| 其他任何对象               | "object"       |

参考：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

### 示例

```js
// 数值
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值

typeof 42n === 'bigint';


// 字符串
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // 注意内容为数字的字符串仍是字符串
typeof (typeof 1) === 'string'; // typeof 总是返回一个字符串
typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全


// 布尔值
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()


// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';


// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined';


// 对象
typeof {a: 1} === 'object';

// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';
typeof /regex/ === 'object'; // 历史结果请参阅正则表达式部分


// 下面的例子令人迷惑，非常危险，没有用处。避免使用它们。
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';

// 函数
typeof function() {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function';
```

### typeof null

```js
// JavaScript 诞生以来便如此
typeof null === 'object';
```

### typeof 正则表达式

对正则表达式字面量的类型判断在某些浏览器中不符合标准：

```js
typeof /s/ === 'function'; // Chrome 1-12 , 不符合 ECMAScript 5.1
typeof /s/ === 'object'; // Firefox 5+ , 符合 ECMAScript 5.1
```

### typeof在ES6可能抛出的异常

在 ECMAScript 2015 之前，`typeof` 总能保证对任何所给的操作数返回一个字符串。即便是没有声明的标识符，`typeof` 也能返回 `'undefined'`。使用 `typeof` 永远不会抛出错误。

但在加入了块级作用域的 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 和 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 之后，在其被声明之前对块中的 `let` 和 `const` 变量使用 `typeof` 会抛出一个 [ReferenceError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)。块作用域变量在块的头部处于“[暂存死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_and_errors_with_let)”，直至其被初始化，在这期间，访问变量将会引发错误。

```js
typeof undeclaredVariable === 'undefined';

typeof newLetVariable; // ReferenceError
typeof newConstVariable; // ReferenceError
typeof newClass; // ReferenceError

let newLetVariable;
const newConstVariable = 'hello';
class newClass{};
```

## Object.prototype.toString

> `typeof`虽然使用起来很方便，但是在一些特殊的场景下还是会不好用。比如`typeof null`或者是正则表达式。有一个替代的方法，Object.prototype.toString

```js
let obj = {};
let arr = [1, 2, 3]
let reg = /123/g
let fn = function () { }

let _s = Object.prototype.toString

console.log(obj.toString()); // [object Object]

console.log(_s.call(arr)); // [object Array]
console.log(_s.call(reg)); // [object RegExp]
console.log(_s.call(null)); // [object Null]
console.log(_s.call(undefined)); // [object Undefined]
console.log(_s.call(true)); // [object Boolean]
console.log(_s.call(Symbol())); // [object Symbol]
console.log(_s.call(123)); // [object Number]
console.log(_s.call('123')); // [object String]
console.log(_s.call(18n)); // [object BigInt]
console.log(_s.call(fn)); // [object Function]
```

## 参考

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
