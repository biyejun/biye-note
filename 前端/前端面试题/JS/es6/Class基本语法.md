## Class基本语法

> *在面向对象的编程中，**class* *是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数或方法）的实现。*

在日常开发中，我们经常需要创建许多相同类型的对象，例如用户（users）、商品（goods）或者任何其他东西。

正如我们在 [构造器和操作符 &#34;new&#34;](https://zh.javascript.info/constructor-new) 一章中已经学到的，`new function` 可以帮助我们实现这种需求。

但在现代 JavaScript 中，还有一个更高级的“类（class）”构造方式，它引入许多非常棒的新功能，这些功能对于面向对象编程很有用。

## class 语法

基本语法是：

```js
class MyClass {
  // class 方法
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

然后使用 `new MyClass()` 来创建具有上述列出的所有方法的新对象。

`new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化对象。

例如：

```js
class User {

    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(this.name);
    }

}

// 用法：
let user = new User("John");
user.sayHi();
```

当 `new User("John")` 被调用：

1. 一个新对象被创建。
2. `constructor` 使用给定的参数运行，并将其赋值给`this.name`。

……然后我们就可以调用对象方法了，例如 `user.sayHi`。

> **类的方法之间没有逗号**
> 
> 对于新手开发人员来说，常见的陷阱是在类的方法之间放置逗号，这会导致语法错误。
> 
> 不要把这里的符号与对象字面量相混淆。在类中，不需要逗号。

## 什么是 class

所以，`class` 到底是什么？正如人们可能认为的那样，这不是一个全新的语言级实体。

让我们揭开其神秘面纱，看看类究竟是什么。这将有助于我们理解许多复杂的方面。

在 JavaScript 中，类是一种函数。

看看下面这段代码：

```js
class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
}

// 佐证：User 是一个函数
console.log(typeof User); // function
```

`class User {...}` 构造实际上做了如下的事儿：

1. 创建一个名为`User` 的函数，该函数成为类声明的结果。该函数的代码来自于`constructor` 方法（如果我们不编写这种方法，那么它就被假定为空）。
2. 存储类中的方法，例如`User.prototype` 中的`sayHi`。

当 `new User` 对象被创建后，当我们调用其方法时，它会从原型中获取对应的方法，正如我们在 [F.prototype](https://zh.javascript.info/function-prototype) 一章中所讲的那样。因此，对象 `new User` 可以访问类中的方法。

我们可以将 `class User` 声明的结果解释为：

![image-20220311224755472](http://cdn.qiniu.bnbiye.cn/img/202203112247562.png)

下面这些代码很好地解释了它们：

```js
class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
}

// class 是一个函数
console.log(typeof User); // function

// ...或者，更确切地说，是 constructor 方法
console.log(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
console.log(User.prototype.sayHi); // sayHi 方法的代码

// 在原型中实际上有两个方法
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## 不仅仅是语法糖

人们常说 `class` 是一个语法糖（旨在使内容更易阅读，但不引入任何新内容的语法），因为我们实际上可以在不使用 `class` 的情况下声明相同的内容：

```js
// 用纯函数重写 class User

// 1. 创建构造器函数
function User(name) {
    this.name = name;
}
// 函数的原型（prototype）默认具有 "constructor" 属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
User.prototype.sayHi = function () {
    console.log(this.name);
};

// 用法：
let user = new User("John");
user.sayHi();
```

这个定义的结果与使用类得到的结果基本相同。因此，这确实是将 `class` 视为一种定义构造器及其原型方法的语法糖的理由。

尽管，它们之间存在着重大差异：

1. 首先，通过 `class` 创建的函数具有特殊的内部属性标记 `[[IsClassConstructor]]: true`。因此，它与手动创建并不完全相同。
   编程语言会在许多地方检查该属性。例如，与普通函数不同，必须使用 `new` 来调用它：
   
   ```js
   class User {
       constructor() { }
   }
   
   console.log(typeof User); // function
   User(); // Error: Class constructor User cannot be invoked without 'new'
   ```
   
   此外，大多数 JavaScript 引擎中的类构造器的字符串表示形式都以 “class…” 开头
   
   ```js
   class User {
       constructor() { }
   }
   
   console.log(User); // [class User]
   ```
   
   还有其他的不同之处，我们很快就会看到。
2. 类方法不可枚举。 类定义将 `"prototype"` 中的所有方法的 `enumerable` 标志设置为 `false`。
   这很好，因为如果我们对一个对象调用 `for..in` 方法，我们通常不希望 class 方法出现。
3. 类总是使用 `use strict`。 在类构造中的所有代码都将自动进入严格模式。

此外，`class` 语法还带来了许多其他功能，我们稍后将会探索它们。

## 类表达式

就像函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等。

这是一个类表达式的例子：

```js
let User = class {
    sayHi() {
        console.log("Hello");
    }
};
```

类似于命名函数表达式（Named Function Expressions），类表达式可能也应该有一个名字。

如果类表达式有名字，那么该名字仅在类内部可见：

```js
// “命名类表达式（Named Class Expression）”
// (规范中没有这样的术语，但是它和命名函数表达式类似)
let User = class MyClass {
    sayHi() {
        console.log(MyClass); // MyClass 这个名字仅在类内部可见
    }
};

new User().sayHi(); // 正常运行，显示 MyClass 中定义的内容

console.log(MyClass); // error，MyClass 在外部不可见 ReferenceError: MyClass is not defined
```

我们甚至可以动态地“按需”创建类，就像这样：

```js
function makeClass(phrase) {
    // 声明一个类并返回它
    return class {
        sayHi() {
            console.log(phrase);
        }
    };
}

// 创建一个新的类
let User = makeClass("Hello");

new User().sayHi(); // Hello
```

## Getters/setters

就像对象字面量，类可能包括 getters/setters，计算属性（computed properties）等。

这是一个使用 `get/set` 实现 `user.name` 的示例：

```js
class User {
    constructor(name) {
        // 调用 setter
        this.name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }
}

let user = new User("John");
console.log(user.name); // John

user = new User(""); // Name is too short.
```

从技术上来讲，这样的类声明可以通过在 `User.prototype` 中创建 getters 和 setters 来实现。

## 计算属性名称`[...]`

这里有一个使用中括号 `[...]` 的计算方法名称示例：

```js
class User {

  ['say' + 'Hi']() {
    console.log("Hello");
  }

}

new User().sayHi();
```

这种特性很容易记住，因为它们和对象字面量类似。

## Class 字段

> **旧的浏览器可能需要 polyfill**
> 
> 类字段（field）是最近才添加到语言中的。

之前，我们的类仅具有方法。

“类字段”是一种允许添加任何属性的语法。

例如，让我们在 `class User` 中添加一个 `name` 属性：

```js
class User {
    name = "John";

    sayHi() {
        console.log(`Hello, ${this.name}!`);
    }
}

new User().sayHi(); // Hello, John!
```

所以，我们就只需在表达式中写 " = "，就这样。

类字段重要的不同之处在于，它们会在每个独立对象中被设好，而不是设在 `User.prototype`：

```js
class User {
    name = "John";
}

let user = new User();
console.log(user.name); // John
console.log(User.prototype.name); // undefined
```

我们也可以在赋值时使用更复杂的表达式和函数调用：

```js
class User {
    name = setName();
}

function setName() {
    return 'john'
}

let user = new User();
console.log(user.name); // John
```

## 使用类字段制定绑定方法

正如 [函数绑定](https://zh.javascript.info/bind) 一章中所讲的，JavaScript 中的函数具有动态的 `this`。它取决于调用上下文。

因此，如果一个对象方法被传递到某处，或者在另一个上下文中被调用，则 `this` 将不再是对其对象的引用。

例如，此代码将显示 `undefined`：

```js
class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        console.log(this.value);
    }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
```

这个问题被称为“丢失 `this`”。

我们在 [函数绑定](https://zh.javascript.info/bind) 一章中讲过，有两种可以修复它的方式：

1. 传递一个包装函数，例如`setTimeout(() => button.click(), 1000)`。
2. 将方法绑定到对象，例如在 constructor 中。

类字段提供了另一种非常优雅的语法：

```js
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

类字段 `click = () => {...}` 是基于每一个对象被创建的，在这里对于每一个 `Button` 对象都有一个独立的方法，在内部都有一个指向此对象的 `this`。我们可以把 `button.click` 传递到任何地方，而且 `this` 的值总是正确的。

在浏览器环境中，它对于进行事件监听尤为有用。

## 总结

1. 在使用new关键字，声明一个实例对象的时候，在ES5时是这么用的
   
   ```js
   function User(name, age) {
       this.name = name
       this.age = age
   }
   
   User.prototype.sayHi = function () {
       console.log(`你好 我是${this.name}，我今年${this.age}岁了`)
   }
   
   let a = new User('cheny', 18)
   a.sayHi() // 你好 我是cheny，我今年18岁
   
   console.log(a.constructor === User); // true
   // 我们在学习new的时候知道，其实调用构造方法的时候就是返回了一个this对象，并且把对象上的constructor属性 指向了构造方法
   ```
2. 我们可以使用 class 关键字来改造上面的构造方法
   
   ```js
   class User {
       constructor(name, age) {
           this.name = name
           this.age = age
       }
   
       sayHi() {
           console.log(`你好 我是${this.name}，我今年${this.age}岁了`)
       }
   }
   
   
   let a = new User('cheny', 18)
   a.sayHi() // 你好 我是cheny，我今年18岁
   
   console.log(a.constructor === User); // true
   ```
   
   new 会自动调用 constructor()方法。
3. ` class User {...}`实际上做了两件事
   
   1. 创建一个名为User的函数，该函数的代码来自于constructor方法，如果没有编写constructor方法，那么会假定为空
   2. 类中的方法都会被挂载到prototype属性上
4. 我们来验证一下
   
   ```js
   class User {
       constructor(name) { this.name = name; }
       sayHi() { console.log(this.name); }
   }
   
   // class 是一个函数
   console.log(typeof User); // function
   
   // ...或者，更确切地说，是 constructor 方法
   console.log(User === User.prototype.constructor); // true
   
   // 方法在 User.prototype 中，例如：
   console.log(User.prototype.sayHi); // sayHi 方法的代码
   
   // 在原型中实际上有两个方法
   console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
   // Object.getOwnPropertyNames方法会返回上面的所有属性，包括可枚举的和不可枚举的
   // for in 遍历时会遍历自己的属性和原型链上的属性，但是只能遍历可枚举的
   ```
5. class声明的类，不仅仅是语法糖，虽然确实方便了很多，但是也引入了很多不同的点
   
   1. 通过class创建的函数，内部会有一个特殊的标记`[[IsClassConstructor]]: true`，编程语言会检查这个属性，所以使用class创建的函数，必须使用new来调用，否则会报错
      
      ```js
      class User {
          constructor() { }
      }
      
      console.log(typeof User); // function
      User(); // Error: Class constructor User cannot be invoked without 'new'
      ```
   2. 当打印class声明出来的函数时，js引擎输出的字符串也会标识是class
      
      ```js
      class User {
          constructor() { }
      }
      
      console.log(User); // [class User]
      ```
   3. 在class内部声明的方法，虽然都会被挂载到原型上，但是所有方法的`enumerable`标识全部设置为了`false`，也即代表着不可枚举，使用`for in `的时候不会被遍历出来。（其实这挺好的，我们使用for in 遍历对象的时候，本来就不希望 把原型链上的属性和方法也遍历出来）
      先来看一下原生的原型链上的方法，默认是可枚举的
      
      ```js
      function User(name, age) {
          this.name = name
          this.age = age
      }
      
      User.prototype.sayHi = function () {
          console.log(`你好 我是${this.name}，我今年${this.age}岁了`)
      }
      
      let a = new User('cheny', 18)
      
      for (let key in a) {
          console.log(key); // name age sayHi
          // 原型链上的方法，我们直接声明出来的默认是可枚举的
      }
      ```
      
      再来看一下使用class类声明出来的，默认是不可枚举的
      
      ```js
      class User {
          constructor(name, age) {
              this.name = name
              this.age = age
          }
          sayHi() {
              console.log(`你好 我是${this.name}，我今年${this.age}岁了`)
          }
      }
      let a = new User('cheny', 18)
      for (let key in a) {
          console.log(key); // name age
          // 只打印出来了name 和 age  sayHi，并没有被打印出来，因为class里面的方法，默认设置为了不可枚举
      }
      ```
   4. 类总是会使用严格模式，在类构造中的所有代码都会自动进入严格模式。
6. 因为类本身就是一个函数，所以声明的时候，也可以像函数表达式那么声明，但是感觉没啥用
   
   ```js
   // 类表达式
   let User = class {
       sayHi() {
           console.log("Hello");
       }
   };
   ```
7. 类表达式的名字只能在内部访问到，外部访问不到。
   
   ```js
   // “命名类表达式（Named Class Expression）”
   // (规范中没有这样的术语，但是它和命名函数表达式类似)
   let User = class MyClass {
       sayHi() {
           console.log(MyClass); // MyClass 这个名字仅在类内部可见
       }
   };
   
   new User().sayHi(); // 正常运行，显示 MyClass 中定义的内容
   
   console.log(MyClass); // error，MyClass 在外部不可见 ReferenceError: MyClass is not defined
   ```
8. 类中也是有get 和 set 方法的，可以监听自己的属性，注意死循环
   
   ```js
   class User {
       constructor(name, age) {
           this.name = name
           this.age = age
       }
   
       get name() {
           console.log('访问了 name');
           return this.name 
       }
   
       set name(value) {
           console.log('设置了name属性');
           this.name = value // 这么写会死循环，因为会一直触发set
       }
   }
   
   // RangeError: Maximum call stack size exceeded
   let a = new User('cheny', 18)
   ```
   
   所以需要修改一下
   
   ```js
   class User {
   
       constructor(name, age) {
           this.name = name
           this.age = age
       }
   
       get name() {
           console.log('访问了 name');
           return this._name
       }
   
       set name(value) {
           console.log('设置了name属性');
           this._name = value
       }
   
       get age() {
           console.log('访问了 age');
           return this._age
       }
   
       set age(value) {
           console.log('设置了age属性');
           this._age = value
       }
   }
   
   let a = new User('cheny', 18)
   console.log(a.name);
   console.log(a.age);
   
   /* 
   设置了name属性
   设置了age属性
   访问了 name
   cheny
   访问了 age
   18
   */
   ```
9. class中也可以使用计算属性名称`[...]`
   
   ```js
   class User {
   
     ['say' + 'Hi']() {
       console.log("Hello");
     }
   
   }
   
   new User().sayHi();
   ```
10. 可以直接在类里声明类字段，比如
   
   ```js
   class User {
       name = "John";
       sayHi() {
           console.log(`Hello, ${this.name}!`);
       }
   }
   new User().sayHi(); // Hello, John!
   ```
   
   类字段重要的不同之处在于，它们会在每个独立对象中被设好，而不是设在 `User.prototype`：
   
   ```js
   class User {
       name = "John";
   }
   
   let user = new User();
   console.log(user.name); // John
   console.log(User.prototype.name); // undefined
   ```
   
   类字段甚至可以赋值时使用更复杂的表达式和函数调用：
   
   ```js
   class User {
       name = setName();
   }
   
   function setName() {
       return 'john'
   }
   
   let user = new User();
   console.log(user.name); // John
   ```
11. 使用类字段，可以优雅的解决this丢失的问题
   先来看一下丢失的情况，setTimeout是异步任务，被仍到了宏任务队列，第一个参数是待执行的回调，这里给的是`button.click`，类似于使用function声明的，当过了1s后，执行这个回调方法时，this就丢了，此时的this是window，上面没有value属性，所以打印了undefined。
   
   ```js
   class Button {
       constructor(value) {
           this.value = value;
       }
   
       click() {
           console.log(this.value);
       }
   }
   
   let button = new Button("hello");
   
   setTimeout(button.click, 1000); // undefined
   ```
   
   再来看一下解决办法
   
   1. 传递一个包装函数，`setTimeout(() => button.click(), 1000)`
      
      ```js
      class Button {
          constructor(value) {
              this.value = value;
          }
      
          click() {
              console.log(this.value);
          }
      }
      
      let button = new Button("hello");
      
      setTimeout(() => button.click(), 1000); // hello
      ```
      
      传递完包装函数后，1s过后，执行箭头函数，因为箭头函数没有this，所以执行的时候this就是button，没有丢失
   2. 将方法绑定到对象
      传递回调的时候，用bind绑定了一下this指向，这样等1s过后再执行的时候，this就是button了，所以也正常输出
      
      ```js
      class Button {
          constructor(value) {
              this.value = value;
          }
      
          click() {
              console.log(this.value);
          }
      }
      
      let button = new Button("hello");
      
      setTimeout(button.click.bind(button), 1000); // hello
      ```
   3. 看一下类字段提供的优雅方法
      类字段是基于每一个对象被创建的，然后是一个箭头函数，没有this，往上找this，所以自然而然的就是button它自己了，所以this的值总是正确的。
      
      ```js
      class Button {
        constructor(value) {
          this.value = value;
        }
        click = () => {
          console.log(this.value);
        }
      }
      
      let button = new Button("hello");
      
      setTimeout(button.click, 1000); // hello
      ```

## 参考

[https://zh.javascript.info/class](https://zh.javascript.info/class)
