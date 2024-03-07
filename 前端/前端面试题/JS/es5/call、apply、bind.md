## 前言

在上一篇文章中 [js的this指向](http://www.bnbiye.cn/#/articleDetail/9499b500-42c3-11ec-96d5-7933aca11ca0)，我们知道，js的`this`指向总是在运行时才能够确定，这样虽然很灵活，但是也不能满足所有的需求场景。假如在程序运行时，我们想人为的改变它指向到某一个对象上（不再是`.`前面的对象了），这时该怎么做呢？

于是`call、apply和bind`就出现了，可以显示的改变函数中的`this`指向。

## 一个例子

```js
const obj1 = {
    name: 'tom',
    getName() {
        console.log(this.name);
        console.log(Array.from(arguments));
    }
};

const obj2 = {
    name: 'jerry'
};

obj1.getName(1, 2, 3)
// tom
// [1,2,3]
```

如上述例子，我们什么也没做，`obj1`在调用自己的`getName()`方法时，因为`.`前面的对象是`obj1`，所以此时的`this`就是`obj1`，当打印`this.name`时输出了自己的`tom`。并且我们传入的参数`1, 2, 3`会被`arguments`接收，所以同时打印了`[1,2,3]`。让我们改写一下。

### call

使用`call`改变`this`指向。

```js
const obj1 = {
    name: 'tom',
    getName() {
        console.log(this.name);
        console.log(Array.from(arguments));
    }
};

const obj2 = {
    name: 'jerry'
};

obj1.getName.call(obj2, 1, 2, 3)
// jerry
// [1,2,3]
```

如上面的例子所示，当`obj1`调用`getName()`方法时，使用`call`显示的将`this`指向了`obj2`对象上，当在输出结果时，发现结果已经变了，因为此时的`this`显示的指向了`obj2`，所以打印`this.name`时，输出了`jerry`。并且我们传入的参数`1, 2, 3`会被`arguments`接收，所以同时打印了`[1,2,3]`。（注意，`call`的传参是一个一个传的）

> ?`function.call(thisArg, arg1, arg2, ...)`
> 
> * `thisArg`
>   可选的。在*`function`* 函数运行时使用的`this` 值。**非严格模式下** ，如果不传入，或传入`null`或`undefined`时会自动替换为全局对象，原始类型将会被包装。**严格模式下** ，传入的是什么就是什么，如果不传，就为`undefined`。
> * `arg1, arg2, ...`
>   指定的参数列表。
> * 返回值
>   调用有指定`this`值和参数的函数的结果。若该方法没有返回值，则返回`undefined`。

### apply

使用`apply`改变`this`指向。

```js
const obj1 = {
    name: 'tom',
    getName() {
        console.log(this.name);
        console.log(Array.from(arguments));
    }
};

const obj2 = {
    name: 'jerry'
};

obj1.getName.apply(obj2, [1, 2, 3])
// jerry
// [1,2,3]
```

如上面的例子所示，当`obj1`调用`getName()`方法时，使用`apply`显示的将`this`指向了`obj2`对象上，当在输出结果时，发现结果已经变了。因为此时的`this`指向`obj2`，所以打印`this.name`时，输出了`jerry`。并且我们传入的参数`[1, 2, 3]`会被`arguments`接收，所以同时打印了`[1,2,3]`。（注意，`apply`的传参是一个数组）

> ?`function.apply(thisArg, [argsArray])`
> 
> * `thisArg`
>   可选的（[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)上写的必选，应该是写错了，跟`call`方法是一样的）。在*`function`* 函数运行时使用的`this` 值。**非严格模式下** ，如果不传入，或传入`null`或`undefined`时会自动替换为全局对象，原始类型将会被包装。**严格模式下** ，传入的是什么就是什么，如果不传，就为`undefined`。
> * `argsArray`
>   可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给`func` 函数。如果该参数的值为`null`或`undefined`，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。
> * 返回值
>   调用有指定`this`值和参数的函数的结果。若该方法没有返回值，则返回`undefined`。

### bind

使用`bind`改变`this`指向。

```js
const obj1 = {
    name: 'tom',
    getName() {
        console.log(this.name);
        console.log(Array.from(arguments));
    }
};

const obj2 = {
    name: 'jerry'
};

const fn = obj1.getName.bind(obj2, 1, 2)
fn(3)
// jerry
// [1,2,3]
```

如上面的例子所示，当`obj1`调用`getName()`方法时，使用`bind`显示的将`this`指向了`obj2`对象上，`bind`并不会直接调用方法，而是会返回一个新函数，新函数的`this`被指定为`bind`的第一个参数，**其余参数将作为新函数的参数，供调用时使用** 。

我们调用新函数`fn`，当输出结果时，发现结果已经变了。因为此时的`this`指向`obj2`，所以打印`this.name`时，输出了`jerry`。

> ?`function.apply(thisArg[, arg1[, arg2[, ...]]])`
> 
> * `thisArg`
>   可选的。在`function` 函数运行时使用的`this` 值。**非严格模式下** ，如果不传入，或传入`null`或`undefined`时会自动替换为全局对象，原始类型将会被包装。**严格模式下** ，传入的是什么就是什么，如果不传，就为`undefined`。
> * `arg1, arg2, ...`
>   可选的。当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
> * 返回值
>   返回一个原函数的拷贝，称之为绑定函数（**bound function** ，BF），拥有指定的`this` 值和初始参数。

## call、apply、bind的区别

通过上面的例子，我们知道，`call、apply、bind`的作用都是用来改变js方法中的`this`指向。但是它们还有些区别。

* call、apply
  1. `call和apply`两个比较相似，它俩的第一个参数都是改变后的`this`值，都是可选的。在非严格模式下，该参数如果不传或者传入`null`或`undefined`时，都会默认指向全局对象（浏览器端指向`window`，`nodejs`端指向`global`），如果传入的是基本类型（number、boolean等），都会自动转换为对应的包装对象（Number、Boolean等）。在严格模式下，传入的是啥就是啥，如果不传，就是`undefined`。
  2. 但是它俩第二个参数就完全不一样了，`call`接收的是一串参数，想传多少传多少，比如`arg1, arg2, ...`。而`apply`第二个参数接收的是一个数组或者类数组对象，比如`[arg1, arg2, ...]`。
  3. 它俩还有一个相同点，都是直接调用的。
  4. 所以，这两个方法还是很相似的，如果参数想传数组就用`apply`，不需要传数组，一个一个传就用`call`。
* `bind`
  1. `bind`与`call、apply`的第一个参数类似，都是改变后的`this`值，并且在严格模式和非严格模式下的性质也都一样。
  2. 不同的地方是返回值不同，`call、apply`方法都是立即调用，返回值都是原先方法的返回值，如果原先方法没有返回值，就默认返回`undefined`。而`bind`的返回值是原来函数的一个拷贝，称之为绑定函数（**bound function** ，BF），即已经绑定好了`this`，其值为绑定时传入的第一个参数。调用绑定函数会执行包装函数（原函数）。绑定函数也可以使用`new`运算符构造，不过它提供的`this`会被忽略，参数仍会提供给模板函数。[参考 MDN，bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  3. `bind`的第一个参数是待绑定的`this`，从第二个参数开始，就可以随便传，传参的方式和`call`差不多，`arg1, arg2, ...`。`bind`传入的参数会跟新函数的参数做一个合并，假如在绑定`this`时，另外传了两个参数`arg1, arg2`，如：`const newFn =  oldFn.bind(null, arg1, arg2)`，然后调用新函数`newFn(arg3, arg4)`，最终执行新函数时，实际接收的参数就是`arg1, arg2, arg3, arg4`（会做一个合并）。
  4. 所以`bind`除了改变`this`外，有时也可以给某个函数预设初始值（利用参数合并的特点）。

## 手写call

手写call，注意下面几点

1. 第一个参数传的是`this`，然后可以传很多个参数`arg1, arg2, ...``
2. `this`默认是传的第一个参数，如果不是，就传`window`
3. 新写的方法应该是在构造函数`Function`的原型上面，比如，`Function.prorotype.mycall()`
4. 调用方式保持一致，`xxObj1.xxFn.myCall(xxObj2, arg1, arg2, ...)`或者`xxFn.myCall(xxObj, arg1, arg2, ...)`
5. 调用后的返回值与改变后`this`指向的原函数保持一致

```js
Function.prototype.myCall = function (xxObj, ...agrs) {
    // 2.
    xxObj = xxObj || window
    agrs = agrs || []
    // 为xxObj添加这个方法，为了避免与原来的属性键值冲突，使用Symbol作为key
    let key = Symbol()
    xxObj[key] = this // 因为调用方式是 xxObj1.xxFn.myCall(xxObj2, arg1, arg2, ...)，所以当前的this就是xxFn，将它塞到新对象上
    // 5.
    let x = xxObj[key](...agrs)
    delete xxObj[key] // 使用完后再删除

    return x
}
```

使用

```js
let obj1 = {
    name: 'aa',
    getName: function () {
        console.log(this.name, Array.from(arguments));
        return 'hhh'
    }
}

let obj2 = {
    name: 'bb'
}

let x1 = obj1.getName(1, 2) // aa [1, 2]
console.log(x1);// hhh
let x2 = obj1.getName.myCall(obj2, 3, 4) // bb [3, 4]
console.log(x2); // hhh
```

## 手写apply

`apply`和`call`就参数不一样。

1. 第一个参数传的是`this`，第二个参数是一个数组，比如`[arg1, arg2, ...]`
2. `this`默认是传的第一个参数，如果不是，就传`window`
3. 新写的方法应该是在构造函数`Function`的原型上面，比如，`Function.prorotype.mycall()`
4. 调用方式保持一致，`xxObj1.xxFn.myCall(xxObj2, arg1, arg2, ...)`或者`xxFn.myCall(xxObj, arg1, arg2, ...)`
5. 调用后的返回值与改变后`this`指向的原函数保持一致

```js
Function.prototype.myApply = function (context, args) {
    //这里默认不传就是给window或者global
    context = context || window
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args) // obj1.getName.myApply，所以此时会获得原始函数，待会直接调用
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}
```

使用

```js
let obj1 = {
    name: 'aa',
    getName: function () {
        console.log(this.name, Array.from(arguments));
        return 'hhh'
    }
}

let obj2 = {
    name: 'bb'
}

let x1 = obj1.getName(1, 2) // aa [1, 2]
console.log(x1);// hhh
let x2 = obj1.getName.myCall(obj2, [3, 4]) // bb [3, 4]
console.log(x2); // hhh
```

## 手写bind

1. bind第一个参数传的是this，这里默认传的是一个对象
2. bind从第二个参数开始，可以传很多个，类似call的传参，比如`arg1, arg2, ...`
3. bind返回的是一个绑定过this的绑定函数，绑定函数也可以传参，最终执行的时候，会和步骤2中的参数做一个合并
4. 绑定函数也可以使用new关键字，声明出来的对象就好像一个绑定好值的原构造方法的实例对象（绑定函数在使用new关键字构建对象时，它只起到一个包装作用，并没有干什么事，新对象仍有原构造方法的特性，比如能访问原构造方法原型上的属性和方法，即instanceof 原构造函数时，返回true）
5. 绑定函数也有返回值，返回值与原方法保持一致

```js
Function.prototype.myBind = function (context, ...agrs) {
    context = context || window
    agrs = agrs || []

    // 调用bind的方式是 xxxObj1.xxxFn.bind(xxxObj2, arg1, arg2, ...)，所以当前this就是 xxxFn
    let fn = this

    // 3.
    let boundFn = function () {
        // 参数合并
        let newArgs = [...agrs, ...arguments]
        // 5. 应该做一个判定，如果是new出来的对象，就会忽略原先的context
        context = this instanceof fn ? this : context
        let x = fn.apply(context, newArgs)
        return x
    }

    // 4. 需要考虑new的情况，使用寄生组合式继承的方式，需要做个简单的变形 返回的boundFn原型上的constructor属性还应该指向bind之前的构造器
    let TempFn = function () { }
    TempFn.prototype = fn.prototype
    boundFn.prototype = new TempFn
    boundFn.prototype.constructor = fn // 返回的绑定函数最终的constructor还是原来bind之前的函数

    return boundFn
}
```

使用1

```js
let obj1 = {
    name: 'aa',
    getName: function () {
        console.log(this.name, Array.from(arguments));
    }
}

let obj2 = {
    name: 'bb'
}

obj1.getName(1, 2, 3) // aa [1, 2, 3]
let newFN = obj1.getName.myBind(obj2, 1, 2)
newFN(3, 4) // bb [1, 2, 3, 4]
```

使用2

```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.toString = function () {
    console.log(`${this.name}---${this.age}`);
}

let newPersonFn = Person.myBind(obj1, 'dd', 20)
let p2 = new newPersonFn()
p2.toString() // dd---20
console.log(p2 instanceof newPersonFn); // true
console.log(p2 instanceof Person); // true
console.log(p2.constructor === Person); // true
```

## 参考

[https://juejin.cn/post/6844903496253177863#heading-1](https://juejin.cn/post/6844903496253177863#heading-1)

[https://juejin.cn/post/6844903891092389901](https://juejin.cn/post/6844903891092389901)

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

[https://juejin.cn/post/6946022649768181774#heading-30](https://juejin.cn/post/6946022649768181774#heading-30)
