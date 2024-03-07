## 前言

在平时学习中，经常会用到`Object`对象上得以一些自带的方法。比如类型判断的`Object.prototype.toString()`、获取对象的key`Object.keys()`、再或者定义一个不可枚举的属性`Object.defineProperty()`等等，一直都没有系统的学习过这个对象，今天就来好好的学习一下。

## Object构造函数

### 创建对象的两种方式

1. 使用花括号`{name: 'John'}`
2. 使用Object构造方法
   
   * 如果给定值是`null`或`undefined`，将会创建并返回一个空对象
   * 如果传进去的是一个基本类型的值，则会构造其包装类型的对象
   * 如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址
   
   ```js
   let o1 = new Object(null)
   let o2 = new Object(undefined) // 传null或undefined，会构建一个空对象
   console.log(o1); // {}
   console.log(o2); // {}
   
   let o3 = new Object(1) // 传基本类型，会构造包装类对象
   console.log(o3); // [Number: 1]
   
   let o4 = { name: 'John' }
   let o5 = new Object(o4) // 使用引用类型创建一个对象，会返回原对象（相同的引用地址）
   console.log(o5 === o4); // true
   ```

## 静态属性和方法

### Object.length

返回1

```js
console.log(Object.length) // 1
```

### Object.assign()

拷贝一个对象的属性值到目标对象里。

只会拷贝源对象自身的并且可枚举的属性到目标对象，属于浅拷贝。如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。

```js
const target = { a: 1, b: 2 }; // 重复的键会被源对象覆盖
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);

console.log(returnedTarget); // { a: 1, b: 4, c: 5 }

let o1 = Object.assign({}, { a: '1', b: '2' }) // 经常这么用去复制一个对象
console.log(o1); // { a: '1', b: '2' }
```

### Object.create()

创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。

```js
let o1 = { name: 'John' }
let o2 = Object.create(o1)
console.log(o2); // {}
console.log(o2.__proto__ === o1); // true
```

### Object.defineProperties()

直接在一个对象上定义新的属性或修改现有属性，并返回该对象。(参数的解释参考 Object.defineProperty()，它俩一样，只不过一个定义多个属性，一个每次只定义一个属性)

```js
let obj = {}
Object.defineProperties(obj, {
    'name': {
        value: 'John',
        writable: true,
    },
    'age': {
        value: '18',
        writable: false,
    }
})

console.log(obj.name);// John
console.log(obj.age);// 18

obj.name = 'hhh'
console.log(obj.name);// hhh

obj.age = 10
console.log(obj.age); // 18 仍旧是18.并没有被改变
```

### Object.defineProperty()

定义对象的内部属性。属性有下面几个配置，可以分为两类，**数据描述** 和**存取描述** 。

#### 数据描述

##### configurable

默认为false，当为false时，表示属性不可以被改变，不可被删除。

> 这里的属性不可被改变，指的是除了`value、writeable`特性外的其他特性是否可以被修改。

```js
var o = {};
Object.defineProperty(o, 'a', {
  get() { return 1; },
  configurable: false // 已经配置 a属性的configurable属性为false了，所以除了value和writeable之外，所有的配置都不可再更改了
});

// 当尝试去更改 configurable 配置时，会报错
Object.defineProperty(o, 'a', {
  configurable: true
}); // throws a TypeError

// 当尝试去修改 enumerable 配置时，也会报错
Object.defineProperty(o, 'a', {
  enumerable: true
}); // throws a TypeError

// 当尝试去修改 set 配置时，也会报错
Object.defineProperty(o, 'a', {
  set() {}
}); // throws a TypeError (set was undefined previously)

// 当尝试去修改 get 配置时，也会报错
Object.defineProperty(o, 'a', {
  get() { return 1; }
}); // throws a TypeError
// (even though the new get does exactly the same thing)

// 当尝试去修改 value 配置时，正常是可以修改的，但是本例中，因为我们定义的getter的原因，也会报错
Object.defineProperty(o, 'a', {
  value: 12
}); // throws a TypeError // ('value' can be changed when 'configurable' is false but not in this case due to 'get' accessor)

console.log(o.a); // logs 1

// 当我们尝试去删除这个属性时，无事发生，但是严格模式下就会报错额了
delete o.a; // Nothing happens
console.log(o.a); // logs 1
```

上述例子中。如果 `o.a` 的 `configurable` 属性为 `true`，则不会抛出任何错误，并且，最后，该属性会被删除。

##### enumerable

默认为false，当为false时，表示该对象的属性不可被枚举。即是否能够使用`for in`或者`Object.keys()`枚举出来。

```js
let obj = {}
Object.defineProperty(obj, 'name', {
    enumerable: true, // 设置为可枚举
    value: 'cheny'
})
Object.defineProperty(obj, 'age', {
    enumerable: false, // 设置为不可枚举（默认值）
    value: '18'
})

console.log(obj.name); // cheny
console.log(obj.age); // 18

// 当使用for in 去获取obj的可枚举属性时
for (const key in obj) {
    console.log(`${key}: ${obj[key]}`); // name: cheny
}
// 发现只把name输出了出来，age并没有输出出来

let keys = Object.keys(obj)
console.log(keys); // [ 'name' ] 也是只有name，age并没有被获取到
```

##### writable

默认为false，当为false时，value值不可被更改。（非严格模式下，尝试更改会无事发生，严格模式尝试更改会报错）

```js
let obj = {}
Object.defineProperty(obj, 'name', {
    writable: true,
    value: 'cheny'
})
console.log(obj.name); // cheny

// 当我们试图修改name时
obj.name = 'xzz'
console.log(obj.name); // xzz writable配置为true时，才会生效
```

##### value

默认为undefined，表示属性的值，可以设置为任意类型。

#### 存取描述

##### get、set

1. `get`：属性的getter函数，没有时默认为undefined。当访问该属性时会调用此函数。
2. `set`：属性的setter函数，没有时默认为undefined。当属性值被修改时，会调用此函数。方法会接收一个默认参数（也就是被赋予的新值）

```js
let obj = {}
Object.defineProperty(obj, 'name', {
    get() {
        console.log('name 被获取了');
        return this.value
    },

    set(x) {
        console.log(`name 被赋值了 ${x}`);
        this.value = x
    }

})

obj.name = 'cheny' // name 被赋值了 cheny

console.log(obj.name);
/*
    name 被获取了
    cheny
*/
```

> ！注意：假如，一个属性有了get或者set中的任意一个，或者两个都有，那么，就不能再有value或者writeable，他们不能同时存在，如果同时存在会报错，`TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute`。

#### 一个问题

平时使用的`let obj = {} obj.a ='hello' `，与使用`Object.defineProperty()`为对象属性赋值时的区别

```js
let o = {};

o.a = 1;
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});

Object.defineProperty(o, "a", { value : 1 });
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
```

### Object.entries()

返回一个给定对象自身可枚举属性的键值对数组，关键词是 **自身** ，其排列与使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

console.log(Object.entries(obj1)); // [ [ 'a', 'aaa' ], [ 'b', 'bbb' ] ]

// 所以可以很方便的将对象转换为一个map
let map = new Map(Object.entries(obj1))
console.log(map); // Map(2) { 'a' => 'aaa', 'b' => 'bbb' }
```

对比`for in`，`for in`遍历对象时，会把继承过来的`key`也输出出来，`Object.entries()`只会转换自身的属性。

```js
let obj1 = {
    a: 'aaa'
}

let obj2 = Object.create(obj1) // Object.create() 会返回一个新对象，新对象的__proto__会指向 obj1
// 相当于 let obj2 = {__proto__: obj1}

console.log(obj2.__proto__ === obj1); // true

obj2.b = 'bbb'
obj2.c = 'ccc'

console.log(Object.entries(obj2)); // [ [ 'b', 'bbb' ], [ 'c', 'ccc' ] ]  只返回了自身上的属性

// for in 遍历对象时 集成的属性也会被打印出来
for (const key in obj2) {
    console.log(`${key}: ${obj2[key]}`);
}
/* 
    b: bbb
    c: ccc
    a: aaa
*/
```

### Object.freeze()

冻结一个对象，被冻结后的对象不能被修改。

1. 不能添加新属性
2. 不能删除已有属性
3. 不能修改对象已有属性的可枚举性、可配置性、可写性
4. 不能修改已有的属性值（浅 不能修改，只管一层，第二次以后的对象还是可以修改）
5. 冻结的对象原型也不能修改

严格模式执行上述操作会报错，非严格模式会忽略。

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb',
    c: {
        d: 'cccc'
    }
}

let obj2 = Object.freeze(obj1)

console.log(obj1 === obj2); // true 返回的仍旧是原对象

// 但是修改是无效的

obj2.a = 'hhh'
console.log(obj2); // { a: 'aaa', b: 'bbb', c: { d: 'cccc' } }

obj2.c.d = 'cheny'
console.log(obj2); // { a: 'aaa', b: 'bbb', c: { d: 'cheny' } } 只管一层，深层的对象还是能修改
```

### Object.fromEntries()

把键值对列表转换为一个对象。

1. Map转Object
   ```js
   const map = new Map([['foo', 'bar'], ['baz', 42]]);
   const obj = Object.fromEntries(map);
   console.log(obj); // { foo: "bar", baz: 42 }
   ```
2. Array转Object
   ```js
   const arr = [['0', 'a'], ['1', 'b'], ['2', 'c']];
   const obj = Object.fromEntries(arr);
   console.log(obj); // { 0: "a", 1: "b", 2: "c" }
   ```
3. 对象转换
   对象先通过 `Object.entries()`转变为数组
   然后数组通过map过滤一遍
   然后返回的新数组再通过`Object.fromEntries()`转换为对象，达到对象转换的效果
   ```js
   const object1 = { a: 1, b: 2, c: 3 };
   
   const object2 = Object.fromEntries(
       Object.entries(object1)
           .map(([key, val]) => [key, val * 2])
   );
   
   console.log(object2);
   // { a: 2, b: 4, c: 6 }
   ```

### Object.getOwnPropertyDescriptor()

返回对象自有属性的属性描述符。

```js
let obj = {}
Object.defineProperty(obj, 'name', {
    configurable: true,
    value: 'cheny',
    writable: true,
    enumerable: true
})

console.log(obj.name); // cheny
let desc = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(typeof desc); // object
console.log(desc);
/*
{
  value: 'cheny',
  writable: true,
  enumerable: true,
  configurable: true
}
*/
```

### Object.getOwnPropertyDescriptors()

用来获取一个对象的所有自身属性的描述符。

```js
let obj = {}
Object.defineProperties(obj, {
    'name': {
        value: 'John',
        writable: true,
    },
    'age': {
        value: '18',
        writable: false,
    }
})

console.log(obj.name);// John
console.log(obj.age);// 18

let desc = Object.getOwnPropertyDescriptors(obj)
console.log(desc);
/*
{
  name: {
    value: 'John',
    writable: true,
    enumerable: false,
    configurable: false
  },
  age: {
    value: '18',
    writable: false,
    enumerable: false,
    configurable: false
  }
}
*/
```

### Object.getOwnPropertyNames()

返回一个数组，该数组对元素是 `obj`自身拥有的枚举或不可枚举属性名称字符串。（不包含Symbol类型）

```js
let obj1 = {}
Object.defineProperties(obj1, {
    name: {
        value: 'hhh',
        enumerable: true
    },
    age: {
        value: 18,
        enumerable: false
    }
})
console.log(obj1.name); // hhh
console.log(obj1.age); // 18

// 只会打印可枚举的
for (const key in obj1) {
    console.log(key);
}
// name

// 要是想把所有的key都获取到 使用 Object.getOwnPropertyNames()

let keys = Object.getOwnPropertyNames(obj1)
console.log(keys); // [ 'name', 'age' ]  不可枚举的 age 也打印了出来
```

### Object.getOwnPropertySymbols()

返回一个给定对象自身的所有 Symbol 属性的数组。

与[`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)类似，您可以将给定对象的所有符号属性作为 Symbol 数组获取。 请注意，[`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)本身不包含对象的 Symbol 属性，只包含字符串属性。

```js
let obj1 = {}
let symbol1 = Symbol('symbol1')
let symbol2 = Symbol.for('symbol2')
Object.defineProperties(obj1, {
    name: {
        value: 'hhh',
        enumerable: true
    },
    age: {
        value: 18,
        enumerable: false
    },
    [symbol1]: {
        value: 'localsymbol'
    },
    [symbol2]: {
        value: 'globalSymbol'
    },

})

let keys = Object.getOwnPropertyNames(obj1)
console.log(keys); // [ 'name', 'age' ] 无法获取到symbol，只能获取到字符串key

let key2 = Object.getOwnPropertySymbols(obj1)
console.log(key2); // [ Symbol(symbol1), Symbol(symbol2) ]

console.log(obj1[key2[0]]); // localsymbol
console.log(obj1[key2[1]]); // globalSymbol
```

### Object.getPrototypeOf()

方法返回指定对象的原型（内部`[[Prototype]]`属性的值）。

```js
function Foo() { }
let obj = new Foo()

console.log(obj.__proto__ === Foo.prototype); // true

let proto = Object.getPrototypeOf(obj)

console.log(proto === Foo.prototype); // true
console.log(proto === obj.__proto__); // true
```

### Object.is()

判断两个值是否相等。

> 与 === 类似，但是有区别
> 
> 1. ===判断 +0和-0是相等的，Object.is判定它俩不相等
> 2. === 判断 NaN === NaN 会返回false，Object.is判定它俩相等
> 
> ==与===的区别参考另一篇文章：[js中==与===](http://www.bnbiye.cn/#/articleDetail/e6f5d9b0-5109-11ec-96d5-7933aca11ca0)

```js
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

// 其余的都与 === 类似
console.log('1' === 1); // false
console.log(Object.is('1', 1)); // false
```

### Object.isExtensible()

判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) 属性可以被更改。[`Object.preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)，[`Object.seal`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) 或 [`Object.freeze`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 方法都可以标记一个对象为不可扩展（non-extensible）。

```js
// 新对象默认是可扩展的.
let empty = {};
console.log(Object.isExtensible(empty)); // === true

// ...可以变的不可扩展.
Object.preventExtensions(empty);
console.log(Object.isExtensible(empty)); // === false

// 密封对象是不可扩展的.
let sealed = Object.seal({});
console.log(Object.isExtensible(sealed)); // === false

// 冻结对象也是不可扩展.
let frozen = Object.freeze({});
console.log(Object.isExtensible(frozen)); // === false
```

### Object.isFrozen()

判断一个对象是否被[冻结](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)。

> 下面的例子就这一句话总结：
> 
> 一个对象是冻结的是指它不可[`扩展`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)，所有属性都是不可配置的，且所有数据属性（即没有getter或setter组件的访问器的属性）都是不可写的。

```js
// 一个对象默认是可扩展的,所以它是非冻结的.
Object.isFrozen({}); // === false

// 一个不可扩展的空对象同时是一个冻结对象.
var vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen) //=== true;

// 一个非空对象默认是非冻结的.
var oneProp = { p: 42 };
Object.isFrozen(oneProp) //=== false

// 让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象,
// 因为p属性仍然是可以配置的(而且可写的).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp) //=== false

// 此时,如果删除了这个属性,则它会成为一个冻结对象.
delete oneProp.p;
Object.isFrozen(oneProp) //=== true


// 一个不可扩展的对象,拥有一个不可写但可配置的属性,则它仍然是非冻结的.
var nonWritable = { e: "plep" };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, "e", { writable: false }); // 变得不可写
Object.isFrozen(nonWritable) //=== false

// 把这个属性改为不可配置,会让这个对象成为冻结对象.
Object.defineProperty(nonWritable, "e", { configurable: false }); // 变得不可配置
Object.isFrozen(nonWritable) //=== true

// 一个不可扩展的对象,拥有一个不可配置但可写的属性,则它仍然是非冻结的.
var nonConfigurable = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, "release", { configurable: false });
Object.isFrozen(nonConfigurable) //=== false

// 把这个属性改为不可写,会让这个对象成为冻结对象.
Object.defineProperty(nonConfigurable, "release", { writable: false });
Object.isFrozen(nonConfigurable) //=== true

// 一个不可扩展的对象,值拥有一个访问器属性,则它仍然是非冻结的.
var accessor = { get food() { return "yum"; } };
Object.preventExtensions(accessor);
Object.isFrozen(accessor) //=== false

// ...但把这个属性改为不可配置,会让这个对象成为冻结对象.
Object.defineProperty(accessor, "food", { configurable: false });
Object.isFrozen(accessor) //=== true

// 使用Object.freeze是冻结一个对象最方便的方法.
var frozen = { 1: 81 };
Object.isFrozen(frozen) //=== false
Object.freeze(frozen);
Object.isFrozen(frozen) //=== true

// 一个冻结对象也是一个密封对象.
Object.isSealed(frozen) //=== true

// 当然,更是一个不可扩展的对象.
Object.isExtensible(frozen) //=== false
```

### Object.isSealed()

判断一个对象是否被密封。

密封对象是指那些不可 [`扩展`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) 的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。

```js
// 新建的对象默认不是密封的.
var empty = {};
Object.isSealed(empty); // === false

// 如果你把一个空对象变的不可扩展，则它同时也会变成个密封对象.
Object.preventExtensions(empty);
Object.isSealed(empty); // === true

// 但如果这个对象不是空对象，则它不会变成密封对象,因为密封对象的所有自身属性必须是不可配置的.
var hasProp = { fee: "fie foe fum" };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // === false

// 如果把这个属性变的不可配置，则这个属性也就成了密封对象.
Object.defineProperty(hasProp, 'fee', {
  configurable: false
});
Object.isSealed(hasProp); // === true

// 最简单的方法来生成一个密封对象，当然是使用Object.seal.
var sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // === true

// 一个密封对象同时也是不可扩展的.
Object.isExtensible(sealed); // === false

// 一个密封对象也可以是一个冻结对象,但不是必须的.
Object.isFrozen(sealed); // === true ，所有的属性都是不可写的
var s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // === false， 属性"p"可写

var s3 = Object.seal({ get p() { return 0; } });
Object.isFrozen(s3); // === true ，访问器属性不考虑可写不可写,只考虑是否可配置
```

### Object.keys()

返回一个由一个给定对象的自身可枚举属性组成的数组

```js
let obj1 = {}
Object.defineProperties(obj1, {
    name: {
        value: 'hhh',
        enumerable: true
    },
    age: {
        value: 18,
        enumerable: false
    },
    job: {
        value: 'soft',
        enumerable: true
    }
})
console.log(obj1.name); // hhh
console.log(obj1.age); // 18
console.log(obj1.job); // 18

console.log(Object.keys(obj1)); // [ 'name', 'job' ] 只返回自己可枚举的key
```

### Object.preventExtensions()

让一个对象变的不可扩展，也就是永远不能再添加新的属性。

当对象变为不可扩展后，

1. 严格模式下，添加新属性会报错，非严格模式操作会忽略
2. 虽然不可以添加新属性，但是却可以删除之前的属性
3. 该方法会使`__proto__`不可变，如果尝试修改会报错

```js
// "use strict"
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

// 让obj1 变得不可扩展，即不能添加新属性
let obj2 = Object.preventExtensions(obj1)
console.log(obj2 === obj1); // true

// 如果尝试添加，严格模式会报错
obj1.c = 'ccc'

console.log(obj1.c); // undefined

// 但是我们可以删除之前的属性
delete obj1.a
console.log(obj1); // { b: 'bbb' }

// 然后我们再次尝试添加新属性，严格模式仍然会报错的，非严格模式就忽略，即 变为不可扩展的对象不能添加新属性，但是可以删除原来的属性
obj1.a = 'dddd'
console.log(obj1);


let obj3 = {
    name: 'cheny'
}

// 变为不可哭扩展的对象，原型即锁死了，不能再修改，如果尝试修改会报错
// TypeError: #<Object> is not extensible
/* obj1.__proto__ = obj3
console.log(obj1.__proto__ === obj3); */
```

### Object.seal()

封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

通常，一个对象是[可扩展的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)（可以添加新的属性）。密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)（在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode) 中最常见的，但不唯一）。

不会影响从原型链上继承的属性。但 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) ( ) 属性的值也会不能修改。

返回被密封对象的引用。

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

// 让对象变为封闭的
let obj2 = Object.seal(obj1)
console.log(obj1 === obj2); // true

// 变为封闭的对象所有属性不可配置，所以当尝试删除一个属性时，严格模式就会报错
delete obj1.a
console.log(obj1); // { a: 'aaa', b: 'bbb' } 并没有删除成功
```

### Object.setPrototypeOf()

置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

> **警告:** 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 `[[Prototype]]`在***各个*** 浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 `obj.__proto__ = ...` 语句上的时间花费，而且可能会延伸到***任何*** 代码，那些可以访问***任何*** `[[Prototype]]`已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 `[[Prototype]]`。相反，你应该使用 [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)来创建带有你想要的`[[Prototype]]`的新对象。

```js
let obj1 = {
    a: 'aaa'
}

let obj2 = {
    b: 'bbb'
}

Object.setPrototypeOf(obj1, obj2) // 相当于 obj1.__proto__ = obj2

console.log(obj1.__proto__ === obj2); // true

// 所以此时obj1就可以访问到obj2的属性了
console.log(obj1.b); // bbb
```

### Object.values()

返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

let obj2 = {
    c: 'ccc',
    d: 'ddd',
    __proto__: obj1
}

let values = Object.values(obj2)
console.log(values); // [ 'ccc', 'ddd' ]  obj2原型上的值不会被打印出来

// 但是for in 会把原型上的值也打印出来
for (const key in obj2) {
    console.log(`${key}: ${obj2[key]}`);
}
/*
    c: ccc
    d: ddd
    a: aaa
    b: bbb
*/
```

## 原型上的方法

### hasOwnProperty()

判断对象自身属性中是否具有指定的属性

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

let obj2 = {
    c: 'ccc',
    d: 'ddd',
    __proto__: obj1
}

let hasOwnProperty = Object.prototype.hasOwnProperty.bind(obj2)

console.log(hasOwnProperty('c')); // true 只判断自己的key
console.log(hasOwnProperty('a')); // false 原型上的key不进行判断
```

### isPrototypeOf()

用于测试一个对象是否存在于另一个对象的原型链上。

> `isPrototypeOf()` 与 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符不同。在表达式 "`object instanceof AFunction`"中，`object` 的原型链是针对 `AFunction.prototype` 进行检查的，而不是针对 `AFunction` 本身。

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

let obj2 = {
    c: 'ccc',
    d: 'ddd',
    __proto__: obj1
}

console.log(obj1.isPrototypeOf(obj2)); // true
```

### propertyIsEnumerable()

判断指定的属性是否可枚举。（只考虑自己本身的属性，原型链上的不考虑）

```js
let obj1 = {
    a: 'aaa',
    b: 'bbb'
}

let obj2 = {
    c: 'ccc',
    d: 'ddd',
    __proto__: obj1
}
Object.defineProperty(obj2, 'e', {
    enumerable: false,
    value: 'eee'
})

console.log(obj2.e); // eee

console.log(obj2.propertyIsEnumerable('c')); // 自己的可枚举属性 true
console.log(obj2.propertyIsEnumerable('a')); // 继承的可枚举属性 不考虑。所以返回false
console.log(obj2.propertyIsEnumerable('e')); // 自己的不可枚举属性 false
```

### toLocaleString()

返回调用 [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 的结果。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。

* [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)：[`Array.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
* [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)：[`Number.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
* [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)：[`Date.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

### toString()

返回一个表示该对象的字符串。`"[object type]"`

```js
let toString = Object.prototype.toString;

console.log(toString.call(new Date)); // [object Date]
console.log(toString.call(new String)); // [object String]
console.log(toString.call(Math)); // [object Math]

console.log(toString.call(new Map)); // [object Map]
console.log(toString.call(new Set)); // [object Set]
console.log(toString.call(Symbol())); // [object Symbol]
console.log(toString.call(new Function)); // [object Function]
console.log(toString.call(new RegExp)); // [object RegExp]

console.log(toString.call(undefined)); // [object Undefined]
console.log(toString.call(null)); // [object Null]
```

### valueOf()

返回指定对象的原始值。对象默认返回它自己

```js
let obj1 = {
    a: 'aaa'
}

console.log(obj1.valueOf() === obj1); // true
```

## 总结

### 创建对象

1. 使用花括号`{}`
2. 使用构造方法`new Object()`
   1. 如果传进去的是`null`或`undefined`，返回一个空对象
   2. 如果传进去的是基本类型，会返回一个包装类对象
   3. 如果传进去的是引用类型，会返回它本身
3. 使用静态方法`let xxx = Object.create(obj)`
   返回的新对象会以`obj`为原型，即`xx.__proto__ = obj`

### 创建对象属性

1. 直接使用`.`，比如`obj.a = 'aaa'`，或者直接在花括号中定义，比如`let obj = {a: 'aaa'}`
2. 使用`Object.defineProperty()`或者`Object.defineProperties()`，前者是一个一个的创建属性，后者是可以同时创建多个。
   使用这种方式可以同时创建属性的配置，包括：
   1. `configurable`：属性是否可配置，默认为false
   2. `writable`：属性是否可改变，默认为false
   3. `enumerable`：属性是否可枚举，默认为false
   4. `value`：属性的值，默认为undefined
   5. `get、set`：属性的get和set方法，默认为undefined

> 二者的区别，使用`let obj = {a: 'aaa'}`，类似于：
> 
> ```js
> // let obj = {a: 'aaa'}，类似于
> let obj = {}
> Object.defineProperty(obj, 'a',{
>     configurable: true,
>     writable: true,
>     enumerable: true,
>     value: 'aaa'
> })
> ```

### 获取属性描述

1. 使用`Object.getOwnPropertyDescriptor()`：获取单个的属性描述
2. 或者`Object.getOwnPropertyDescriptors()`：获取对象上所有的属性描述，只会获取对象本身，继承的属性不会获取到

### 改变对象状态

1. 可扩展
   可扩展是指对象可以添加新的属性，创建的对象默认是可扩展的，即，可以添加新属性。
   1. 可以使用`Object.preventExtensions()`使对象变得不可扩展。不可扩展同时会锁定对象的原型，即`__proto__`不可再改变。
   2. 使用`Object.isEntensible()`，可以判断对象是否可扩展。
2. 封闭
   封闭是指，不可以添加新属性，并且当前对象的所有属性都不可配置，不可配置就是指，所有属性的`configurable`变为了`false`。
   所以，封闭的对象肯定是不可扩展的。
   1. 可以使用`Object.seal()`使对象变为封闭状态。
   2. 使用`Object.isSealed()`可以判断对象是否是封闭的。
3. 冻结
   冻结是比扩展和封闭更强的状态，限制的最死，一个对象变为冻结状态后，它不可扩展、所有属性都变的不可配置，并且所有的属性值都不可以再改变。
   1. 可以使用`Object.freeze()`冻结一个对象。
   2. 使用`Object.isFrozen()`判断一个对象是否是冻结的。

### 对象的原型

1. 可以使用`Object.getPrototypeOf()`获取到一个对象的原型
2. 使用`Object.setPrototypeOf()`设置一个对象的原型
   建议不要直接设置一个对象的原型，因为内部执行会很慢，如果想设置一个对象的原型，可以直接使用`Object.create(obj)`创建一个对象，那这个新对象的`__proto__`就会指向参数`obj`。

### 遍历对象，获取key或value

1. `Object.keys()`获取到对象上的所有key
2. `Object.values()`获取到对象上的所有value
3. `Object.entries()`获取到对象上的`key和value`，返回的是一个二维数组，比如：`[[a,'aaa'],[b,'bbb']]`
4. `Object.fromEntries()`，把键值对列表转换为对象
   > ☛ 注意，上面的这些方法都只能获取到自己本身，可枚举的key或value，原型链上的是获取不到的，这就是它们与`for in`的区别，使用`for in`会把原型链上可枚举的属性也获取到。
   > 
   > 但是包括上面的方法以及`for in`，都是只能获取到可枚举的属性，不可枚举、和Symbol属性都是获取不到的

### 获取所有的key，包括不可枚举、和symbol

1. `Object.getOwnPropertyNames()`获取到自身的所有属性的key，包括不可枚举的属性，只包含字符串属性，不包括Symbol属性
2. `Object.getOwnPropertySymbols()`获取到自身的所有Symbol属性的key，如果对象没有Symbol属性，会返回一个空数组

### 其他

静态方法：

1. `Object.is()`，可以比较两个属性是否相等，它与`===`类似，但是有几个区别
   1. `===`会判定`NaN === NaN`为false，`+0 === -0`为true
   2. `Object.is(NaN,NaN)`会返回true，`Object.is(+0, -0)`会返回false
2. `Object.assign()`，可以赋值对象，不过是浅复制。

原型链上的方法：

1. `hasOwnProperty()`可以判断自己身上是否有某个属性（不包含原型链上的，只是自己本身），symbol和不可枚举的也可以判断到
2. `propertyIsEnumerable()`判断自己身上的某个属性是否是可枚举的（不包含原型链上的，只是自己本身）
3. `isPrototypeOf()`判断对象是否在自己的原型链上，它与`instanceof`的区别在于，`instanceof`只会判断某个对象的`prtotype`属性，而这个方法是直接可以判断对象的。
4. `toLocalString()`可以忽略，用于衍生对象重载使用的
5. `valueOf()`也可以忽略，返回对象本身
6. `toString()`这个方法可以判断一个对象的真实类型，因为它会返回一个对象的类型字符串，`'[object Type]'`。

## 参考

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

[https://segmentfault.com/a/1190000011294519](https://segmentfault.com/a/1190000011294519)
