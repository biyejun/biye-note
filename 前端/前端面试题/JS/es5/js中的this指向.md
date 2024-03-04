## 前言

js的`this`指向一直是个老生常谈的问题，我们知道，`.`前面是谁，`this`就是谁；非严格模式下，`this`有时也会指向`window`（浏览器端）或者`global`（nodejs端）；严格模式下有时会是`undefined`；箭头函数没有`this`，它的`this`取决于外部包裹它的函数。

本章我们就通过一些例子来探究一下js的`this`指向问题，不过，在正式开始前，我们先来思考一个问题？

`this`为什么会被设计出来？它的用途是干什么的？

## `this`的由来

### 对象和方法

`js`中可以使用`{}`来声明对象，对象里的属性可以描述它的特征，对象里的方法可以用来描绘对象的一些行为动作，比如：

```js
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  console.log("Hello!");
};

user.sayHi(); // Hello!
```

上述代码就描绘了一个`user`对象，他的名字叫`John`，他的年龄是`30`岁。他有个`sayHi`的方法，所以他可以向别人打招呼，然后他调用了自己打招呼的方法，跟我们说了声`Hello!`。

> ?面向对象编程
> 
> 其实，上面这种用对象描述实体的方式，就是所谓的 [面向对象编程](https://en.wikipedia.org/wiki/Object-oriented_programming)，简称为 “OOP”。
> 
> OOP 是一门大学问，本身就是一门有趣的科学。怎样选择合适的实体？如何组织它们之间的交互？这就是架构，有很多关于这方面的书，例如 E. Gamma、R. Helm、R. Johnson 和 J. Vissides 所著的《设计模式：可复用面向对象软件的基础》，G. Booch 所著的《面向对象分析与设计》等。
> 
> 参考：[https://zh.javascript.info/object-methods#jian-tou-han-shu-mei-you-zi-ji-de-this](https://zh.javascript.info/object-methods#jian-tou-han-shu-mei-you-zi-ji-de-this)

上述的示例代码其实还可以简写一下：

```js
let user = {
  name: "John",
  age: 30,
  sayHi: function() {
     console.log("Hello");
  }
};

// 方法简写看起来更好，对吧？
let user = {
  name: "John",
  age: 30,
  sayHi() { // 与 "sayHi: function()" 一样
     console.log("Hello");
  },
};
```

### 方法中的`this`

通常，对象方法需要访问对象中存储的信息才能完成其工作。比如上面例子里的`John`向别人打招呼时，需要顺便介绍一下自己的名字和年龄，这时就需要用到 `user` 的 `name`和`age`属性。所以，为了能访问到自己，就诞生出了`this`关键字。

**`this` 的值就是在点之前的这个对象，即调用该方法的对象。**

```js
let user = {
    name: "John",
    age: 30,
    sayHi() {
        // "this" 指的是“当前的对象”
        console.log(this.name);
    }
};

user.sayHi(); // John
```

在这里 `user.sayHi()` 执行过程中，`this` 的值是 `user`。

技术上讲，也可以在不使用 `this` 的情况下，通过外部变量名来引用它：

```js
let user = {
    name: "John",
    age: 30,
    sayHi() {
        console.log(user.name); // "user" 替代 "this"
    }
};

user.sayHi(); // John
```

> ?……但上面的代码是不可靠的。如果我们决定将 `user` 复制给另一个变量，例如 `admin = user`，并赋另外的值给 `user`，那么它将访问到错误的对象。比如：

```js
let user = {
    name: "John",
    age: 30,
    sayHi() {
        console.log(user.name); // 导致错误
    }
};
let admin = user;
user = null; // 重写让其更明显

admin.sayHi(); // TypeError: Cannot read property 'name' of null
```

我们可以画图来理解一下上面的例子，看一下为什么会报错：

![堆内存栈内存](http://cdn.qiniu.bnbiye.cn/img/202111111120327.png)

如图所示，JS的变量存储在栈内存中，对象和方法存储在堆内存中，`user`实际存储的是对象的引用，一串地址空间

1. 首先声明了一个`user`变量，将其指向堆内存的一个对象上。
2. 然后又声明了一个`admin`变量，也保存刚才的地址，所以此时的`admin`和`user`指向的是同一块内存空间，即图中的对象保存的地方。
3. 这时做了一个操作，将`user`变量置为空，那么此时的`user`变量就找不到原来的对象了。
4. 而`admin`保存的仍旧是原先的那块地址空间，所以还能找到对象里的`sayHi`方法，但是由于`user = null`，所以打印输出时会报错，`TypeError: Cannot read property 'name' of null`。

> 所以这时就体现出`this`的好处了，将代码中的`user`替换成`this`，代码就能正常运行了。如下所示：

```js
let user = {
    name: "John",
    age: 30,
    sayHi() {
        console.log(this.name);
    }
};

let admin = user;
user = null;

admin.sayHi(); // John
```

继续画图分析一下：

![堆内存栈内存2](http://cdn.qiniu.bnbiye.cn/img/202111111133285.png)

前两步和之前的一样，我们直接从第三步开始看

3. 将变量`user`置为空后，变量`user`就找不到之前的对象了，就没什么用了。
4. 此时的变量`admin`还保存着之前对象的引用地址，所以指向的还是刚才声明的对象，所以能找到`sayHi`方法，在打印输出中，我们改为了`this.name`，此时的`this`就是当前对象。因为使用的`admin.sayHi()`调用的该方法，所以此时的`this`就是`admin`（`.`之前的对象就是`this`），，所以当调用`this.name`时，正常输出了`John`。

## `this`指向的不确定性

> 在方法里使用`this`时，并不受限制，可以随便用，JS并不会直接将`this`绑定在当前方法上，具体的指向只有在调用函数时，根据上下文才会被确定，也就是说，this的指向是不确定的。

### 指向`window`、`global`或者`undefined`

```js
// "use strict"
function sayHi() {
    console.log(this);
}
sayHi()
```

如上面的例子，直接使用`function`声明一个方法，方法里面打印`this`，而我们并不把这个方法绑定到某个对象上，而是直接使用方法名调用，这时有两种情况

* 非严格模式下：

1. 浏览器端，`this`指向全局对象`window`
   ![image-20211111133753844](http://cdn.qiniu.bnbiye.cn/img/202111111337988.png)
2. nodejs端，`this`指向全局对象`global`
   ![image-20211111133816137](http://cdn.qiniu.bnbiye.cn/img/202111111338205.png)

* 严格模式下（在头部增加`"use strict"`），此时`this`为`undefined`

### 指向`.`前面的对象

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
    console.log(this.name);
}

// 在两个对象中使用相同的函数
user.f = sayHi;
admin.f = sayHi;

// 这两个调用有不同的 this 值
// 函数内部的 "this" 是“点符号前面”的那个对象
user.f(); // John（this === user）
admin.f(); // Admin（this === admin）

admin['f'](); // Admin（使用点符号或方括号语法来访问这个方法，都没有关系。）
```

如上面的例子，`this`就是`.`前面的对象。我们画图来分析一下：

![堆内存栈内存3](http://cdn.qiniu.bnbiye.cn/img/202111111440947.png)

1. 我们先声明了一个变量`user`，指向了堆内存中的一个对象上。（实际保存的是地址的引用）
2. 又声明了一个变量`admin`，也指向了堆内存中的一个对象上，2中的对象与1中的对象不是同一个，分别保存在堆内存的不同位置上。（实际保存的是地址的引用）
3. 使用`function`声明了一个`sayHi`方法，这时又在堆内存开辟了一块新的内存空间，保存这个方法，`sayHi`变量保存该方法的引用。
4. `user.f = sayHi`，为`user`对象添加一个变量`f`指向`sayHi`方法。
5. `admin.f = sayHi`，为`admin`对象添加一个变量`f`指向`sayHi`方法。
6. `user.f()`，因为为`user`增加的`f`变量指向了`sayHi`方法，所以此时的`f`就是`sayHi`方法，此时`sayHi`中的`this`就是`user`对象本身，所以打印出了`John`。
7. `admin.f()`，因为为`admin`增加的`f`变量指向了`sayHi`方法，所以此时的`f`就是`sayHi`方法，此时`sayHi`中的`this`就是`admin`对象本身，所以打印出了`Admin`。

> ?**解除** `this` **绑定的后果**
> 
> 如果你经常使用其他的编程语言，那么你可能已经习惯了“绑定 `this`”的概念，即在对象中定义的方法总是又指向该对象的 `this`。
> 
> 在 JavaScript 中，`this` 是“自由”的，它的值是在调用时计算出来的，它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。
> 
> 在运行时对 `this` 求值的这个概念既有优点也有缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性造成了更大的出错的可能。
> 
> 这里我们的立场并不是要评判编程语言的这个设计是好是坏。而是要了解怎样使用它，如何趋利避害。
> 
> 参考：[https://zh.javascript.info/object-methods#jian-tou-han-shu-mei-you-zi-ji-de-this](https://zh.javascript.info/object-methods#jian-tou-han-shu-mei-you-zi-ji-de-this)

## 箭头函数没有自己的`this`

我们知道，箭头函数没有自己的`this`，如果访问 `this`，则会从外部包裹它的函数中获取。我们看下面这个例子，这里 `forEach` 中使用了箭头函数，所以其中的 `this.title` 其实和外部方法 `showList` 的完全一样。那就是：`group.title`，所以最终会打印正确的结果。

```js
"use strict"
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach((item) => {
            console.log(this.title + ': ' + item)
        });
    }
};

group.showList();
```

但是当我们换成普通的匿名函数时，就会报错：

```js
"use strict"
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(function (item) {
            // TypeError: Cannot read property 'title' of undefined
            console.log(this.title + ': ' + item)
        });
    }
};

group.showList();
```

报错是因为 `forEach` 运行它里面的这个函数，但是这个函数的 `this` 为默认值 `this=undefined`（严格模式下默认为`undifined`），因此就出现了尝试访问 `undefined.title` 的情况。

## 总结

1. 在方法里使用`this`时，并不会受限制，可以随便用，js并不会直接将`this`绑定在当前方法上，具体的指向只有在调用函数时，根据上下文才会被确定。
2. 直接使用`function`声明一个方法时，通过方法名直接调用，此时的`this`指向分为两种情况：
   2.1 非严格模式下，浏览器端`this`指向`window`，`nodejs`端指向`global`
   2.2 严格模式下，`this === undefined`
3. 使用`object.fn()`【对象`.`方法】的形式调用时，`this`就是`.`前面的对象。
4. 箭头函数默认没有`this`，如果访问 `this`，则会从外部包裹它的函数中获取。

## 参考

[https://zh.javascript.info/object-methods](https://zh.javascript.info/object-methods)

[https://zh.javascript.info/arrow-functions](https://zh.javascript.info/arrow-functions)
