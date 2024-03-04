## 前言

let和const的出现，比相较于远古时期的var出现了下面的几点变化

1. 不允许重复声明
2. 不存在变量提升
3. 出现了块级作用域
4. 暂时性死区

## 不允许重复声明

```js
// 早期使用var 允许重复声明
var a = 123
var a = 456
console.log(a) //456
```

```js
// 使用let后 不允许重复声明，会报错
let a = 123
let a = 456
console.log(a) //SyntaxError: Identifier 'a' has already been declared
```

## 不存在变量提升

```js
// 早期的var 会变量提升
console.log(a) // undefined 即使还没声明 a，就已经可以打印了
var a = 10
console.log(a) // 10
```

```js
// 上面的例子类似于
var a // 变量被提升了
console.log(a) // undefined
a= 10
console.log(a) // 10
```

```js
// 使用let就不会提升了
console.log(a) // 直接报错  ReferenceError: Cannot access 'a' before initialization
let a = 10
```

## 块级作用域

在还没出现let和const时，只有全局作用域和函数作用域，没有块级作用域的概念，比如

```js
var a = 10
if(true) {
    var a = 20
}
console.log(a) // 20
/*
因为没有块级作用域，a被重新赋值为了20
*/
```

```js
// 使用let或者const之后 出现了块级作用域
let a = 10
if(true) {
    let a = 20
}
console.log(a) // 10
/*
有了块级作用域，只会访问到外部的变量 a
*/
```

## 暂时性死区

在没有let或者const之前，直接不使用任何修饰符赋值一个变量时，会被挂载到全局对象上，比如：

```js
a = 10 // 没有使用任何修饰符，会直接挂载到全局
console.log(a) // 10
var a = 20 
console.log(a) // 20 使用var还能重新对它赋值
```

```js
a = 10 // 会报错
// 因为在这个区域内使用使用了let a，在声明a之前的部分，a是不可用的，称为a变量的“死区”
let a = 20
```

## 总结

1. 在ES6之前，js只有全局作用域和函数作用域的概念（也称局部作用域），ES6之后，随着`let和const`的出现，出现了块级作用域的概念。
2. 使用`let`和`const`触发块级作用域后，变量不会提升，不允许重复声明，变量只能在当前的代码块内部使用。
3. `var`和`let、const`的区别
   1. `var`有变量提升，允许重复声明，可以在声明前调用。（注意，`function`声明的函数也会提升，如果同时存在`var`和`function`，最终提升的效果是`var`的声明总会在`function`的上面）
   2. `var`只有全局作用域和函数作用域的概念，那些花括号包裹的代码块，比如`{}`、`if(){}`、`for(){}`、`while(){}`，（除了`function`包裹的函数作用域外），`var`全都会无视它们，都会将变量的声明提升到花括号外面去
   3. `let`和`const`不存在变量提升、不允许重复声明、不允许在声明之前调用。
   4. 使用`let`和`const`声明的变量会触发块级作用域，即上面说的那些花括号`{}`包裹的变量，变量只能在当前块下面访问，外部是访问不到的。
   5. `const`相较于`let`还是有点区别的，`const`一般用于声明常量，且在声明时必须初始化一个值，否则会报错，而一旦初始化值后，就不能再改变。`let`则可以先声明，等使用的时候再进行赋值，也可以声明时直接赋值。`let`声明的变量允许改变。

> 可以参考另外一篇文章：[js中的作用域](http://www.bnbiye.cn/#/articleDetail/544247d0-4b8b-11ec-96d5-7933aca11ca0)
> 
> 已经对var、let、const做了更详细讲解
