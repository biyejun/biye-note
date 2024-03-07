## 前言

在js中，number有两种表示方法，常规数字和bigint。

在现代 JavaScript 中，数字（number）有两种类型：

1. JavaScript 中的常规数字以 64 位的格式[IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) 存储，也被称为“双精度浮点数”。这是我们大多数时候所使用的数字，我们将在本章中学习它们。
2. BigInt 数字，用于表示任意长度的整数。有时会需要它们，因为常规数字不能超过`253` 或小于`-253`。由于仅在少数特殊领域才会用到 BigInt，因此我们在特殊的章节[BigInt](https://zh.javascript.info/bigint) 中对其进行了介绍。

所以，在这里我们将讨论常规数字类型。现在让我们开始学习吧。

## 数字的简单表示1e6

数字如果零很多的时候，可以使用`e`表示，`e`后面跟个数字，表示补充多少0，比如：

```js
let a = 1000000 // 6个0
let b = 1e6 // 表示 1* 1000000
console.log(a === b) // true

let c = 0.0000001 // 1. 小数点向左移动7位，所以数0的个数的话，前面正好有7个0
let d = 1e-7 // 表示 1/ 10000000（7个0）
console.log(c === d); // true
```

## 十六进制、二进制和八进制

### 十六进制

[十六进制](https://en.wikipedia.org/wiki/Hexadecimal) 数字在 JavaScript 中被广泛用于表示颜色，编码字符以及其他许多东西。所以自然地，有一种较短的写方法：`0x`，然后是数字。

使用前缀`0x`表示的数字，可用数字和字母表示`0-9 a-f`，

例如：

```js
let a = 0xff // 16进制 使用0x为前缀 0-9 a-f

console.log(a); // 255
console.log(typeof a); // number

console.log(0xa); // 10
console.log(0xb); // 11
console.log(0xc); // 12
console.log(0xd); // 13
console.log(0xe); // 14
console.log(0xf); // 15
```

### 二进制

前缀使用`Ob`表示的数字，只可以使用`0 1`表示

```js
let a = 0b11111111 // 二进制形式的 255
console.log(a); // 255

console.log(0b0); // 0
console.log(0b1); // 1
```

### 八进制

前缀使用`0o`表示的数字，可以使用数字为`0-7`

```js
let a = 0o377 // 八进制形式的 255
console.log(a); // 255

console.log(0o0); // 0
console.log(0o1); // 1
console.log(0o2); // 2
console.log(0o3); // 3
console.log(0o4); // 4
console.log(0o5); // 5
console.log(0o6); // 6
console.log(0o7); // 7
```

> 注意：只有这三种进制支持这种写法。对于其他进制，我们应该使用函数 `parseInt`

## number.toString(base)

方法 `num.toString(base)` 返回在给定 `base` 进制数字系统中 `num` 的字符串表示形式。

例如：

```js
let num = 255;
let a = num.toString(16)
let b = num.toString(8)
let c = num.toString(2)

console.log(a); // ff
console.log(b); // 377
console.log(c); // 11111111

console.log(typeof a); // string
console.log(typeof b); // string
console.log(typeof c); // string
```

`base` 的范围可以从 `2` 到 `36`。默认情况下是 `10`。

常见的用例如下：

* **base=16** 用于十六进制颜色，字符编码等，数字可以是`0..9` 或`A..F`。
* **base=2** 主要用于调试按位操作，数字可以是`0` 或`1`。
* **base=36** 是最大进制，数字可以是`0..9` 或`A..Z`。所有拉丁字母都被用于了表示数字。对于`36` 进制来说，一个有趣且有用的例子是，当我们需要将一个较长的数字标识符转换成较短的时候，例如做一个短的 URL。可以简单地使用基数为`36` 的数字系统表示：

```js
console.log(123456..toString(36)); // 2n9c
```

> **使用两个点来调用一个方法**
> 
> 请注意 `123456..toString(36)` 中的两个点不是打错了。如果我们想直接在一个数字上调用一个方法，比如上面例子中的 `toString`，那么我们需要在它后面放置两个点 `..`。
> 
> 如果我们放置一个点：`123456.toString(36)`，那么就会出现一个 error，因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。
> 
> 也可以写成 `(123456).toString(36)`。

## 舍入

舍入（rounding）是使用数字时最常用的操作之一。

这里有几个对数字进行舍入的内建函数：

### Math.floor

向下舍入：`3.1` 变成 `3`，`-1.1` 变成 `-2`。

### Math.ceil

向上舍入：`3.1` 变成 `4`，`-1.1` 变成 `-1`。

### Math.round

向最近的整数舍入：`3.1` 变成 `3`，`3.6` 变成 `4`，`-1.1` 变成 `-1`。

### Math.trunc（IE 浏览器不支持这个方法）

移除小数点后的所有内容而没有舍入：`3.1` 变成 `3`，`-1.1` 变成 `-1`。

### 小例子

```js
let num = 3.4
let a = Math.floor(num)
let b = Math.ceil(num)
let c = Math.round(num)
let d = Math.trunc(num)

console.log(a); // 3
console.log(b); // 4
console.log(c); // 3
console.log(d); // 3

console.log(typeof a); // number
console.log(typeof b); // number
console.log(typeof c); // number
console.log(typeof d); // number
```

这些函数涵盖了处理数字小数部分的所有可能方法。但是，如果我们想将数字舍入到小数点后 `n` 位，该怎么办？

例如，我们有 `1.2345`，并且想把它舍入到小数点后两位，仅得到 `1.23`。

有两种方式可以实现这个需求：

1. 乘除法
   例如，要将数字舍入到小数点后两位，我们可以将数字乘以 `100`（或更大的 10 的整数次幂），调用舍入函数，然后再将其除回。
   
   ```js
   let num = 1.23456;
   let a = Math.floor(num * 100) / 100
   
   console.log(a); // 1.23
   console.log(typeof a); // number
   ```
2. 函数 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 将数字舍入到小数点后 `n` 位，并以字符串形式返回结果。
   
   ```js
   let num1 = 1.34
   let num2 = 1.35
   
   let a = num1.toFixed(1)
   let b = num2.toFixed(1)
   
   // 截断时类似于Math.round，会四舍五入
   console.log(a); // 1.3
   console.log(b); // 1.4
   
   // 返回的是字符串
   console.log(typeof a); // string
   console.log(typeof b); // string
   
   // 位数不够会补0
   console.log(1.34.toFixed(5)); // 1.34000
   ```
   
   我们可以使用一元加号或 `Number()` 调用，将其转换为数字：`+ num.toFixed(5)`。

## 不精确的计算

在内部，数字是以 64 位格式 [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) 表示的，所以正好有 64 位可以存储一个数字：其中 52 位被用于存储这些数字，其中 11 位用于存储小数点的位置（对于整数，它们为零），而 1 位用于符号。

如果一个数字太大，则会溢出 64 位存储，并可能会导致无穷大：

```js
console.log(1e500); // Infinity
```

这可能不那么明显，但经常会发生的是，精度的损失。

考虑下这个（falsy！）测试：

```js
console.log(0.1 + 0.2 === 0.3); // false
```

没错，如果我们检查 `0.1` 和 `0.2` 的总和是否为 `0.3`，我们会得到 `false`。

奇了怪了！如果不是 `0.3`，那能是啥？

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

哎哟！这个错误比不正确的比较的后果更严重。想象一下，你创建了一个电子购物网站，如果访问者将价格为 `¥ 0.10` 和 `¥ 0.20` 的商品放入了他的购物车。订单总额将是 `¥ 0.30000000000000004`。这会让任何人感到惊讶。

但为什么会这样呢？

一个数字以其二进制的形式存储在内存中，一个 1 和 0 的序列。但是在十进制数字系统中看起来很简单的 `0.1`，`0.2` 这样的小数，实际上在二进制形式中是无限循环小数。

换句话说，什么是 `0.1`？`0.1` 就是 `1` 除以 `10`，`1/10`，即十分之一。在十进制数字系统中，这样的数字表示起来很容易。将其与三分之一进行比较：`1/3`。三分之一变成了无限循环小数 `0.33333(3)`。

在十进制数字系统中，可以保证以 `10` 的整数次幂作为除数能够正常工作，但是以 `3` 作为除数则不能。也是同样的原因，在二进制数字系统中，可以保证以 `2` 的整数次幂作为除数时能够正常工作，但 `1/10` 就变成了一个无限循环的二进制小数。

使用二进制数字系统无法 **精确** 存储 *0.1* 或 *0.2* ，就像没有办法将三分之一存储为十进制小数一样。

IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题。这些舍入规则通常不允许我们看到“极小的精度损失”，但是它确实存在。

我们可以看到：

```js
console.log(0.1.toFixed(20)); // 0.10000000000000000555
```

当我们对两个数字进行求和时，它们的“精度损失”会叠加起来。

这就是为什么 `0.1 + 0.2` 不等于 `0.3`。

> **不仅仅是 JavaScript**
> 
> 许多其他编程语言也存在同样的问题。
> 
> PHP，Java，C，Perl，Ruby 给出的也是完全相同的结果，因为它们基于的是相同的数字格式。

我们能解决这个问题吗？当然，最可靠的方法是借助方法 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 对结果进行舍入：

```js
let sum = 0.1 + 0.2;
console.log(sum.toFixed(2)); // 0.30
```

请注意，`toFixed` 总是返回一个字符串。它确保小数点后有 2 位数字。如果我们有一个电子购物网站，并需要显示 `¥ 0.30`，这实际上很方便。对于其他情况，我们可以使用一元加号将其强制转换为一个数字：

```js
let sum = 0.1 + 0.2;
console.log(+sum.toFixed(2)); // 0.3
```

我们可以将数字临时乘以 100（或更大的数字），将其转换为整数，进行数学运算，然后再除回。当我们使用整数进行数学运算时，误差会有所减少，但仍然可以在除法中得到：

```js
console.log((0.1 * 10 + 0.2 * 10) / 10); // 0.3
console.log((0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

> **有趣的事儿**
> 
> 尝试运行下面这段代码：
> 
> ```js
> // Hello！我是一个会自我增加的数字！
> console.log(9999999999999999); //  显示 10000000000000000
> ```
> 
> 出现了同样的问题：精度损失。有 64 位来表示该数字，其中 52 位可用于存储数字，但这还不够。所以最不重要的数字就消失了。
> 
> JavaScript 不会在此类事件中触发 error。它会尽最大努力使数字符合所需的格式，但不幸的是，这种格式不够大到满足需求。

## isFinite和isNaN

还记得这两个特殊的数值吗？

* `Infinity`（和`-Infinity`）是一个特殊的数值，比任何数值都大（小）。
* `NaN` 代表一个 error。

它们属于 `number` 类型，但不是“普通”数字，因此，这里有用于检查它们的特殊函数：

* `isNaN(value)` 将其参数转换为数字，然后测试它是否为 `NaN`：
  
  ```js
  console.log(isNaN(NaN)); // true
  console.log(isNaN('123')); // false
  console.log(isNaN('a123')); // true
  ```
* `isFinite(value)` 将其参数转换为数字，如果是常规数字，则返回 `true`，而不是 `NaN/Infinity/-Infinity`：
  
  ```js
  console.log( isFinite("15") ); // true
  console.log( isFinite("str") ); // false，因为是一个特殊的值：NaN
  console.log( isFinite(Infinity) ); // false，因为是一个特殊的值：Infinity
  ```
  
  有时 `isFinite` 被用于验证字符串值是否为常规数字。
  
  请注意，在所有数字函数中，包括 `isFinite`，空字符串或仅有空格的字符串均被视为 `0`。
  
  > **与 `Object.is` 进行比较**
  > 
  > 有一个特殊的内建方法 [`Object.is`](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/is)，它类似于 `===` 一样对值进行比较，但它对于两种边缘情况更可靠：
  > 
  > 1. 它适用于`NaN`：`Object.is(NaN，NaN) === true`，这是件好事。
  > 2. 值`0` 和`-0` 是不同的：`Object.is(0，-0) === false`，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。
  > 
  > 在所有其他情况下，`Object.is(a，b)` 与 `a === b` 相同。
  > 
  > 这种比较方式经常被用在 JavaScript 规范中。当内部算法需要比较两个值是否完全相同时，它使用 `Object.is`（内部称为 [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)）。

## parseInt与parseFloat

使用加号 `+` 或 `Number()` 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：

```js
console.log( +"100px" ); // NaN
```

唯一的例外是字符串开头或结尾的空格，因为它们会被忽略。

但在现实生活中，我们经常会有带有单位的值，例如 CSS 中的 `"100px"` 或 `"12pt"`。并且，在很多国家，货币符号是紧随金额之后的，所以我们有 `"19€"`，并希望从中提取出一个数值。

这就是 `parseInt` 和 `parseFloat` 的作用。

它们可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。函数 `parseInt` 返回一个整数，而 `parseFloat` 返回一个浮点数：

```js
console.log( parseInt('100px') ); // 100
console.log( parseFloat('12.5em') ); // 12.5

console.log( parseInt('12.3') ); // 12，只有整数部分被返回了
console.log( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取
```

某些情况下，`parseInt/parseFloat` 会返回 `NaN`。当没有数字可读时会发生这种情况：

```js
console.log( parseInt('a123') ); // NaN，第一个符号停止了读取
```

> **parseInt(str, radix)` 的第二个参数**
> 
> `parseInt()` 函数具有可选的第二个参数。它指定了数字系统的基数，因此 `parseInt` 还可以解析十六进制数字、二进制数字等的字符串：
> 
> ```js
> console.log( parseInt('0xff', 16) ); // 255
> console.log( parseInt('ff', 16) ); // 255，没有 0x 仍然有效
> 
> console.log( parseInt('2n9c', 36) ); // 123456
> ```

## 总结

要写有很多零的数字：

* 将`"e"` 和 0 的数量附加到数字后。就像：`123e6` 与`123` 后面接 6 个 0 相同。
* `"e"` 后面的负数将使数字除以 1 后面接着给定数量的零的数字。例如`123e-6` 表示`0.000123`（`123` 的百万分之一）。

对于不同的数字系统：

* 可以直接在十六进制（`0x`），八进制（`0o`）和二进制（`0b`）系统中写入数字。
* `parseInt(str，base)` 将字符串`str` 解析为在给定的`base` 数字系统中的整数，`2 ≤ base ≤ 36`。
* `num.toString(base)` 将数字转换为在给定的`base` 数字系统中的字符串。

要将 `12pt` 和 `100px` 之类的值转换为数字：

* 使用`parseInt/parseFloat` 进行“软”转换，它从字符串中读取数字，然后返回在发生 error 前可以读取到的值。

小数：

* 使用`Math.floor`，`Math.ceil`，`Math.trunc`，`Math.round` 或`num.toFixed(precision)` 进行舍入。
* 请确保记住使用小数时会损失精度。

## 参考

[https://zh.javascript.info/number](https://zh.javascript.info/number)
