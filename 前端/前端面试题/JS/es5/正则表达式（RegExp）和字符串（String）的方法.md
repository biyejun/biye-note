## 前言

在本文中，我们将深入探讨与正则表达式配合使用的各种方法。

## str.match(regexp)

`str.match(regexp)` 方法在字符串 `str` 中找到匹配 `regexp` 的字符。

它有 3 种模式：

1. 如果 `regexp` 不带有 `g` 标记，则它以数组的形式返回第一个匹配项，其中包含分组和属性 `index`（匹配项的位置）、`input`（输入字符串，等于 `str`）：
   
   ```js
   let str = "I love JavaScript";
   
   let result = str.match(/Java(Script)/);
   
   console.log(result);
   /* 
   [
     'JavaScript',
     'Script',
     index: 7,
     input: 'I love JavaScript',
     groups: undefined
   ]
   */
   
   console.log(result[0]);     // JavaScript（完全匹配）
   console.log(result[1]);     // Script（第一个分组）
   console.log(result.length); // 2
   
   // 其他信息：
   console.log(result.index);  // 7（匹配位置）
   console.log(result.input);  // I love JavaScript（源字符串）
   ```
2. 如果 `regexp` 带有 `g` 标记，则它将所有匹配项的数组作为字符串返回，而不包含分组和其他详细信息。
   
   ```js
   let str = "I love JavaScript";
   
   let result = str.match(/Java(Script)/g);
   
   console.log(result); // [ 'JavaScript' ]
   
   console.log(result[0]); // JavaScript
   console.log(result.length); // 1
   ```
3. 如果没有匹配项，则无论是否带有标记 `g` ，都将返回 `null`。
   这是一个重要的细微差别。如果没有匹配项，我们得到的不是一个空数组，而是 `null`。忘记这一点很容易出错，例如：
   
   ```js
   let str = "I love JavaScript";
   
   let result = str.match(/HTML/);
   console.log(result); // null
   // console.log(result.length); // TypeError: Cannot read property 'length' of null
   ```
   
   如果我们希望结果是一个数组，我们可以这样写：
   
   ```js
   let result = str.match(regexp) || [];
   ```

## str.matchAll()

> **A recent addition**
> 
> This is a recent addition to the language. Old browsers may need polyfills.

方法 `str.matchAll(regexp)` 是 `str.match` “新改进的”变体。

它主要用来搜索所有组的所有匹配项。

与 `match` 相比有 3 个区别：

1. 它返回包含匹配项的可迭代对象，而不是数组。我们可以用`Array.from` 从中得到一个常规数组。
2. 每个匹配项均以包含分组的数组形式返回（返回格式与不带`g` 标记的`str.match` 相同）。
3. 如果没有结果，则返回的不是`null`，而是一个空的可迭代对象。

```js
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g; // *? 开启懒惰模式

let matchAll = str.matchAll(regexp);

console.log(matchAll); // [object RegExp String Iterator]，不是数组，而是一个可迭代对象

let matchAll2 = Array.from(matchAll); // 现在返回的是数组

console.log(matchAll2);
/* 
[
  [
    '<h1>',
    'h1',
    index: 0,
    input: '<h1>Hello, world!</h1>',
    groups: undefined
  ],
  [
    '</h1>',
    '/h1',
    index: 17,
    input: '<h1>Hello, world!</h1>',
    groups: undefined
  ]
]
*/
```

如果我们用 `for..of` 来循环 `matchAll` 的匹配项，那么我们就不需要 `Array.from` 了。

## str.split(regexp|substr, limit)

使用正则表达式（或子字符串）作为分隔符来分割字符串。

我们可以用 `split` 来分割字符串，如下所示：

```js
console.log('12-34-56'.split('-')) // 数组 ['12', '34', '56']
console.log('12-34-56'.split('-', 0)) // 数组 []
console.log('12-34-56'.split('-', 1)) // 数组 [ '12' ]
console.log('12-34-56'.split('-', 2)) // 数组 [ '12', '34' ]
console.log('12-34-56'.split('-', 3)) // 数组 [ '12', '34', '56' ]
```

但同样，我们也可以用正则表达式来做：

```js
console.log('12, 34, 56,78'.split(/,\s*/)) // 数组 [ '12', '34', '56', '78' ]
```

## str.search(regexp)

方法 `str.search(regexp)` 返回第一个匹配项的位置，如果未找到，则返回 `-1`：

```js
let str = "A drop of ink may make a million think";

console.log(str.search(/ink/i)); // 10（第一个匹配位置）
console.log(str.search(/aaa/i)); // -1（没有返回-1）
```

**重要限制：`search` 仅查找第一个匹配项。**

如果需要其他匹配项的位置，则应使用其他方法，例如用 `str.matchAll(regexp)` 查找所有位置。

## str.replace(str|regexp, str|func)

这是用于搜索和替换的通用方法，是最有用的方法之一。它是搜索和替换字符串的瑞士军刀。

我们可以不用正则表达式来搜索和替换子字符串：

```js
// 用冒号替换连字符
console.log('12-34-56'.replace("-", ":")) // 12:34-56
```

不过有一个陷阱。

**当 `replace` 的第一个参数是字符串时，它仅替换第一个匹配项。**

您可以在上面的示例中看到：只有第一个 `"-"` 被 `":"` 替换了。

如要找到所有的连字符，我们不应该用字符串 `"-"`，而应使用带 `g` 标记的正则表达式 `/-/g`：

```js
// 将连字符替换为冒号
console.log('12-34-56'.replace(/-/g, ":"))  // 12:34:56
```

第二个参数是一个替代字符串。我们可以在其中使用特殊字符：

| 符号     | 替换字符串中的操作                                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$$` | 插入一个 "$"。                                                                                                                                      |
| `$&` | 插入匹配的子串。                                                                                                                                    |
| $`       | 插入当前匹配的子串左边的内容。                                                                                                                      |
| $'       | 插入当前匹配的子串右边的内容。                                                                                                                      |
| $n       | 如果 `n` 是一个 1 到 2 位的数字，则插入第 n 个分组的内容，详见 [捕获组](http://www.bnbiye.cn/#/articleDetail/6ee9a830-5711-11ec-96d5-7933aca11ca0) |
| `$`  | 插入带有给定 `name` 的括号内的内容，详见 [捕获组](http://www.bnbiye.cn/#/articleDetail/6ee9a830-5711-11ec-96d5-7933aca11ca0)                       |

1. 替换字符串
   ```js
   let str = 'aa bb cc aa'
   let reg = /aa/g
   let newStr = str.replace(reg, 'hh')
   console.log(newStr) // hh bb cc hh
   ```
2. `$$`
   ```js
   let str = 'aa bb cc aa'
   let reg = /aa/g
   let newStr = str.replace(reg, '$$')
   console.log(newStr) // $ bb cc $
   ```
3. `$&`
   ```js
   let str = 'aa bb cc aa'
   let reg = /aa/g
   let newStr = str.replace(reg, '<<$&>>')
   console.log(newStr) // <<aa>> bb cc <<aa>>
   ```
4. $`
   ```js
   let str = '123aa bb cc 456aa'
   let reg = /aa/g
   let newStr = str.replace(reg, '$`')
   console.log(newStr) // 123123 bb cc 456123aa bb cc 456
   ```
5. $'
   ```js
   let str = 'aabbcc aa123'
   let reg = /aa/g
   let newStr = str.replace(reg, "$'")
   console.log(newStr) // bbcc aa123bbcc 123123
   ```
6. $n
   ```js
   let str = 'aa bb'
   let reg = /(aa)\s(bb)/g
   let newStr = str.replace(reg, '$2_$1')
   console.log(newStr) // bb_aa
   ```
7. `$<name>`
   ```js
   let str = 'aa bb'
   let reg = /(?<first>aa)\s(?<second>bb)/g
   let newStr = str.replace(reg, '$<second>_$<first>')
   console.log(newStr) // bb_aa
   ```

**对于需要“智能”替换的场景，第二个参数可以是一个函数。**

每次匹配都会调用这个函数，并且返回的值将作为替换字符串插入。

该函数 `func(match, p1, p2, ..., pn, offset, input, groups)` 带参数调用：

1. `match` － 匹配项，
2. `p1, p2, ..., pn` － 分组的内容（如有），
3. `offset` － 匹配项的位置，
4. `input` － 源字符串，
5. `groups` － 所指定分组的对象。

如果正则表达式中没有捕获组，则只有 3 个参数：`func(str, offset, input)`。

例如，将所有匹配项都大写：

```js
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

console.log(result); // HTML and CSS
```

按其在字符串中的位置来替换每个匹配项：

```js
console.log("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

在下面的示例中，有两对括号，因此将使用 5 个参数调用替换函数：第一个是完全匹配项，然后是 2 对括号，然后是匹配位置（在示例中未使用）和源字符串：

```js
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

console.log(result); // Smith, John
```

如果有许多组，用 rest 参数（…）可以很方便的访问：

```js
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

console.log(result); // Smith, John
```

```js
let str = "John Smith";

let result = str.replace(/(?<firstname>\w+) (?<lastname>\w+)/, (match, $1, $2, index, input, groups) => {
    console.log(match); // John Smith
    console.log($1); // John
    console.log($2); // Smith
    console.log(index); // 0
    console.log(input); // John Smith
    console.log(groups); // [Object: null prototype] { firstname: 'John', lastname: 'Smith' }
    return `aaa`
});

console.log(result); // aaa
```

或者，如果我们使用的是命名组，则带有它们的 `groups` 对象始终是最后一个对象，因此我们可以这样获得它：

```js
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
    let groups = match.pop();

    return `${groups.surname}, ${groups.name}`;
});

console.log(result); // Smith, John
```

使用函数可以为我们提供终极替代功能，因为它可以获取匹配项的所有信息，可以访问外部变量，可以做任何事。

## regexp.exec()

`regexp.exec(str)` 方法返回字符串 `str` 中的 `regexp` 匹配项。与以前的方法不同，它是在正则表达式而不是字符串上调用的。

根据正则表达式是否带有标志 `g`，它的行为有所不同。

如果没有 `g`，那么 `regexp.exec(str)` 返回的第一个匹配与 `str.match(regexp)` 完全相同。这没什么新的变化。

但是，如果有标记 `g`，那么：

* 调用`regexp.exec(str)` 会返回第一个匹配项，并将紧随其后的位置保存在属性`regexp.lastIndex` 中。
* 下一次同样的调用会从位置`regexp.lastIndex` 开始搜索，返回下一个匹配项，并将其后的位置保存在`regexp.lastIndex` 中。
* …以此类推。
* 如果没有匹配项，则`regexp.exec` 返回`null`，并将`regexp.lastIndex` 重置为`0`。

因此，重复调用会挨个返回所有的匹配项，属性 `regexp.lastIndex` 用来跟踪当前的搜索位置。

过去，在将 `str.matchAll` 方法添加到 `JavaScript` 之前，在循环中是通过调用 `regexp.exec` 来获取分组的所有匹配项：

```js
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
    console.log(`Found ${result[0]} at position ${result.index}`);
    // Found JavaScript at position 11，然后
    // Found javascript at position 33
}
```

这个现在也可以使用，尽管对于较新的浏览器来说，`str.matchAll` 通常更方便。

**我们可以通过手动设置 `lastIndex`，用 `regexp.exec` 从给定位置进行搜索。**

例如：

```js
let str = 'Hello, world!';

let regexp = /\w+/g; // 带有标记 "g"，lastIndex 属性被忽略
regexp.lastIndex = 5; // 从第 5 个位置搜索（从逗号开始）

console.log(regexp.exec(str)); // world
```

如果正则表达式带有标记 `y`，则搜索将精确地在 `regexp.lastIndex` 位置执行，不会再继续了。

让我们将上例中的 `g` 标记替换为 `y`。现在没有找到匹配项了，因为在位置 `5` 处没有单词：

```js
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // 在位置 5 精确查找，是一个逗号, 并不能匹配到\w+ 所以返回null

console.log(regexp.exec(str)); // null
```

这个方法在某些场景下很方便，例如需要用正则表达式从字符串的精确位置来“读取”字符串（而不是其后的某处）。

## regexp.test()

方法 `regexp.test(str)` 查找匹配项，然后返回 `true/false` 表示是否存在。

例如：

```js
let str = "I love JavaScript";

// 这两个测试相同
console.log(/love/i.test(str)); // true
console.log(str.search(/love/i) !== -1); // true
```

一个反例：

```js
let str = "Bla-bla-bla";

console.log(/love/i.test(str)); // false
console.log(str.search(/love/i) !== -1); // false
```

如果正则表达式带有标记 `g`，则 `regexp.test` 从 `regexp.lastIndex` 属性中查找，并更新此属性，就像 `regexp.exec` 一样。

因此，我们可以用它从给定位置进行搜索：

```js
let regexp = /love/gi;

let str = "I love JavaScript";

// 从位置 10 开始：
regexp.lastIndex = 10;
console.log(regexp.test(str)); // false（无匹配）
```

> **相同的全局正则表达式在不同的源字符串上测试可能会失败**
> 
> 如果我们在不同的源字符串上应用相同的全局表达式，可能会出现错误的结果，因为 `regexp.test` 的调用会增加 `regexp.lastIndex` 属性值，因此在另一个字符串中的搜索可能是从非 0 位置开始的。
> 
> 例如，这里我们在同一文本上调用 `regexp.test` 两次，而第二次调用失败了：
> 
> ```js
> let regexp = /javascript/g;  // （新建 regexp：regexp.lastIndex=0)
> 
> console.log(regexp.test("javascript")); // true（现在 regexp.lastIndex=10）
> console.log(regexp.lastIndex); // 10
> console.log(regexp.test("javascript")); // false
> ```
> 
> 这正是因为在第二个测试中 `regexp.lastIndex` 不为零。
> 
> 如要解决这个问题，我们可以在每次搜索之前设置 `regexp.lastIndex = 0`。或者，不调用正则表达式的方法，而是使用字符串方法 `str.match/search/...`，这些方法不用 `lastIndex`。

## 总结

1. str.match(regexp)：
   1. 正则带标志`g`时
      1. 返回一个数组，里面包含所有匹配到的结果
      2. 没有匹配到结果时，返回`null`
   2. 不带标志`g`时
      1. 当没有匹配到结果时，返回`null`
      2. 当匹配到结果时
         1. 返回一个类数组
         2. 第一项是匹配的结果
         3. 第二项是捕获组1匹配的结果
         4. 第三项是捕获组2匹配的结果
         5. ...
         6. 然后是匹配到结果的位置索引`index`
         7. 然后是输入的字符串`input`
         8. 最后是一个可迭代对象`groups`，里面包含了所有命名捕获组匹配到的结果，如果没有命名捕获组，那么这一项就是`undefined`
2. str.matchAll(regexp)：
   1. 对`str.match`的改进方法，当带有标志`g`时，返回的是一个可迭代对象（不再是一个数组了），每一项是匹配到的结果，其格式与`match`方法不带`g`时匹配的结果格式一致。
   2. 如果没有匹配到结果，返回的不再是`null`了，而是返回一个空的可迭代对象。
3. str.split(regexp|subStr)：
   1. 把字符串按照传入的参数，分割为数组
4. str.search(regexp)：
   1. 查找子字符串，如果有返回对应的索引
   2. 如果没有，返回`-1`
   3. 只会匹配到第一个查找到的结果，如果想知道每个匹配字符串的位置，可以使用`str.matchAll()`
5. str.replace(str|regexp, str|fn)：字符串方法里的瑞士军刀，太强大了。
   1. 第二个参数为字符串时：
      1. 普通字符串：表示将匹配到的字符，替换成传入的字符串，如果正则不带标志`g`时，只会替换第一项，如果带了，就会全部替换
      2. `$$`：表示将匹配到的字符串，替换为`$`。
      3. `$&`：表示将匹配到的字符串，替换为自己本身：
         ```js
         let str = 'aa'
         let reg = /\w+/
         // \w+ 匹配到了字符串 aa 
         // $& 代表匹配到的字符串本身
         // 所以 <<$&>> 就是 <<aa>>
         // 最终输出 <<aa>>
         console.log(str.replace(reg, '<<$&>>')) // <<aa>>
         ```
      4. $`：表示将匹配到的字符串，替换为自己左边的内容：
         ```js
         let str = 'aa123bb'
         let reg = /\d+/
         // \d+ 匹配到了字符串 123 
         // $`代表匹配字符串左边的内容 aa
         // 所以 <<$`>> 就是 <<aa>>
         // 最终输出 aa<<aa>>bb
         console.log(str.replace(reg, '<<$`>>')) // aa<<aa>>bb
         ```
      5. `$'`：表示将匹配到的字符串，替换为自己右边的内容：
         ```js
         let str = 'aa123bb'
         let reg = /\d+/
         // \d+ 匹配到了字符串 123 
         // $' 代表匹配字符串右边的内容 bb
         // 所以 <<$`>> 就是 <<bb>>
         // 最终输出 aa<<bb>>bb
         console.log(str.replace(reg, "<<$'>>")) // aa<<bb>>bb
         ```
      6. `$1、$2、... $n`：表示对应的捕获组匹配到的内容，`$1`就代表着捕获组1，以此类推。
         ```js
         let str = 'aa bb'
         let reg = /(\w+)\s(\w+)/
         console.log(str.replace(reg, '$2_$1')) // bb_aa
         ```
      7. `$<name>`：表示对应的命名捕获组匹配到的内容
         ```js
         let str = 'aa bb'
         let reg = /(?<name1>\w+)\s(?<name2>\w+)/
         console.log(str.replace(reg, '$<name2>_$<name1>')) // bb_aa
         ```
   2. 当第二个参数是方法时（非常强大）：参数可以传递一个方法，方法接收如下几个参数
      1. 当有捕获组时
         ```js
         str.replace(reg, (match, $1, $2, ..., index, input, groups) => {
             // math 表示匹配到的内容
             // $1, $2, ..., 表示对应捕获组匹配到的内容
             // index 匹配内容对应的索引
             // input 输入的字符串
             // groups 命名捕获组对应匹配到的内容
             return 'xxx' // 匹配到的内容最终替换成的字符串
         })
         ```
      2. 当没有捕获组时
         ```js
         str.replace(reg, (match, index, input)=>{
             // math 表示匹配的内容
             // index 匹配内容对应的索引
             // input 输入的字符串
             return 'xxx' // 匹配到的内容最终替换成的字符串
         })
         ```
6. regexp.exec()：在指定位置处开始查找
   1. 当不带标志`g`或`y`时，`reg.lastIndex`会被忽略，返回的结果与`str.match`不带`g`表示返回的结果格式一致。
      ```js
      let str = 'aa bb cc'
      let reg = /\w+/
      reg.lastIndex = 2 // 并不会生效，会被忽略
      console.log(reg.lastIndex); // 2
      
      // 设置的lastIndex被忽略了，仍然从索引0开始查找
      console.log(reg.exec(str)) // [ 'aa', index: 0, input: 'aa bb cc', groups: undefined ]
      console.log(reg.lastIndex); // 2
      ```
   2. 当带标志`g`时，每次执行完`exec()`方法后，都会更新对应的`lastIndex`索引值。当执行结果为`null`时，`lastIndex`重新赋值为`0`
      ```js
      let str = 'aa bb cc'
      let reg = /\w+/g
      reg.lastIndex = 2 // 生效了
      console.log(reg.lastIndex); // 2
      
      // 设置的lastIndex生效了，从索引2开始查找，全文检索
      console.log(reg.exec(str)) // [ 'bb', index: 3, input: 'aa bb cc', groups: undefined ]
      
      // 执行完一次后，lastIndex的值被更新了
      console.log(reg.lastIndex); // 5 
      
      // 再次执行
      console.log(reg.exec(str)) // [ 'cc', index: 6, input: 'aa bb cc', groups: undefined ]
      console.log(reg.lastIndex); // 8 
      
      console.log(reg.exec(str)) // null
      // 当结果返回null 时，lastIndex重新赋值为了 0
      console.log(reg.lastIndex) // 0
      ```
   3. 当带标志`y`时，会在指定的`lastIndex`索引处开始检索，并不会全文检索。当执行结果为`null`时，`lastIndex`重新赋值为`0`
      ```js
      let str = 'aa bb cc'
      let reg = /\w+/y
      reg.lastIndex = 2 // 生效了
      console.log(reg.lastIndex); // 2
      
      // 设置的lastIndex生效了，从索引2开始查找，并不会全文检索，只会在当前位置查找
      // 索引2字符是一个空格 不满足 \w+ 所以直接返回null
      console.log(reg.exec(str)) // null
      // 当结果返回null 时，lastIndex重新赋值为了 0
      console.log(reg.lastIndex); // 5
      ```
7. regexp.test()：查找匹配项，返回`true`或`false`
   1. 当设置过`lastIndex`后，会在指定位置处开始检索
   2. 在同一个正则对不同的字符串执行`test()`操作后，每次执行后`lastIndex`会被更新，很有可能会导致结果不准确。如果非要这么用，每次执行完一次`test`操作后，将`lastIndex`重新赋值为`0`。（不建议这么用，可以执行使用`str.search()/str.match()`代替）

## 参考

[https://zh.javascript.info/regexp-methods](https://zh.javascript.info/regexp-methods)

[https://www.jianshu.com/p/31bebd90fd1d](https://www.jianshu.com/p/31bebd90fd1d)
