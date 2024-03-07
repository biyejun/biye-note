## 前言

使用常规的`{}`花括号可以创建一个对象，但是当我们想要创建相似的对象时，如果还使用`{}`就会产生很多冗余的代码，所以为了方便，js就设计了`new`关键字，我们可以对构造函数使用`new`操作符来创建一类相似的对象。

## 构造函数

### new

构造函数在技术上是常规函数。不过有两个约定：

1. 它们的命名通常以大写字母开头。
2. 它们只能由`"new"` 操作符来执行。

> 约定就是我们的代码书写习惯，应该尽量遵循。

```js
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

console.log(user.name); // Jack
console.log(user.isAdmin); // false
```

当一个函数被使用 `new` 操作符执行时，它按照以下步骤：

1. 一个新的空对象被创建并分配给`this`。
2. 函数体执行。通常它会修改`this`，为其添加新的属性。
3. 返回`this` 的值。

换句话说，`new User(...)` 做的就是类似的事情：

```js
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

所以 `new User("Jack")` 的结果是相同的对象：

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

现在，如果我们想创建其他用户，我们可以调用 `new User("Ann")`，`new User("Alice")` 等。比每次都使用字面量创建要短得多，而且更易于阅读。

这是构造器的主要目的 —— 实现可重用的对象创建代码。

> ?从技术上讲，任何函数（除了箭头函数，它没有自己的 `this`）都可以用作构造器。即可以通过 `new` 来运行，它会执行上面的算法。“首字母大写”是一个共同的约定，以明确表示一个函数将被使用 `new` 来运行。

### new.target（了解，不常用）

在一个函数内部，我们可以使用 `new.target` 属性来检查它是否被使用 `new` 进行调用了。

对于常规调用，它为空，对于使用 `new` 的调用，则等于该函数：

```js
function User() {
    console.log(new.target);
}

// 不带 "new"：
User(); // undefined

// 带 "new"：
new User(); // function User { ... }
```

它可以被用在函数内部，来判断该函数是被通过 `new` 调用的“构造器模式”，还是没被通过 `new` 调用的“常规模式”。

我们也可以让 `new` 调用和常规调用做相同的工作，像这样：

```js
function User(name) {
    if (!new.target) { // 如果你没有通过 new 运行我
        return new User(name); // ……我会给你添加 new
    }

    this.name = name;
}

let john = User("John"); // 将调用重定向到新用户
console.log(john.name); // John
```

这种方法有时被用在库中以使语法更加灵活。这样人们在调用函数时，无论是否使用了 `new`，程序都能工作。

不过，到处都使用它并不是一件好事，因为省略了 `new` 使得很难观察到代码中正在发生什么。而通过 `new` 我们都可以知道这创建了一个新对象。

### 构造器的return

通常，构造器没有 `return` 语句。它们的任务是将所有必要的东西写入 `this`，并自动转换为结果。

但是，如果这有一个 `return` 语句，那么规则就简单了：

* 如果`return` 返回的是一个对象，则返回这个对象，而不是`this`。
* 如果`return` 返回的是一个原始类型，则忽略。

换句话说，带有对象的 `return` 返回该对象，在所有其他情况下返回 `this`。

例如，这里 `return` 通过返回一个对象覆盖 `this`：

```js
function BigUser() {
    this.name = "John";
    return { name: "Godzilla" };  // <-- 返回这个对象
}

console.log(new BigUser().name);  // Godzilla，得到了那个对象
```

这里有一个 `return` 为空的例子（或者我们可以在它之后放置一个原始类型，没有什么影响）：

```js
function SmallUser() {
    this.name = "John";
    return; // <-- 返回 this
}

console.log(new SmallUser().name);  // John
```

通常构造器没有 `return` 语句。这里我们主要为了完整性而提及返回对象的特殊行为。

> ✈**省略括号**
> 
> 顺便说一下，如果没有参数，我们可以省略 `new` 后的括号：
> 
> ```js
> let user = new User; // <-- 没有参数
> // 等同于
> let user = new User();
> ```
> 
> 这里省略括号不被认为是一种“好风格”，但是规范允许使用该语法。

### 构造器中的方法

使用构造函数来创建对象会带来很大的灵活性。构造函数可能有一些参数，这些参数定义了如何构造对象以及要放入什么。

当然，我们不仅可以将属性添加到 `this` 中，还可以添加方法。

例如，下面的 `new User(name)` 用给定的 `name` 和方法 `sayHi` 创建了一个对象：

```js
function User(name) {
    this.name = name;

    this.sayHi = function () {
        console.log("My name is: " + this.name);
    };
}

let john = new User("John");

john.sayHi(); // My name is: John

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

## 手写一个new

```js
function myNew() {
    // 1、创建一个空对象
    let obj = new Object()
    let constructor = [].shift.call(arguments) // 获取构造方法

    // 2、将新对象的原型指向 构造方法的prototype上
    obj.__proto__ = constructor.prototype

    // 3、获取到构造方法的返回值（如果原先构造方法有返回值，且是对象，那么原始的new会把这个对象返回出去，基本类型会忽略）

    let ret = constructor.apply(obj, arguments) // 这里的arguments的第一个参数已经在最开始被shift了，所以剩下的参数全都是构造方法需要的值

    // (ret || obj)是为了判断null，当为null时，也返回新对象
    return typeof ret === 'object' ? (ret || obj) : obj

}
```

使用

```js
function Person(name, age) {
    this.name = name
    this.age = age
}

let p = myNew(Person, 'cheny', 28)
console.log(p instanceof Person);
```

## 总结

1. 对构造函数使用`new`关键字会产生一个新对象。
2. 使用`new`时可以大致看成下面几步
   ```js
   function User(name) {
     // 1、this = {};（隐式创建）
   
     // 2、this.__proto__ = User.prototype
   
     // 3、添加属性到 this
     this.name = name;
     this.isAdmin = false;
   
     // 4、return this;（隐式返回）
   }
   ```
3. 如果构造函数有返回值时，新对象有两种情况：
   * 如果`return` 返回的是一个对象，则返回这个对象，而不是`this`。
   * 如果`return` 返回的是一个原始类型，则忽略。
4. 手写`new`时，应注意将新对象的`__proto__`指向构造方法的`prototype`上。

## 参考

[https://zh.javascript.info/constructor-new](https://zh.javascript.info/constructor-new)

[https://juejin.cn/post/6946022649768181774#heading-30](https://juejin.cn/post/6946022649768181774#heading-30)
