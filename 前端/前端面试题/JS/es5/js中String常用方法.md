## 引言

本篇文章对js中String类的常用方法做一个小结。

| 方法                   | 用途                                                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| charAt()               | 从一个字符串中返回指定的字符。                                                                                                              |
| charCodeAt()           | 返回 `0` 到 `65535` 之间的整数，表示给定索引处的 UTF-16 代码单元                                                                    |
| codePointAt()          | 返回 一个 Unicode 编码点值的非负整数。                                                                                                      |
| concat()               | 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。                                                                            |
| endsWith()             | 用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 `true` 或 `false`。                                    |
| String.fromCharCode()  | 静态 **`String.fromCharCode()`** 方法返回由指定的 UTF-16 代码单元序列创建的字符串。                                               |
| String.fromCodePoint() | `String.fromCodePoint()` 静态方法返回使用指定的代码点序列创建的字符串。                                                                 |
| includes()             | 用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。                                                                    |
| indexOf()              | 返回调用它的 `String` 对象中第一次出现的指定值的索引，从 `fromIndex` 处进行搜索。如果未找到该值，则返回 -1。                        |
| lastIndexOf()          | 返回调用`String`对象的指定值最后一次出现的索引，在一个字符串中的指定位置 `fromIndex`处从后向前搜索。如果没找到这个特定值则返回-1 。 |
| localeCompare()        | 返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。                                                                |
| match()                | 检索返回一个字符串匹配正则表达式的结果。                                                                                                    |
| matchAll()             | 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。                                                                                  |
| normalize()            | 按照指定的一种 Unicode 正规形式将当前字符串正规化。                                                                                         |
| padEnd()               | 会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充                  |
| padStart()             | 用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。                        |
| repeat()               | 返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。                                                                        |
| replace()              | 返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。                                              |
| replaceAll()           | 返回一个新字符串，新字符串所有满足 `pattern` 的部分都已被`replacement` 替换。                                                       |
| search()               | 执行正则表达式和 `String` 对象之间的一个搜索匹配。                                                                                      |
| slice()                | 提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。                                                                          |
| split()                | 使用指定的分隔符字符串将一个`String`对象分割成子字符串数组                                                                              |
| startsWith()           | 用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。                                          |
| substring()            | 返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。                                                  |
| toLocaleLowerCase()    | 根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为小写的格式。                                                                |
| toLocaleUpperCase()    | 根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。                                                                          |
| toLowerCase()          | 将调用该方法的字符串值转为小写形式，并返回。                                                                                                |
| toUpperCase()          | 方法将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。                                                |
| toString()             | 返回指定对象的字符串形式。                                                                                                                  |
| trim()                 | 从一个字符串的两端删除空白字符。                                                                                                            |
| trimRight()            | 从一个字符串的末端移除空白字符。另一个别名为`trimEnd()`                                                                                 |
| trimLeft()             | 从字符串的开头删除空格。另一个别名为`trimStart()`                                                                                       |
| valueOf()              | 返回 `String`对象的原始值                                                                                                               |

## 静态方法

### String.fromCharCode()

方法返回由指定的 UTF-16 代码单元序列创建的字符串。

语法：`String.fromCharCode(num1[, ...[, numN]])`

参数为`num1[, ...[, numN]]`：范围介于 `0` 到 `65535`（`0xFFFF`）之间。大于 `0xFFFF` 的数字将被截断。不进行有效性检查。

```js
let str1 = String.fromCharCode(189, 43, 190, 61)
console.log(str1); // ½+¾=

let str2 = String.fromCharCode(65, 66, 67, 68)
console.log(str2); // ABCD
```

### String.fromCodePoint()

ES6新增的方法，**返回使用指定的代码点序列创建的字符串。**

```js
let str1 = String.fromCodePoint(9731, 9733, 9842, 0x2F804)
console.log(str1); // ☃★♲?
```

> tip：`String.fromCharCode()`和`String.fromCodePoint()`的区别
> 
> `fromCharCode`：参数的取值范围为`0` 到 `65535`（`0xFFFF`）之间，不能识别大于`0xFFFF`的码点，ES6 提供了`String.fromCodePoint()`方法，可以识别大于`0xFFFF`的字符，弥补了`String.fromCharCode()`方法的不足。比如：
> 
> ```js
> let str1 = String.fromCharCode(0x20BB7)
> let str2 = String.fromCodePoint(0x20BB7)
> console.log(str1); // ஷ 
> console.log(str2); // ? 
> // 二者输出的字符并不一样，
> // String.fromCharCode()不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了，
> // 最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。
> 
> let str3 = String.fromCharCode(0x0BB7)
> let str4 = String.fromCodePoint(0x0BB7)
> console.log(str3); // ஷ
> console.log(str4); // ஷ
> ```
> 
> 参考：[https://blog.csdn.net/ixygj197875/article/details/79090515](https://blog.csdn.net/ixygj197875/article/details/79090515)

## 原型上的方法

### 获取字符或码点

#### charAt()、charCodeAt()、codePointAt()

1. charAt() 从一个字符串中返回指定的字符。
   ```js
   let str = 'hello world'
   console.log(str.charAt()); // h 默认index为0
   console.log(str.charAt(0)); // h
   console.log(str.charAt(1)); // e
   console.log(str.charAt(2)); // l
   console.log(str.charAt(3)); // l
   console.log(str.charAt(4)); // o
   console.log(str.charAt(5)); // ''
   console.log(str.charAt(6)); // w
   console.log(str.charAt(100)); // '' 超出会返回空字符串
   ```
2. charCodeAt() 返回 `0` 到 `65535` 之间的整数，表示给定索引处的 UTF-16 代码单元
   ```js
   let str = 'abcdefg'
   console.log(str.charCodeAt()); // 97 默认index为0
   console.log(str.charCodeAt(0)); // 97
   console.log(str.charCodeAt(1)); // 98
   console.log(str.charCodeAt(2)); // 99
   console.log(str.charCodeAt(3)); // 100
   console.log(str.charCodeAt(4)); // 101
   console.log(str.charCodeAt(5)); // 102
   console.log(str.charCodeAt(100)); // NaN 超出index的范围返回NaN
   ```
3. codePointAt() 返回 一个 Unicode 编码点值的非负整数。大于65535的也会正常返回
   ```js
   console.log('ABC'.codePointAt(1));         // 66
   console.log('\uD800\uDC00'.codePointAt(0)); // 65536
   
   console.log('XYZ'.codePointAt(42)); // undefined 超出索引会返回undefined
   ```

### 查找子字符串

#### indexOf()、lastIndexOf()、includes()、stratsWith()、endsWith()

1. indexof() 返回子字符串第一次出现的索引位置，没找到就返回-1
   ```js
   let str = 'abcdabefg'
   console.log(str.indexOf('ab')); // 0
   console.log(str.indexOf('ab', 3)); // 4  第二个参数表示从哪里开始找
   console.log(str.indexOf('d')); // 3
   console.log(str.indexOf('hhh')); // -1 没有就返回-1
   ```
2. lastIndexOf() 倒着找，没有就返回-1
   ```js
   let str = 'abcdabefg'
   console.log(str.lastIndexOf('ab')); // 4 倒着找
   console.log(str.lastIndexOf('ab', 3)); // 0  倒着找 第二个参数表示从哪里开始找
   console.log(str.lastIndexOf('d')); // 3
   console.log(str.lastIndexOf('hhh')); // -1 没有就返回-1
   ```
3. includes() 是否包含子字符串，返回true或false
   ```js
   let str = 'ababccd'
   console.log(str.includes('ab')); // true
   console.log(str.includes('abc')); // true
   console.log(str.includes('hh')); // false
   ```
4. startsWith() 判断当前字符串是否以另外一个给定的子字符串开头，返回true或false
   ```js
   let str = 'ababccd'
   console.log(str.startsWith('ab')); // true
   console.log(str.startsWith('abc')); // false
   ```
5. endsWith() 判断当前字符串是否以另外一个给定的子字符串结尾，返回true或false
   ```js
   let str = 'ababccd'
   console.log(str.endsWith('ab')); // false
   console.log(str.endsWith('cd')); // true
   ```

### 生成新字符串

#### slice()、subString()、repeat()、concat()、padStart()、padEnd()

1. slice() 提取字符串的一部分，返回一个新的
   
   ```js
   let str = 'hello world'
   console.log(str.slice(0)); // hello world 从索引0截取到末尾
   console.log(str.slice(0, 1)); // h 从索引0截取到索引1，不包含索引1
   console.log(str.slice(-3)); // rld 从倒数第三个字符截取到末尾
   console.log(str.slice(-3, -2)); // r 从倒数第三个字符截取到倒数第二个字符，不包含倒数第二个
   ```
2. subString() 截取字符串的一部分，
   `substring` 提取从 `indexStart` 到 `indexEnd`（不包括）之间的字符。特别地：
   
   * 如果`indexStart` 等于`indexEnd`，`substring` 返回一个空字符串。
   * 如果省略`indexEnd`，`substring` 提取字符一直到字符串末尾。
   * 如果任一参数小于 0 或为`NaN`，则被当作 0。
   * 如果任一参数大于`stringName.length`，则被当作`stringName.length`。
   * 如果`indexStart` 大于`indexEnd`，则`substring` 的执行效果就像两个参数调换了一样。见下面的例子。
   
   ```js
   let anyString = "Mozilla";
   
   // 输出 "Moz"
   console.log(anyString.substring(0,3));
   console.log(anyString.substring(3,0));
   console.log(anyString.substring(3,-3));
   console.log(anyString.substring(3,NaN));
   console.log(anyString.substring(-2,3));
   console.log(anyString.substring(NaN,3));
   
   // 输出 "lla"
   console.log(anyString.substring(4,7));
   console.log(anyString.substring(7,4));
   
   // 输出 ""
   console.log(anyString.substring(4,4));
   
   // 输出 "Mozill"
   console.log(anyString.substring(0,6));
   
   // 输出 "Mozilla"
   console.log(anyString.substring(0,7));
   console.log(anyString.substring(0,10));
   ```
3. repeat() 把原来的字符串重复多少遍建一个新的字符串
   
   ```js
   console.log("abc".repeat(0));    // ""
   console.log("abc".repeat(1));    // "abc"
   console.log("abc".repeat(2));    // "abcabc"
   console.log("abc".repeat(3.5));  // "abcabcabc" 参数count将会被自动转换成整数，向下取整
   ```
4. concat() 拼接字符串，返回一个新的
   
   ```js
   let hello = 'Hello, '
   console.log(hello.concat('Kevin', '. Have a nice day.'))
   // Hello, Kevin. Have a nice day.
   
   let greetList = ['Hello', ' ', 'Venkat', '!']
   console.log("".concat(...greetList));  // "Hello Venkat!"
   
   console.log("".concat({}));   // [object Object]
   console.log("".concat([]));  // ""
   console.log("".concat(null));  // "null"
   console.log("".concat(true));  // "true"
   console.log("".concat(4, 5));  // "45"
   ```
5. padStart() 在字符串的左边填充一堆字符串，满足length
   
   ```js
   let str = 'abc'
   console.log(str.padStart(10, 'cheny')); // chenychabc
   console.log(str.padStart(10, '*')); // *******abc
   console.log(str.padStart(1, 'cheny')); // abc 如果长度变小了，就忽略，返回原来的字符串
   ```
6. padEnd() 在字符串的右边填充一堆字符串，满足length
   
   ```js
   let str = 'abc'
   console.log(str.padEnd(10, 'cheny')); // abcchenych
   console.log(str.padEnd(10, '*')); // abc*******
   console.log(str.padEnd(1, 'cheny')); // abc 如果长度变小了，就忽略，返回原来的字符串
   ```

### 转变大小写的

#### toLowerCase()、toUpperCase()、toLocalLowerCase()、toLocalUpperCase()

1. toLowerCase() 字符串值转为小写形式，并返回。
   ```js
   let str = 'ABC'
   console.log(str.toLowerCase()); // abc
   console.log(str); // ABC
   ```
2. toUpperCase() 字符串值转为大写形式，并返回。
   ```js
   let str = 'abc'
   console.log(str.toUpperCase()); // ABC
   console.log(str); // abc
   ```
3. toLocalLowerCase() 转换为小写（可以传地区，不同地区的Unicode也可能不一样，默认是主机环境的当前区域）
   ```js
   console.log('ALPHABET'.toLocaleLowerCase()); // 'alphabet'
   console.log('\u0130'.toLocaleLowerCase('tr') === 'i');    // true
   console.log('\u0130'.toLocaleLowerCase('en-US') === 'i'); // false
   ```
4. toLocalUpperCase() 转换为大写（可以传地区，不同地区的Unicode也可能不一样，默认是主机环境的当前区域）
   ```js
   const city = 'istanbul';
   console.log(city.toLocaleUpperCase('en-US')); // ISTANBUL
   console.log(city.toLocaleUpperCase('TR')); // İSTANBUL
   ```

### 参数可以是正则的

#### match()、matchAll()、replace()、replaceAll()、search()

1. match() 方法检索返回一个字符串匹配正则表达式的结果。
2. matchAll() 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
3. replace() 方法返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。
4. replaceAll() 返回一个新字符串，新字符串所有满足`pattern` 的部分都已被`replacement` 替换。
5. search() 执行正则表达式和`String`对象之间的一个搜索匹配。

> 具体使用方法将在正则表达式章节学习。参考：[正则表达式（RegExp）和字符串（String）的方法](http://www.bnbiye.cn/#/articleDetail/02832040-583d-11ec-96d5-7933aca11ca0)

### 转数组的

#### split()

以一个分隔符为基准，将一串字符串转换为数组。（参数也可以是正则）

```js
let str1 = 'abc'
let str2 = 'a b c'
let str3 = 'a-b-c'

console.log(str1.split(''))  // [ 'a', 'b', 'c' ]
console.log(str2.split(' ')) // [ 'a', 'b', 'c' ]
console.log(str3.split('-')) // [ 'a', 'b', 'c' ]
```

### 去除空格的

#### trim()、trimLeft()、trimRight()

1. trim() 去除左右两边空格
   ```js
   let str1 = '  123  '
   console.log(str1.trim()); // '123'
   ```
2. trimLeft() 去除左边的空格，也叫trimStart()
   ```js
   let str1 = '  123  '
   console.log(str1.trimStart()); // '123  '
   console.log(str1.trimLeft()); // '123  '
   ```
3. trimRight() 去除右边的空格，也叫trimEnd()
   ```js
   let str1 = '  123  '
   console.log(str1.trimEnd()); // '  123'
   console.log(str1.trimRight()); // '  123'
   ```

### 其他

#### toString()、valueOf()

1. toString() 返回一个字符串对象的字符串形式
   ```js
   var x = new String("Hello world");
   console.log(typeof x); // object
   let y = x.toString()
   console.log(y); // 'Hello world'
   console.log(typeof y) // string
   ```
2. valueOf() 返回字符串的原始值
   The `valueOf()` method of [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) returns the primitive value of a [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) object as a string data type. This value is equivalent to [`String.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toString).
   其实内部的valueOf()就是toString()
   ```js
   var x = new String("Hello world");
   console.log(typeof x); // object
   let y = x.valueOf()
   console.log(y); // 'Hello world'
   console.log(typeof y) // string
   ```

## 总结

本章概括了字符串的常用方法，可以按功能记忆。

1. 静态方法
   1. fromCharCode() 使用码点创建字符串，范围不能超过`65535 (0xffff)`
   2. fromCodePoint() 使用码点创建字符串,es6新增的，范围可以超过`65535 (0xffff)`
2. 原型方法
   1. 获取字符或码点
      
      1. cahrAt() 从一个字符串中返回指定的字符。
      2. charCodeAt() 返回`0` 到`65535` 之间的码点
      3. codePointAt() 返回指定位置字符的码点，大于65535的也会正常返回
   2. 查找子字符串
      
      1. indexOf() 返回查找到的第一个子字符串的位置索引，没有返回-1
      2. lastIndexOf() 倒着查，没有返回-1
      3. includes() 返回true或false
      4. startsWith() 查找是否以子字符串为开头，返回true或false
      5. endsWith() 是否以子字符串为结尾，返回true或false
   3. 生成新字符串
      
      1. slice() 截取一段字符串，不传参默认截取全部，(0,1)表示从索引0截取到索引1，不包含索引1。参数还可以是负数，(-2,-1)表示，从倒数第二个截取到倒数第一个，不包含倒数第一个。
      2. subString() 也是截取一部分，
         `substring` 提取从 `indexStart` 到 `indexEnd`（不包括）之间的字符。特别地：
         * 如果`indexStart` 等于`indexEnd`，`substring` 返回一个空字符串。
         * 如果省略`indexEnd`，`substring` 提取字符一直到字符串末尾。
         * 如果任一参数小于 0 或为`NaN`，则被当作 0。
         * 如果任一参数大于`stringName.length`，则被当作`stringName.length`。
         * 如果`indexStart` 大于`indexEnd`，则`substring` 的执行效果就像两个参数调换了一样。
      3. repeat() 把原来的字符串重复多少遍，生成一个新的，比如`repeat(1)`，`repeat(2)`，如果传入的是小数，会默认向下取整。
      4. concat() 拼接字符串，返回一个新的
      5. padStart() 在字符串的左边填充一堆字符串，满足length
      6. padEnd() 在字符串的右边填充一堆字符串，满足length
   4. 转变大小写
      
      1. toLowerCase() 转换为小写
      2. toUpperCase() 转换为大写
      3. toLocalLowereCase() 转换为小写，可以传地区
      4. toLocalUpperCase() 转换为大写，可以传地区
   5. 参数可以是正则的
      
      1. match() 方法检索返回一个字符串匹配正则表达式的结果。
      2. matchAll() 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
      3. replace() 方法返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。
      4. replaceAll() 返回一个新字符串，新字符串所有满足`pattern` 的部分都已被`replacement` 替换。
      5. search() 执行正则表达式和`String`对象之间的一个搜索匹配。
      
      （在正则部分在详细学习，参考：[正则表达式（RegExp）和字符串（String）的方法](http://www.bnbiye.cn/#/articleDetail/02832040-583d-11ec-96d5-7933aca11ca0)）
   6. 转数组
      
      1. split() 以某个字符为基准，将字符串转换为数组
   7. 去除空格
      
      1. trim() 去除左右两边的空格
      2. trimLeft() 去除左边的空格，也叫`trimStart()`
      3. trimRight() 去除右边的空格，也叫`trimEnd()`
   8. 其他
      
      1. toString() 将String对象转换为字符串
      2. valueOf()  获取String对象的原始值，实际上就是toString()

## 参考

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

[https://zhuanlan.zhihu.com/p/54228216](https://zhuanlan.zhihu.com/p/54228216)
