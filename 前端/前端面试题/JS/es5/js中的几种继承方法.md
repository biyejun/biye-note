## 前言

面试官说，来手写一下js的继承，你能写出来几个呢？是不是听说过很多名词，什么原型链继承、构造函数继承、组合继承、寄生组合继承、class的extends继承。本章我们来一个个的看一下到底是怎么个继承法。

## 原型链继承

如下代码中，有两个构造函数`Parent()`和`Child()`，`Parent()`的原型上有个`sayHi()`方法。现在需要你手动的写一个继承，将`Child()`继承`Parent()`，使`Child()`的实例对象`child1`能通过原型链访问到`sayHi`方法。

```js
function Parent() {
    this.name = 'parent'
}

Parent.prototype.sayHi = function () {
    console.log(`hello i am ${this.name}`);
}

function Child() { }

let child1 = new Child()
child1.sayHi() // 现在是访问不到的，因为Child与Parent没有任何关系
// TypeError: child1.sayHi is not a function
```

### 实现

我们手动实现一下原型链继承，将上述代码改写一下。

```js
function Parent() {
    this.name = 'parent'
}

Parent.prototype.sayHi = function () {
    console.log(`hello i am ${this.name}`);
}

function Child() { }

Child.prototype = new Parent()
Child.prototype.constructor = Child // 手动的改写一下，符合原型的规则

let child1 = new Child()
child1.sayHi() // hello i am parent

console.log(child1.__proto__.__proto__ === Parent.prototype); // true
```

1. `Child.prototype = new Parent()`，我们将`Child`的原型指向了一个`Parent`的实例对象，这是个很巧妙的方式，因为
   `new Parent()`会产出一个`Parent`的实例对象，假如是`p1`，那么`p1.__proto__ === Parent.prototype`。这样就建立了一个关联，`Child.prototype.__proto__ === Parent.prototype`。
2. `Child.prototype.constructor = Child`，此处需要手动的改写一下`constructor `的指向，这是因为`new Parent()`出来的对象的`constructor`默认指向`Parent`，而构造方法默认原型上的`constructor `属性应该指向自己，所以我们手动的改写一下。

> 继承大量的涉及到原型链的概念，所以应该对js的原型链有一定的了解，不熟悉的可以先阅读一下这篇文章。[原型链](http://www.bnbiye.cn/#/articleDetail/0bbfd760-420e-11ec-96d5-7933aca11ca0)

### 存在的问题

实现原型链继承时，发现很简单有没有，就两行代码。虽然我们继承了`Parent`的`name`属性还有原型上的`saiHi()`方法，但是是有问题的。

1. 创建的`Child`实例时没有办法传参。
   很明显，没有地方传参，比如`let c2 = new Child(1,2)`，传了也没有地方接收。
2. 如果`Parent`属性有引用类型，一旦某个实例修改了当前的值，那么父亲所有的值也会被跟着修改，比如：
   
   ```js
   function Parent() {
       this.name = 'parent'
       this.action = ['eat', 'sleep']
   }
   
   Parent.prototype.sayHi = function () {
       console.log(`hello i am ${this.name}`);
   }
   
   function Child() { }
   
   Child.prototype = new Parent()
   Child.prototype.constructor = Child
   
   let c1 = new Child()
   c1.sayHi() // hello i am parent
   
   let c2 = new Child()
   c2.action.pop()
   console.log(c2.action); // [ 'eat' ] 我们只是修改了c2的action，但是发现c1的action也被修改了
   console.log(c1.action); // [ 'eat' ]
   ```
   
   可以看一下内存图理解一下，
   
   ![内存图](http://cdn.qiniu.bnbiye.cn/img/202111212055887.png)
   
   1. 声明的`c1、c2`两个变量，指向了`Child`的两个实例对象（因为是使用`new`声明的，所以会生成两个新的对象）
   2. `c1.sayHi()`为什么可以找到呢，如图所示，先在自己身上找（图中的`Oxaab`），自己没有，再向上一层原型上找（图中的`Oxbbb`），也没有找到，继续向上找（图中的`Ox456`），bingo，找到了（图中的`Ox789`），确实是一个`function`，输出`hello i am [this.name]`，那么这个`this.name`是谁呢，因为使用的是`c1.sayHi()`调用的方法，所以此时的`this`就是`c1`，所以我们开始找这个`name`，仍然是这一套，先找自己（`Oxaab`）没有，往上找（图中的`Oxbbb`），没有，继续向上找（图中的`Ox456`），bingo，找到了，`Ox456`虽然没有，但是`Oxaaa`上有。（其实先找的`Oxaaa`再找`Ox456`，即先找构造函数再找原型。）
      > ?注意，假如`let o1= new Parent()`，那么`o1.__proto__ === Parent.prototype`，`Parent.prototype.constructor === Parent`，这都是原型链的知识，（其实`o1.constructor === Parent`，这是`new`的知识）。当实例对象`o1`找某个属性或者方法时，如果自己没有，就会沿着`__proto__`向上找，也就是构造函数的原型`prototype`，找的时候其实有个优先级，`constructor > prototype`。
      > 
      > 假如拿上面的例子举例，改写一下，`Parent.prototype.name = 'hhh'`，在构造函数`Parent`原型上也加一个`name`属性，你会发现最后打印的时候还是`hello i am parent`，并没有输出这个`hhh`。
   3. `c2.action.pop()`，顺着原型链在图中的`Ox123`上找到了，是一个引用类型，所以调用`pop()`后就把这个值更改了，而`c1.action`也是指向这块内存空间`Ox123`，所以原型链继承方式就导致了这个毛病，一旦一个实例对象修改了原型链上某个引用类型的值，所有的都会受到影响。
   
   那么，我们怎样消除这两个问题呢，接下来，让我们来看一下构造函数继承。

## 构造函数继承

原型链继承不能传参，且一个实例对象修改原型链上某个引用类型的值后，所有对象的值都受影响。为了解决这个问题，思考一下，我们把`Parent`构造函数中的属性全部再复制一份到`Child`上不就行了嘛。

### 实现

```js
function Parent(name, action) {
    this.name = name
    this.action = action
}

Parent.prototype.sayHi = function () {
    console.log(`hello i am ${this.name}，i can ${this.action}`);
}

function Child(id, name, action) {
    Parent.call(this, name, action)
    this.id = id
}

let c1 = new Child(1, 'aa', ['eat'])
let c2 = new Child(2, 'bb', ['eat', 'sleep'])

console.log(c1); // Child { name: 'aa', action: [ 'eat' ], id: 1 }
console.log(c2); // Child { name: 'bb', action: [ 'eat', 'sleep' ], id: 2 }

c1.sayHi() // c1.sayHi is not a function
```

其实也挺简单，在`Child()`构造函数上，使用`call`显示的调用一下`Parent`，` Parent.call(this, name, action)`，这样就相当于把父构造函数的属性都拷贝了一份到自己身上，然后如果自己想传新的参数，也可以在自己构造函数上添加，比如例子中的`this.id = id`。

但是这种方式也有问题。

### 存在的问题

1. 虽然将父构造函数的属性都拷贝了一份到自己身上，也能自己传参，但是父构造函数原型上的属性或方法就取不到了。
2. 如果想要继承方法，只能将方法都写到父构造函数上面，比如
   
   ```js
   function Parent(name, action) {
       this.name = name
       this.action = action
       // 方法声明在构造函数上
       this.sayHi = function () {
           console.log(`hello i am ${this.name}，i can ${this.action}`);
       }
   }
   
   function Child(id, name, action) {
       Parent.call(this, name, action)
       this.id = id
   }
   
   let c1 = new Child(1, 'aa', ['eat'])
   let c2 = new Child(2, 'bb', ['eat', 'sleep'])
   
   console.log(c1); // Child { name: 'aa', action: [ 'eat' ], sayHi: [Function (anonymous)], id: 1 }
   console.log(c2); // Child { name: 'bb', action: [ 'eat', 'sleep' ], sayHi: [Function (anonymous)], id: 2 }
   
   c1.sayHi() // hello i am aa，i can eat
   c2.sayHi() // hello i am bb，i can eat,sleep
   ```
   
   但是这样就导致了，每次声明一个新实例对象时，父构造函数中的方法都会被新建一份，非常浪费内存空间。

我们发现，上面这两种继承方法，各有各的优缺点，但是有意思的是，它俩的缺点都是对方的优点，那我们是不是把这两种方式可以综合一下呢？

## 组合继承

组合继承就是结合了原型链继承与构造函数继承而出现的一种新的继承方式，我们来看一下。

### 实现

```js
function Parent(name, action) {
    this.name = name
    this.action = action
}

Parent.prototype.sayHi = function () {
    console.log(`hello i am ${this.name}，i can ${this.action}`);
}

function Child(id, name, action) {
    Parent.call(this, name, action)
    this.id = id
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

let c1 = new Child(1, 'aa', ['eat'])
let c2 = new Child(2, 'bb', ['eat', 'sleep'])

console.log(c1); // Child { name: 'aa', action: [ 'eat' ], id: 1 }
console.log(c2); // Child { name: 'bb', action: [ 'eat', 'sleep' ], id: 2 }

c1.sayHi() // hello i am aa，i can eat
c2.sayHi() // hello i am bb，i can eat,sleep
```

组合继承结合了二者的优点，既可以传参，又可以继承原型上的属性和方法，但是还是有一个问题。

### 存在的问题

如果仔细观察，你会发现组合继承种的`Parent`构造方法被调用了两次。

1. 第一次：`Parent.call(this, name, action)`
2. 第二次：`new Parent()`

那我们怎么在优化优化呢？于是，寄生组合式继承就出现了。

## 寄生组合式继承

在组合继承中，`Parent`构造方法被调用了两次，其实我们可以在继承原型链的操作上做一个优化，可以使用一个临时空构造函数做个中间的桥梁。

### 实现

```js
function Parent(name, action) {
    this.name = name
    this.action = action
}

Parent.prototype.sayHi = function () {
    console.log(`hello i am ${this.name}，i can ${this.action}`);
}

function Child(id, name, action) {
    Parent.call(this, name, action)
    this.id = id
}

// 中间的桥梁，临时空构造函数
let TempFn = function () { }
TempFn.prototype = Parent.prototype
Child.prototype = new TempFn()
Child.prototype.constructor = Child

let c1 = new Child(1, 'aa', ['eat'])
let c2 = new Child(2, 'bb', ['eat', 'sleep'])

console.log(c1); // Child { name: 'aa', action: [ 'eat' ], id: 1 }
console.log(c2); // Child { name: 'bb', action: [ 'eat', 'sleep' ], id: 2 }

c1.sayHi() // hello i am aa，i can eat
c2.sayHi() // hello i am bb，i can eat,sleep

console.log(Child.prototype.__proto__ === Parent.prototype); // true
```

我们用一个空的构造函数`TempFn`，将它的原型指向`Parent`的原型，然后`Child`的指向改为`new TempFn()`，这样的话，依然可以顺着原型链找到`Parent.prototype`。这就是所谓的寄生组合式继承，把原型链的继承寄生到一个临时的函数上。

是不是有个小疑问呢？

### 一个小疑问

> 为什么一定要通过这个临时的桥梁实现继承，直接`Child.prototype = Parent.prototype`不行吗？是不是有点多此一举呢？

其实不是的，这样做是很有必要的。

我们知道`Parent.prototype`是一个对象，实际就是一个引用，如果直接将`Child.prototype`指向这个引用，那么假如我们在`Child.prototype`上新添加属性或方法时，会直接影响到`Parent.prototype`。

而使用一个临时构造函数做一个缓冲，就是使用了`new`关键字的特性，`new`会生成一个新的对象，新对象的`__proto__`执行指向了`TempFn.prototype`，而我们已经将临时构造函数`TempFn.prototype`指向`Parent.protorype`，所以`Child.prototype = new TempFn()`就变相的与`Parent`的原型关联上了，即`Child.prototype.__proto__ === Parent.protorype`，这样即能继承原型上的属性和方法，又不用指向同一块引用上，还不用调用两次`Parent`，一举三得。

## class的extends继承

最后介绍一个ES6的继承方式`extends`，也是现在最好用的，非常符合我们的编码方式。

```js
class Parent {
    constructor(name, action) {
        this.name = name
        this.action = action
    }

    sayHi() {
        console.log(`hello i am ${this.name}，i can ${this.action}`);
    }
}

class Child extends Parent {
    constructor(id, name, action) {
        super(name, action)
        this.id = id
    }
}

let c1 = new Child(1, 'aa', ['eat'])
let c2 = new Child(2, 'bb', ['eat', 'sleep'])

console.log(c1); // Child { name: 'aa', action: [ 'eat' ], id: 1 }
console.log(c2); // Child { name: 'bb', action: [ 'eat', 'sleep' ], id: 2 }

c1.sayHi() // hello i am aa，i can eat
c2.sayHi() // hello i am bb，i can eat,sleep

console.log(Child.prototype.__proto__ === Parent.prototype); // true
```

其实ES6的class和extends就是一个语法糖，最后转换后还是寄生组合式继承的代码。

## 总结

1. 原型链继承，
   
   ```js
   Child.prototype = new Parent()
   Child.prototype.constructor = Child
   // 继承了Parent的所有，本身的属性方法以及原型上的属性和方法。
   ```
   
   但是存在两个问题：
   
   * 没办法传参
   * 如果`Parent`上有引用类型的属性，一旦某个实例对象修改了这个值，所有的值都跟着变。
2. 构造函数继承，`Parent.call(this, arg1, arg2, ...)`，`this.arg = arg`
   
   ```js
   function Child(id, name, action) {
       Parent.call(this, name, action)
       this.id = id
   }
   // 继承了Parent构造函数上所有的属性和方法，也能够传参。
   ```
   
   但是也存在两个问题：
   
   * 没有继承原型。
   * 要想继承方法，只能写在构造方法上，导致了每次声明一次实例对象，就会创建一遍，浪费内存空间。
3. 组合继承，结合原型链继承和构造函数继承
   `Parent.call(this, arg1, arg2, ...)`，`this.arg = arg`
   `Child.prototype = new Parent()`，`Child.prototype.constructor = Child`
   
   ```js
   function Child(id, name, action) {
       Parent.call(this, name, action)
       this.id = id
   }
   Child.prototype = new Parent()
   Child.prototype.constructor = Child
   ```
   
   `1，2`中所有的存在的问题都得到了解决，并且结合了二者的优点。
   
   但是仍存在一个问题：`Parent`构造方法调用了两次
   
   * 第一次：`Parent.call(this, arg1, arg2, ...)`
   * 第二次：`Child.prototype = new Parent()`
4. 寄生组合式继承，优化了组合继承，使用一个临时的空构造函数做一个桥梁
   
   ```js
   let TempFn = function () { }
   TempFn.prototype = Parent.prototype
   Child.prototype = new TempFn()
   Child.prototype.constructor = Child
   ```
5. ES6的`extends`继承
