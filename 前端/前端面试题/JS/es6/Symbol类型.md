## Symbol类型

根据规范，对象的属性键只能是字符串类型或者 Symbol 类型。不是 Number，也不是 Boolean，只有字符串或 Symbol 这两种类型。

到目前为止，我们只见过字符串。现在我们来看看 Symbol 能给我们带来什么好处。

## symbol

“Symbol” 值表示唯一的标识符。

可以使用 `Symbol()` 来创建这种类型的值：

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();
```

创建时，我们可以给 Symbol 一个描述（也称为 Symbol 名），这在代码调试时非常有用：

```js
// id 是描述为 "id" 的 Symbol
let id = Symbol("id");
```

Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。

例如，这里有两个描述相同的 Symbol —— 它们不相等：

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false
```

如果你熟悉 Ruby 或者其他有 “Symbol” 的语言 —— 别被误导。JavaScript 的 Symbol 是不同的。

> **Symbol 不会被自动转换为字符串**
> 
> JavaScript 中的大多数值都支持字符串的隐式转换。例如，我们可以 `alert` 任何值，都可以生效。Symbol 比较特殊，它不会被自动转换。
> 
> 例如，这个 `alert` 将会提示出错：
> 
> ```js
> let id = Symbol("id");
> alert(id); // 类型错误：无法将 Symbol 值转换为字符串。
> ```
> 
> 这是一种防止混乱的“语言保护”，因为字符串和 Symbol 有本质上的不同，不应该意外地将它们转换成另一个。
> 
> 如果我们真的想显示一个 Symbol，我们需要在它上面调用 `.toString()`，如下所示：
> 
> ```js
> let id = Symbol("id");
> alert(id.toString()); // Symbol(id)，现在它有效了
> ```
> 
> 在nodejs中的表示
> 
> ```js
> let id = Symbol("id");
> console.log(id); // Symbol(id)
> console.log(id.toString()); // Symbol(id)
> console.log(Object.prototype.toString.call(id)); // [object Symbol]
> ```
> 
> 或者获取 `symbol.description` 属性，只显示描述（description）：
> 
> ```js
> let id = Symbol("id");
> console.log(id.description); // id
> ```

## “隐藏”属性

Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。

例如，如果我们使用的是属于第三方代码的 `user` 对象，我们想要给它们添加一些标识符。

我们可以给它们使用 Symbol 键：

```js
let user = { // 属于另一个代码
    name: "John"
};

let id = Symbol("id");

user[id] = 1;

console.log(user[id]); // 我们可以使用 Symbol 作为键来访问数据
```

使用 `Symbol("id")` 作为键，比起用字符串 `"id"` 来有什么好处呢？

因为 `user` 对象属于其他的代码，那些代码也会使用这个对象，所以我们不应该在它上面直接添加任何字段，这样很不安全。但是你添加的 Symbol 属性不会被意外访问到，第三方代码根本不会看到它，所以使用 Symbol 基本上不会有问题。

另外，假设另一个脚本希望在 `user` 中有自己的标识符，以实现自己的目的。这可能是另一个 JavaScript 库，因此脚本之间完全不了解彼此。

然后该脚本可以创建自己的 `Symbol("id")`，像这样：

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

我们的标识符和它们的标识符之间不会有冲突，因为 Symbol 总是不同的，即使它们有相同的名字。

……但如果我们处于同样的目的，使用字符串 `"id"` 而不是用 symbol，那么 **就会** 出现冲突：

```js
let user = { name: "John" };

// 我们的脚本使用了 "id" 属性。
user.id = "Our id value";

// ……另一个脚本也想将 "id" 用于它的目的……

user.id = "Their id value"
// 砰！无意中被另一个脚本重写了 id！
```

## 对象字面量中的Symbol

如果我们要在对象字面量 `{...}` 中使用 Symbol，则需要使用方括号把它括起来。

就像这样：

```js
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // 而不是 "id"：123
};
```

这是因为我们需要变量 `id` 的值作为键，而不是字符串 “id”。

## Symbol在 for ... in 中会被跳过

Symbol 属性不参与 `for..in` 循环。

例如

```js
let id = Symbol("id");
let user = {
    name: "John",
    age: 30,
    [id]: 123
};

for (let key in user) console.log(key); // name, age (no symbols)

// 使用 Symbol 任务直接访问
console.log("Direct: " + user[id]);
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 也会忽略它们。这是一般“隐藏符号属性”原则的一部分。如果另一个脚本或库遍历我们的对象，它不会意外地访问到符号属性。

相反，[Object.assign](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 会同时复制字符串和 symbol 属性：

```js
let id = Symbol("id");
let user = {
    [id]: 123
};

let clone = Object.assign({}, user);

console.log(clone[id]); // 123
```

这里并不矛盾，就是这样设计的。这里的想法是当我们克隆或者合并一个 object 时，通常希望 **所有** 属性被复制（包括像 `id` 这样的 Symbol）。

## 全局Symbol

正如我们所看到的，通常所有的 Symbol 都是不同的，即使它们有相同的名字。但有时我们想要名字相同的 Symbol 具有相同的实体。例如，应用程序的不同部分想要访问的 Symbol `"id"` 指的是完全相同的属性。

为了实现这一点，这里有一个 **全局 Symbol 注册表** 。我们可以在其中创建 Symbol 并在稍后访问它们，它可以确保每次访问相同名字的 Symbol 时，返回的都是相同的 Symbol。

要从注册表中读取（不存在则创建）Symbol，请使用 `Symbol.for(key)`。

该调用会检查全局注册表，如果有一个描述为 `key` 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol（`Symbol(key)`），并通过给定的 `key` 将其存储在注册表中。

例如：

```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 Symbol
console.log(id === idAgain); // true
```

注册表内的 Symbol 被称为 **全局 Symbol** 。如果我们想要一个应用程序范围内的 Symbol，可以在代码中随处访问 —— 这就是它们的用途。

> **这听起来像 Ruby**
> 
> 在一些编程语言中，例如 Ruby，每个名字都有一个 Symbol。
> 
> 正如我们所看到的，在 JavaScript 中，全局 Symbol 也是这样的。

## Symbol.keyFor

对于全局 Symbol，不仅有 `Symbol.for(key)` 按名字返回一个 Symbol，还有一个反向调用：`Symbol.keyFor(sym)`，它的作用完全反过来：通过全局 Symbol 返回一个名字。

例如：

```js
// 通过 name 获取 Symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 通过 Symbol 获取 name
console.log(Symbol.keyFor(sym)); // name
console.log(Symbol.keyFor(sym2)); // id
```

`Symbol.keyFor` 内部使用全局 Symbol 注册表来查找 Symbol 的键。所以它不适用于非全局 Symbol。如果 Symbol 不是全局的，它将无法找到它并返回 `undefined`。

也就是说，任何 Symbol 都具有 `description` 属性。

例如：

```js
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log(Symbol.keyFor(globalSymbol)); // name，全局 Symbol
console.log(Symbol.keyFor(localSymbol)); // undefined，非全局

console.log(localSymbol.description); // name
console.log(globalSymbol.description); // name
```

## 系统Symbol

JavaScript 内部有很多“系统” Symbol，我们可以使用它们来微调对象的各个方面。

它们都被列在了 [众所周知的 Symbol](https://tc39.github.io/ecma262/#sec-well-known-symbols) 表的规范中：

* `Symbol.hasInstance`
* `Symbol.isConcatSpreadable`
* `Symbol.iterator`
* `Symbol.toPrimitive`
* ……等等。

例如，`Symbol.toPrimitive` 允许我们将对象描述为原始值转换。我们很快就会看到它的使用。

当我们研究相应的语言特征时，我们对其他的 Symbol 也会慢慢熟悉起来。

## 总结

1. 根据规范，js中对象的key值，只能是字符串或者symbol
2. symbol用来表是唯一的标识符。
   ```js
   // id 是 symbol 的一个实例化对象
   let id = Symbol();
   
   // 或者
   
   // id 是描述为 "id" 的 Symbol
   let id = Symbol("id");
   ```
3. 创建Symbol时的描述即使相同，但是他们也会返回唯一的Symbol
   ```js
   let symbol1 = Symbol('id')
   let symbol2 = Symbol('id')
   console.log(symbol1 === symbol2) // false
   ```
4. Symbol不能隐式转换成字符串，隐式转换的话，会报错。这是一种防止混乱的“语言保护”，因为字符串和Symbol有本质上的不同，不应该意外地将它们转换成另一个。
   ```js
   let symbol1 = Symbol()
   
   if (symbol1 > 1) {
       console.log('aaa');
   }
   // TypeError: Cannot convert a Symbol value to a number
   
   console.log('' + symbol1); // TypeError: Cannot convert a Symbol value to a string
   ```
5. 可以显示的转换Symbol，但是不能显示转换为number，只可以是字符串或Boolean
   ```js
   let symbol1 = Symbol('id')
   
   console.log(symbol1.toString()); // Symbol(id)
   
   console.log(Boolean(symbol1)); // true
   
   console.log(Number(symbol1)); // TypeError: Cannot convert a Symbol value to a number
   ```
6. 可以使用description属性，获取到symbol的描述
   ```js
   let symbol1 = Symbol('id')
   console.log(symbol1.description) // id
   ```
7. Symbol创建的对象属性，使用for...in获取不到，使用Object.keys也获取不到
   ```js
   let symbol = Symbol('age')
   let user = {
       name: 'cheny && xzz',
       job: 'hh',
       [symbol]: '18'
   }
   
   for (let key in user) {
       console.log(key); // name, job
   }
   
   console.log(Object.keys(user)); // [ 'name', 'job' ]
   
   console.log(user[symbol]); // 18
   ```
8. 但是使用Object.assign可以复制到对象的Symbol属性
   ```js
   let symbol = Symbol('age')
   let user = {
       name: 'cheny && xzz',
       job: 'hh',
       [symbol]: '18'
   }
   
   let newObj = Object.assign({}, user)
   console.log(newObj[symbol]); // 18
   ```
9. 可以使用Object.getOwnPropertySymbols()获取到所有的Symbol属性的key值
   ```js
   let symbol = Symbol('age')
   let user = {
       name: 'cheny && xzz',
       job: 'hh',
       [symbol]: '18'
   }
   
   let arrSymbols = Object.getOwnPropertySymbols(user)
   for (let key of arrSymbols) {
       console.log(user[key]); // 18
   }
   
   console.log(arrSymbols[0] === symbol); // true
   ```
10. 可以使用Symbol.for()注册全局的Symbol，如果全局有这个值，就会返回这个值，没有的话就会创建这个值
   ```js
   // 从全局注册表中读取
   let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它
   
   // 再次读取（可能是在代码中的另一个位置）
   let idAgain = Symbol.for("id");
   
   // 相同的 Symbol
   console.log( id === idAgain ); // true
   ```
11. 可以使用Symbol.keyFor，获取到全局Symbol的名字，但必须是全局的，如果非全局的会返回undefined。
   ```js
   // 通过 name 获取 Symbol
   let sym = Symbol.for("name");
   let sym2 = Symbol.for("id");
   
   // 通过 Symbol 获取 name
   console.log( Symbol.keyFor(sym) ); // name
   console.log( Symbol.keyFor(sym2) ); // id
   ```
12. 所以，所有的symbol都可以使用之前提到的description属性获取的名字。
   ```js
   let globalSymbol = Symbol.for("name");
   let localSymbol = Symbol("name");
   
   console.log(Symbol.keyFor(globalSymbol)); // name，全局 Symbol
   console.log(Symbol.keyFor(localSymbol)); // undefined，非全局
   
   console.log(localSymbol.description); // name
   console.log(globalSymbol.description); // name
   ```
13. 如果没有设置名字，description属性会返回undefined
   ```js
   let localSymbol = Symbol();
   console.log(localSymbol.description); // undefined
   ```
14. 系统内置的Symbol
   JavaScript 内部有很多“系统” Symbol，我们可以使用它们来微调对象的各个方面。
   * `Symbol.hasInstance`
   * `Symbol.isConcatSpreadable`
   * `Symbol.iterator`
   * `Symbol.toPrimitive`
   * ……等等。

## 参考

[Symbol类型](https://zh.javascript.info/symbol)
