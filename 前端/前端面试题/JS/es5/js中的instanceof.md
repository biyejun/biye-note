## 前言

我们知道js的原型链很长很长，一个对象在访问某个属性或者方法时，如果自己没有，就会去原型链上找，一层一层往上找，直到找到为止，（原型链的相关知识参考上一篇文章，[原型链](http://www.bnbiye.cn/#/articleDetail/0bbfd760-420e-11ec-96d5-7933aca11ca0)）。那么当我们在写代码时，假如有一个实例对象，想去调用它父亲的某个方法，但是我们并不确定它是否属于这个父亲的实例对象时，该怎么做呢？比如下面代码：

```js
function Parent() { }
Parent.prototype.sayHi = function () {
    console.log('hello');
}

let son = new Parent() 
son.sayHi() // 假如我们不知道这个son是哪来的，想调用sayHi方法
```

在上面例子中，我们有个构造方法`Parent`，它的原型上有个`sayHi()`方法，有一个实例对象`son`，假如我们不能确定`son`对象是不是通过`Parent`声明出来的，如果想更安全的调用`sayHi()`方法，可以增加一层判断，使用`instanceof`，如：

```js
if (son instanceof Parent) { // 使用 instanceof 判断一下
    son.sayHi()
}
```

## `instanceof`的工作原理

> `A instanceof B`，就是顺着`A`的`__proto__`往上找，看看能不能找到`B.prototype`，如果能找到就返回`true`，如果找不到，就返回`false`。

借用一个[原型链](http://www.bnbiye.cn/#/articleDetail/0bbfd760-420e-11ec-96d5-7933aca11ca0)中的图。

![原型链](http://cdn.qiniu.bnbiye.cn/img/202111091631229.png)

如图中的`f2`和`f1`

```js
function Foo() { }
let f1 = new Foo()
console.log(f1.__proto__ === Foo.prototype); // true
console.log(f1.__proto__.__proto__ === Object.prototype); // true
console.log(f1.__proto__.__proto__.__proto__ === null); // true

console.log(f1 instanceof Foo); // true
console.log(f1 instanceof Object); // true
console.log(f1 instanceof null); // TypeError: Right-hand side of 'instanceof' is not an object
```

1. 因为`f1.__proto__ === Foo.prototype`，在`f1`的原型链上找到了`Foo`的原型，所以`f1 instanceof Foo === true`
2. 因为`f1.__proto__.__proto__ === Object.prototype`，在`f1`的原型链上找到了`Object`的原型，所以`f1 instanceof Object === true`

> 使用`typeof null `时，虽然返回值是`object`，但是`null`实际不是`object`，这是一个历史遗留问题，`null`在大多数语言中，被设计成空指针，指向了`Ox00`。参考：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

## 手写一个instanceof

1. `A instanceof B`，方法传入两个参数，A和B
2. 判断`A`的`__proto__`链上能不能找到`B.prototype`
3. 使用一个`while(true)`循环，一直往上找

```js
function MyInstanceof(leftValue, rightValue) {
    let rightPrototype = rightValue.prototype
    let leftProto = leftValue.__proto__

    while (true) {
        // 出口
        if (leftProto === null) {
            return false
        }

        if (leftProto === rightPrototype) {
            return true
        }

        leftProto = leftProto.__proto__
    }
}
```

## 参考

[https://juejin.cn/post/6844903613584654344#heading-1](https://juejin.cn/post/6844903613584654344#heading-1)
