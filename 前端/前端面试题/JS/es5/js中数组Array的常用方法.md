## 前言

本章来总结一下js中数组`Array`的常用方法，都是基础，测试一下自己的掌握情况。

| 名称          | 功能                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| length        | 返回或设置一个数组中的元素个数。                                                                                                                           |
| concat()      | 合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。                                                                                           |
| copyWithin()  | 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。                                                                               |
| entries()     | 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。                                                                                        |
| every()       | 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。                                                                                 |
| fill()        | 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。                                                                               |
| filter()      | 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。                                                                                                 |
| find()        | 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。                                                                                         |
| findIndex()   | 返回数组中满足提供的测试函数的第一个元素的**索引** 。若没有找到对应元素则返回-1。                                                                    |
| flat()        | 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。                                                               |
| forEach()     | 对数组的每个元素执行一次给定的函数。                                                                                                                       |
| from()        | 对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。                                                                                                 |
| includes()    | 判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。                                                              |
| indexOf()     | 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。                                                                                       |
| isArray()     | 用于确定传递的值是否是一个 Array，如果是返回true，否则返回false。                                                                                          |
| join()        | 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。                           |
| keys()        | 返回一个包含数组中每个索引键的Array Iterator对象。                                                                                                         |
| lastIndexOf() | 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。                                                              |
| map()         | 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。                                                                                 |
| of()          | 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。                                                                                           |
| pop()         | 从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。                                                                                         |
| push()        | 将一个或多个元素添加到数组的末尾，并返回该数组的新长度。                                                                                                   |
| reduce()      | 对数组中的每个元素执行一个由您提供的**reducer** 函数(升序执行)，将其结果汇总为单个返回值。                                                           |
| reverse()     | 将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。                                   |
| shift()       | 从数组中删除**第一个** 元素，并返回该元素的值。此方法更改数组的长度。                                                                                |
| slice()       | 返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝** （包括 `begin`，不包括`end`）。原始数组不会被改变。 |
| some()        | 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。                                                                       |
| sort()        | 对数组的元素进行排序，并返回数组。                                                                                                                         |
| splice()      | 删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。                                                        |
| toString()    | 返回一个字符串，表示指定的数组及其元素。                                                                                                                   |
| unshift()     | 将一个或多个元素添加到数组的**开头** ，并返回该数组的**新长度** (该方法修改原有数组)。                                                         |
| values()      | 返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。                                                                                             |

为了便于记忆，我们做一个归类，一个一个的学习一下。

## Array类的属性和方法

### `Array.length`

1. 获取数组长度
   ```js
   let a = [1, 2, 3]
   console.log(a.length); // 3
   ```
2. 遍历数组
   ```js
   let arr = [1, 2, 3]
   for (let i = 0; i < arr.length; i++) {
       console.log(arr[i]);
   }
   // 1 2 3
   ```
3. 截断数组
   ```js
   let arr = [1, 2, 3]
   arr.length = 1
   console.log(arr); // [1]
   ```

### `Array.Of()`

1. 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
   ```js
   let arr1 = Array.of(7)
   console.log(arr1); // [7]
   let arr2 = Array.of(7, 8, 9)
   console.log(arr2); // [ 7, 8, 9 ]
   ```
2. `Array(7)`与`Array.of(7)`的区别
   ```js
   let arr1 = Array.of(7)
   console.log(arr1); // [7]
   let arr3 = Array(7)
   console.log(arr3); // [ <7 empty items> ] [undefined,...,undefined]
   ```

### `Array.from()`

将一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

1. 从`String` 生成数组
2. 从`Set` 生成数组
3. 从`Map` 生成数组
4. 从 类数组对象`arguments` 生成数组

```js
let str = 'foo'
let set = new Set(['aa', 'bb', 'cc', 'aa'])
let map = new Map([[1, 'aa'], [2, 'bb'], [3, 'cc']])

console.log(Array.from(str)); // [ 'f', 'o', 'o' ]
console.log(Array.from(set)); // [ 'aa', 'bb', 'cc' ]
console.log(Array.from(map)); // [ [ 1, 'aa' ], [ 2, 'bb' ], [ 3, 'cc' ] ]

function fn() {
    console.log(Array.from(arguments)); // [ 1, 2, 3, 4, 5 ]
}
fn(1, 2, 3, 4, 5)
```

### `Array.isArray()`

确定传递的值是否是一个`Array`

```js
Array.isArray([1, 2, 3]); // true
Array.isArray({foo: 123}); // false
Array.isArray("foobar"); // false
Array.isArray(undefined); // false
```

## Array原型上的方法

### 数组元素添加和删除

#### push、pop

1. push() 在数组末尾添加元素，并返回该数组的新长度。
   ```js
   let arr = [1, 2, 3]
   console.log(arr.length); // 3
   console.log(arr.push('aa')); // 4
   console.log(arr); // [ 1, 2, 3, 'aa' ]
   ```
2. pop() 删除数组最后一个元素，返回该元素的值。此方法更改数组的长度。
   ```js
   let arr = [1, 2, 'aa']
   console.log(arr.length); // 3
   console.log(arr.pop()); // aa
   console.log(arr); // [ 1, 2 ]
   ```

#### unshift、shift

1. unshift() 在数组开头添加元素，返回新长度。此方法更改原数组。
   ```js
   let arr = [1, 2, 'aa']
   console.log(arr.unshift('bb')); // 4
   console.log(arr); // [ 'bb', 1, 2, 'aa' ]
   ```
2. shift() 删除数组第一个元素，返回该元素的值。此方法更改原数组。
   ```js
   let arr = [1, 2, 'aa']
   console.log(arr.shift()); // 1
   console.log(arr); // [ 2, 'aa' ]
   ```

#### splice

很强大的一个方法，可以删除数组中的元素，还可以添加元素，会改变原数组。

`array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`，表示从索引`deleteCount`表示删除多少个元素

1. 删除元素
   ```js
   let arr1 = ['aa', 'bb', 'cc', 'dd']
   console.log(arr1.splice(1)); // [ 'bb', 'cc', 'dd' ]，表示索引1开始，包括索引1，后面的全给删除
   console.log(arr1); // [ 'aa' ]
   
   let arr2 = ['aa', 'bb', 'cc', 'dd']
   console.log(arr2.splice(1, 2)); // [ 'bb', 'cc' ]，表示索引1开始，包括索引1，删除2个
   console.log(arr2); // [ 'aa', 'dd' ]
   ```
2. 添加元素
   ```js
   let arr3 = ['aa', 'bb', 'cc', 'dd']
   console.log(arr3.splice(1, 2, 'item1', 'item2')); // [ 'bb', 'cc' ]，表示索引1开始，包括索引1，删除2个，然后从删除的地方新添加 item1，item2
   console.log(arr3); // [ 'aa', 'item1', 'item2', 'dd' ]
   
   let arr4 = ['aa', 'bb', 'cc', 'dd']
   console.log(arr4.splice(1, 0, 'item1', 'item2')); // []，表示索引1开始，包括索引1，删除0个，然后从删除的地方新添加 item1，item2
   console.log(arr4); // [ 'aa', 'item1', 'item2', 'bb', 'cc', 'dd' ]
   ```

#### fill

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。一般用来初始化数组，该方法会改变原数组，返回值就是改变后的原数组。

1. 初始化数组
   ```js
   let arr = new Array(3)
   console.log(arr); // [ <3 empty items> ]
   arr.fill('aa')
   console.log(arr); // [ 'aa', 'aa', 'aa' ]
   ```
2. 填充一部分值
   ```js
   let arr = ['aa', 'bb', 'cc', 'dd', 'ee']
   console.log(arr.fill(1, 0, 2)); // [ 1, 1, 'cc', 'dd', 'ee' ]，从索引0填充到索引2，不包括2
   console.log(arr); // [ 1, 1, 'cc', 'dd', 'ee' ]
   ```

#### copyWithin

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

```js
let arr1 = ['aa', 'bb', 'cc', 'dd', 'ee']
console.log(arr1.copyWithin(0, 3)); // [ 'dd', 'ee', 'cc', 'dd', 'ee' ]，表示，从索引3往后的值，按顺序从索引0开始复制，原数组长度不变
console.log(arr1); // [ 'dd', 'ee', 'cc', 'dd', 'ee' ] 原数组长度不变，但数组被改变了

let arr2 = ['aa', 'bb', 'cc', 'dd', 'ee']
console.log(arr2.copyWithin(0, 1, 3)); // ['bb', 'cc', 'cc', 'dd', 'ee']，表示，从索引1，到索引3（不包含索引3）的值，按顺序从索引0开始复制
```

### 数组遍历

#### forEach、map、filter

1. forEach() 对数组的每个元素执行一次给定的函数。
   ```js
   let arr1 = [1, 2, 3, 4, 5]
   arr1.forEach((item, index, array) => {
       console.log(`${item}--${index}`);
   });
   // 1--0
   // 2--1
   // 3--2
   // 4--3
   // 5--4
   //参数 array是原数组
   ```
2. map() 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
   ```js
   let arr = [1, 2, 3, 4, 5]
   let newArr = arr.map((item, index, array) => {
       return item > 2
   });
   console.log(newArr); // [ false, false, true, true, true ]
   console.log(arr); // [ 1, 2, 3, 4, 5 ]
   ```
3. filter() 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
   ```js
   let arr = [1, 2, 3, 4, 5]
   let newArr = arr.filter((item, index, array) => {
       return item > 2
   });
   console.log(newArr); // [ 3, 4, 5 ]
   console.log(arr); // [ 1, 2, 3, 4, 5 ]
   ```

#### some、every

1. some() 测试数组中是不是至少有1个元素通过了被提供的函数测试。返回true或false
   ```js
   let arr = [1, 2, 3, 4, 5]
   console.log(arr.some(item => item > 4)); // true
   console.log(arr.some(item => item > 5)); // false
   console.log([].some(item => item > 4)); // false 空数组任何情况都会返回false
   ```
2. every() 测试一个数组内的所有元素是否都能通过某个指定函数的测试。返回true或false
   ```js
   let arr = [1, 2, 3, 4, 5]
   console.log(arr.every(item => item > 4)); // false
   console.log(arr.every(item => item > 0)); // true
   console.log([].every(item => item > 4)); // true 空数组任何情况都会返回 true
   ```

#### find、findIndex、indexOf、lastIndexOf、includes

1. find() 返回数组中满足提供的测试函数的第一个元素的值，没有的话就返回`undefined`
2. findIndex() 返回数组中满足提供的测试函数的第一个元素的索引，没有就返回`-1`
3. indexOf() 返回在数组中可以找到一个**给定元素** 的第一个索引，没有的话就返回`-1`
4. lastIndexOf() 从后往前找，返回第一个找到的索引，没有就返回`-1`
5. includes() 判断一个数组是否包含一个指定的值，返回`true`或`false`

```js
console.log([1, 2, 3, 4].find(item => item === 'a')); // undefined 没有就返回undefined
console.log([1, 2, 3, 4].find(item => item > 1)); // 2 返回第一个匹配的值

console.log([1, 2, 3, 4].findIndex(item => item === 'a')); // -1 没有就返回 -1
console.log([1, 2, 3, 4].findIndex(item => item > 1)); // 1 返回第一个匹配值的索引

console.log([1, 2, 3, 4].indexOf(5)); // -1 没有就返回 -1
console.log([1, 2, 3, 4].indexOf(4)); // 3 返回第一个匹配值的索引

console.log([1, 2, 3, 4].lastIndexOf(5)); // -1 没有就返回 -1
console.log([1, 2, 3, 4].lastIndexOf(4)); // 3 返回第一个匹配值的索引

console.log([1, 2, 3, 4].includes(5)); // false
console.log([1, 2, 3, 4].includes(4)); // true
```

#### keys、values、entries

1. keys() 返回一个包含数组中每个索引键的`Array Iterator`对象。
   ```js
   let arr = ['aa', , 'cc']
   console.log(arr); // [ 'aa', <1 empty item>, 'cc' ]，实际就是[ 'aa', undefined, 'cc' ] 
   
   let iterator = arr.keys() // 返回一个迭代器
   for (const key of iterator) {
       console.log(key);
   }
   // 0
   // 1
   // 2
   
   /* Object.keys() 与 Array.keys()的 区别 */
   let keys1 = Object.keys(arr)
   console.log(keys1); // [ '0', '2' ]
   let keys2 = [...arr.keys()]
   console.log(keys2); // [ 0, 1, 2 ]
   /* 索引迭代器会包含那些没有对应元素的索引 */
   ```
2. values() 返回一个新的 `Array Iterator` 对象，该对象包含数组每一项的值。
   ```js
   let arr1 = ['aa', 'bb', 'cc']
   let iterator = arr1.values()
   
   for (const value of iterator) {
       console.log(value);
   }
   // aa
   // bb
   // cc
   ```
3. entries() 返回一个新的`Array Iterator`对象，该对象包含数组中每个索引的键/值对。
   ```js
   let arr1 = ['aa', 'bb', 'cc']
   let iterator1 = arr1.entries()
   
   console.log(iterator1.next()); // { value: [ 0, 'aa' ], done: false }
   console.log(iterator1.next()); // { value: [ 1, 'bb' ], done: false }
   console.log(iterator1.next()); // { value: [ 2, 'cc' ], done: false }
   console.log(iterator1.next()); // { value: undefined, done: true }
   
   let arr2 = ['aa', 'bb', 'cc']
   let iterator2 = arr2.entries()
   for (const value of iterator2) {
       console.log(value);
   }
   // [ 0, 'aa' ]
   // [ 1, 'bb' ]
   // [ 2, 'cc' ]
   ```

#### reduce、reduceRight

1. reduce() 比较厉害的一个方法，对数组中的每个元素执行一个由您提供的`reducer`函数(升序执行)，将其结果汇总为单个返回值。
   ```js
   /* 数组求和 start */
   let arr1 = [5, 6, 7, 8]
   let result1 = arr1.reduce((prev, next, index) => {
       console.log(`${prev} ${next} ${index}`);
       // 0 5 0
       // 5 6 1
       // 11 7 2
       // 18 8 3
       return prev + next
   }, 0)
   console.log(result1); // 26
   /* 数组求和 end */
   
   
   /* 将二维数组转换为一维数组 start */
   let arr2 = [[0, 1], [2, 3], [4, 5]]
   let result2 = arr2.reduce((prev, next, index) => {
       console.log(`${prev} ${next} ${index}`);
       //     0,1      0
       // 0,1 2,3      1
       // 0,1,2,3 4,5  2
       return [...prev, ...next]
   }, [])
   console.log(result2); // [ 0, 1, 2, 3, 4, 5 ]
   /* 将二维数组转换为一维数组 end */
   ```
2. reduceRight() 从右到左执行，与reduce()一样，只不过反着来。
   ```js
   const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
       (accumulator, currentValue) => accumulator.concat(currentValue)
   );
   console.log(array1); // [ 4, 5, 2, 3, 0, 1 ]
   ```

### 功能性方法

#### concat、slice

1. concat() 合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
   ```js
   let arr1 = ['aa', 'bb', 'cc',]
   let arr2 = ['dd', 'ee']
   console.log(arr1.concat(arr2)); // [ 'aa', 'bb', 'cc', 'dd', 'ee' ]
   console.log(arr1.concat(arr2, [1, 2])); // [ 'aa', 'bb', 'cc', 'dd', 'ee', 1, 2 ]
   ```
2. slice() 浅拷贝数组中的一段值出来到新数组中，原数组不会改变。
   ```js
   let arr1 = ['aa', 'bb', 'cc', 'dd']
   console.log(arr1.slice(1)); // [ 'bb', 'cc', 'dd' ]，表示从索引 1开始，一直拷贝到最后
   console.log(arr1.slice(1, 2)); // [ 'bb']，表示从索引 1开始，拷贝到索引2（不包含索引2）
   console.log(arr1.slice(-2)); // [ 'cc', 'dd' ]，表示从数组的倒数第二个，一直拷贝到数组的最后
   console.log(arr1.slice(-2, -1)); // [ 'cc' ]，表示从数组的倒数第二个，一直拷贝到数组的倒数第一个（不包含倒数第一个）
   console.log(arr1.slice(1, -1)); // [ 'bb', 'cc' ]，表示从索引1开始，一直拷贝到数组的倒数第一个（不包含倒数第一个）
   ```

#### reverse

将数组中元素的位置颠倒，并返回该数组。会改变原数组。

```js
let arr1 = ['aa', 'bb', 'cc', 'dd']
console.log(arr1.reverse()); // [ 'dd', 'cc', 'bb', 'aa' ]
console.log(arr1); // [ 'dd', 'cc', 'bb', 'aa' ]
```

#### join

将一个数组（或一个`类数组对象`）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```js
let arr1 = ['aa', 'bb', 'cc', 'dd']
console.log(arr1.join()); // aa,bb,cc,dd
console.log(arr1.join('-')); // aa-bb-cc-dd
console.log(arr1.join('')); // aabbccdd
console.log(arr1); // [ 'aa', 'bb', 'cc', 'dd' ]
```

#### flat、flatMap

1. flat() 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。扁平化数组
   ```js
   let arr1 = [1, 2, [3, 4]]
   console.log(arr1.flat()); // [ 1, 2, 3, 4 ] 默认是1层
   console.log(arr1.flat(1)); // [ 1, 2, 3, 4 ] 
   console.log(arr1); // [ 1, 2, [ 3, 4 ] ] 不会改变原数组
   
   let arr2 = [1, 2, [3, 4], [5, [6, 7]]]
   console.log(arr2.flat(1)); // [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
   console.log(arr2.flat(2)); // [ 1, 2, 3, 4, 5, 6, 7 ]
   ```
2. flatMap() 与flat(1)基本相同，不过它可以传个函数，类似于执行了一次map操作。
   ```js
   let arr1 = [1, 2, 3, 4]
   
   let arr2 = arr1.map(x => [x * 2])
   console.log(arr2); // [ [ 2 ], [ 4 ], [ 6 ], [ 8 ] ]
   
   let arr3 = arr1.flatMap(x => [x * 2])
   console.log(arr3); // [ 2, 4, 6, 8 ]
   
   // flatMap只会flat(1)
   let arr4 = arr1.flatMap(x => [[x * 2]])
   console.log(arr4); // [ [ 2 ], [ 4 ], [ 6 ], [ 8 ] ]
   ```

## 总结

1. 数组类的属性和方法
   `Array.length`、`Array.of()`、`Array.from()`、`Array.isArray()`
2. 数组原型上的方法
   1. 元素的添加和删除
      `push()`、` pop()`
      `unshift()` 、`shift()`
      `splice()` 、`fill()`
      `copyWithin()`
   2. 数组遍历
      `forEach()` 、`map()` 、`filter() `
      `some()` 、`every()`
      `find()`、 `findIndex()`、 `indexOf()`、 `lastIndexOf()`、 `includes()`
      `keys()`、 `values()`、 `entries()`
      `reduce()`、 `reduceRight()`
   3. 功能性方法
      `concat()`、 `slice()`
      `reverse()`
      `join()`
      `flat()` 、`flatMap()`

## 参考

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
