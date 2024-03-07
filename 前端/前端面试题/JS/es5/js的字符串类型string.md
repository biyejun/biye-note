## 前言

本篇文章对js中的字符串的相关知识点做一个系统的梳理。

## 字符串的三种声明方式

```js
let str1 = "abc" // 双引号
let str2 = 'abc' // 单引号
let str3 = `abc` // 反引号 es6
```

## 特殊字符

我们可以通过使用“换行符（newline character）”，以支持使用单引号和双引号来创建跨行字符串。换行符写作 `\n`，用来表示换行：

```js
let guestList = "Guests:\n * John\n * Pete\n * Mary";

console.log(guestList); // 一个多行的客人列表
// Guests:
//  * John
//  * Pete
//  * Mary
```

例如，这两行描述的是一样的，只是书写方式不同：

```js
let str1 = "Hello\nWorld"; // 使用“换行符”创建的两行字符串

// 使用反引号和普通的换行创建的两行字符串
let str2 = `Hello
World`;

console.log(str1 === str2); // true
console.log(str1);
// Hello
// World
```

还有其他不常见的“特殊”字符。

这是完整列表：

| 字符                                         | 描述                                                                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `\n`                                     | 换行                                                                                                                                            |
| `\r`                                     | 回车：不单独使用。Windows 文本文件使用两个字符 `\r\n` 的组合来表示换行。                                                                    |
| `\',\"`                                  | 引号                                                                                                                                            |
| `\\`                                     | 反斜杠                                                                                                                                          |
| `\t`                                     | 制表符                                                                                                                                          |
| `\b, \f, \v`                             | 退格，换页，垂直标签 —— **为了兼容性，现在已经不使用了** 。                                                                             |
| `\xXX`                                   | 具有给定十六进制 Unicode `XX` 的 Unicode 字符，例如：`'\x7A'` 和 `'z'` 相同。                                                       |
| `\uXXXX`                                 | 以 UTF-16 编码的十六进制代码 `XXXX` 的 unicode 字符，例如 `\u00A9` —— 是版权符号 `©` 的 unicode。它必须正好是 4 个十六进制数字。 |
| `\u{X…XXXXXX}`（1 到 6 个十六进制字符） | 具有给定 UTF-32 编码的 unicode 符号。一些罕见的字符用两个 unicode 符号编码，占用 4 个字节。这样我们就可以插入长代码了。                         |

unicode 示例：

```js
console.log("\u00A9"); // ©
console.log("\u{20331}"); // ?，罕见的中国象形文字（长 unicode）
console.log("\u{1F60D}"); // ?，笑脸符号（另一个长 unicode）
```

所有的特殊字符都以反斜杠字符 `\` 开始。它也被称为“转义字符”。

如果我们想要在字符串中插入一个引号，我们也会使用它。

例如：

```js
console.log( 'I\'m the Walrus!' ); // I'm the Walrus!
```

正如你所看到的，我们必须在内部引号前加上反斜杠 `\'`，否则它将表示字符串结束。

当然，只有与外部闭合引号相同的引号才需要转义。因此，作为一个更优雅的解决方案，我们可以改用双引号或者反引号：

```js
console.log( `I'm the Walrus!` ); // I'm the Walrus!
```

注意反斜杠 `\` 在 JavaScript 中用于正确读取字符串，然后消失。内存中的字符串没有 `\`。

但是如果我们需要在字符串中显示一个实际的反斜杠 `\` 应该怎么做？

我们可以这样做，只需要将其书写两次 `\\`：

```js
console.log( `The backslash: \\` ); // The backslash: \
```

## 字符串长度

`length` 属性表示字符串长度：

```js
console.log( `My\n`.length ); // 3
```

注意 `\n` 是一个单独的“特殊”字符，所以长度确实是 `3`。

> **`length` 是一个属性**
> 
> 掌握其他编程语言的人，有时会错误地调用 `str.length()` 而不是 `str.length`。这是行不通的。
> 
> 请注意 `str.length` 是一个数字属性，而不是函数。后面不需要添加括号。

## 访问字符

要获取在 `pos` 位置的一个字符，可以使用方括号 `[pos]` 或者调用 [str.charAt(pos)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) 方法。第一个字符从零位置开始：

```js
let str = `Hello`;

// 第一个字符
console.log( str[0] ); // H
console.log( str.charAt(0) ); // H

// 最后一个字符
console.log( str[str.length - 1] ); // o
```

方括号是获取字符的一种现代化方法，而 `charAt` 是历史原因才存在的。

它们之间的唯一区别是，如果没有找到字符，`[]` 返回 `undefined`，而 `charAt` 返回一个空字符串：

```js
let str = `Hello`;

console.log( str[1000] ); // undefined
console.log( str.charAt(1000) ); // ''（空字符串）
```

我们也可以使用 `for..of` 遍历字符：

```js
for (let char of "Hello") {
  console.log(char); // H,e,l,l,o（char 变为 "H"，然后是 "e"，然后是 "l" 等）
}
```

## 字符串是不可改变的

在 JavaScript 中，字符串不可更改。改变字符是不可能的。

我们证明一下为什么不可能：

```js
let str = 'Hi';

str[0] = 'h'; 
console.log(str[0]); // H 并没有改变，仍旧是原先的H
```

通常的解决方法是创建一个新的字符串，并将其分配给 `str` 而不是以前的字符串。

例如：

```js
let str = 'Hi';

str = 'h' + str[1];  // 替换字符串

console.log( str ); // hi
```

## 比较字符串

字符串按字母顺序逐字比较。不过，有一些奇怪的地方。

1. 小写字母总是大于大写字母：
   
   ```js
   console.log( 'a' > 'Z' ); // true
   ```
2. 带变音符号的字母存在“乱序”的情况：
   
   ```js
   console.log( 'Österreich' > 'Zealand' ); // true
   ```
   
   如果我们对这些国家名进行排序，可能会导致奇怪的结果。通常，人们会期望 `Zealand` 在名单中的 `Österreich` 之后出现。

为了明白发生了什么，我们回顾一下在 JavaScript 中字符串的内部表示。

我们知道，计算机存储字符只能是0和1的二进制，所以每个字符实际上都有它唯一的数字表示，最终将数字转换为二进制存储在内存中。所有的字符串都使用 [UTF-16](https://en.wikipedia.org/wiki/UTF-16) 编码。即：每个字符都有对应的数字代码。有特殊的方法可以获取代码表示的字符，以及字符对应的代码。

### str.codePointAt(pos)

返回在 `pos` 位置的字符代码 :

```js
// 不同的字母有不同的代码
console.log( "z".codePointAt(0) ); // 122
console.log( "Z".codePointAt(0) ); // 90
```

### String.fromCodePoint(code)

通过数字 `code` 创建字符

```js
console.log(String.fromCodePoint(90)); // Z
console.log(String.fromCodePoint(30495)); // 真
```

现在我们看一下代码为 `65..220` 的字符（拉丁字母和一些额外的字符），方法是创建一个字符串：

```js
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
console.log( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

看到没？先是大写字符，然后是一些特殊字符，然后是小写字符，而 `Ö` 几乎是最后输出。

现在很明显为什么 `a > Z`。

字符通过数字代码进行比较。越大的代码意味着字符越大。`a`（97）的代码大于 `Z`（90）的代码。

* 所有小写字母追随在大写字母之后，因为它们的代码更大。
* 一些像`Ö` 的字母与主要字母表不同。这里，它的代码比任何从`a` 到`z` 的代码都要大。

## 总结

计算机只能存储二进制字符，只有0和1，也就是说，所有字符串最终存储的方式也是0和1，所以，每个字符实际上都遵循了一套编码规范，可以将字符串转换为数字，然后数字就能转换为二进制。js中的字符串遵循`UTF-16`的编码规范。

```js
let str1 = `0123456789`
let str2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
let str3 = `abcdefghijklmnopqrstuvwxyz`
let str4 = `你好中国`

let str1Num = ''
let str2Num = ''
let str3Num = ''
let str4Num = ''
for (const char of str1) {
    str1Num += `${char.codePointAt(0)} `
}
for (const char of str2) {
    str2Num += `${char.codePointAt(0)} `
}
for (const char of str3) {
    str3Num += `${char.codePointAt(0)} `
}
for (const char of str4) {
    str4Num += `${char.codePointAt(0)} `
}
// `0123456789`
console.log(str1Num); // 48 49 50 51 52 53 54 55 56 57 
// `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
console.log(str2Num); // 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 
// `abcdefghijklmnopqrstuvwxyz`
console.log(str3Num); // 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 
// `你好中国`
console.log(str4Num); // 20320 22909 20013 22269
```

1. 我们可以使用`''`、`""`、``、来声明字符串
2. 特殊字符可以使用转义，反斜杠加特殊字符的方式，比如换行`\n`，回车`\r`等等。
3. 字符串是不可以改变的，比如`let a = 'abc'`，`a[0]=A`，这是无效的。
4. 字符串在比较时，每个字符会挨个比较，有一个对照表可以将字符串转为数字，比较的实际是数字。
   1. `str.codePointAt(pos)`，将字符转换为数字（参照对照表中）
   2. `String.fromCodePoint(code)`，将数字转换为字符串（参照对照表）

## 参考

[https://zh.javascript.info/string#nei-bu-unicode](https://zh.javascript.info/string#nei-bu-unicode)
