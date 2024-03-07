## 前言

js中判断两个值是否相等，有两种方式，`==`和`===`，`==`并不是严格相等，会将左右两边的值做类型转换，所以会出现各种莫名其妙的情况。而`===`是严格意义上的相等，会进行类型比较，如果类型不同会直接返回`false`，类型一致了才会去比较值，只有真正的值相等了，才返回`true`。

本篇文章就来彻底弄清楚`==`与`===`的区别。首先来看一些例子，测试一下自己的掌握情况。

### 一个小例子

1. `==`
   ```js
   console.log([10] == 10);                //true
   console.log('10' == 10);                //true
   console.log([] == 0);                   //true
   console.log(true == 1);                 //true
   console.log([] == false);               //true
   console.log(![] == false);              //true
   console.log('' == 0);                   //true
   console.log('' == false);               //true
   console.log(null == false);             //false
   console.log(!null == true);             //true
   console.log(null == undefined);         //true
   
   let a = Symbol(123)
   console.log(a == 'Symbol(123)'); // false
   console.log(a == a); // true
   console.log('[object Object]' == {}); // true
   console.log('1,2,3' == [1, 2, 3]); // true
   console.log('' == []); // true
   ```
2. `===`
   ```js
   console.log(1 === '1'); // false
   console.log(undefined === undefined); // true
   console.log(null === null); // true
   console.log('abc' === 'abc'); // true
   console.log(true === true); // true
   console.log(false === false); // true
   console.log(true === false); // false
   
   let a = Symbol(123)
   console.log(a === Symbol(123)); // false
   console.log(a === a); // true
   
   console.log(NaN === NaN); // false
   console.log(1 === NaN); // false
   console.log(1 === 1); // true
   console.log(0 === -0); // true
   console.log(+0 === -0); // true
   
   console.log([1, 2, 3] === [1, 2, 3]); // false
   console.log({} === {}); // false
   ```

`===`中的例子比较好理解，很容易就说出答案，但是`==`的就蒙圈了，先不管为什么，我们来学习一下它们的比较规则，学习完之后再逐个击破。

## `==`

### 规范

看一下`ECMAScript`对`==`符号的规范是怎么定义的（列的很清晰了）

![image-20211129173756339](http://cdn.qiniu.bnbiye.cn/img/202111291737448.png)

图片来自：[https://262.ecma-international.org/5.1/#sec-11.9.1](https://262.ecma-international.org/5.1/#sec-11.9.1)

### 翻译成中文

比较`x==y`两个值，会返回一个`true`或`false`，比较规则如下：

1. 如果x和y类型相同
   1. 如果x是undefined，返回true
   2. 如果x是null，返回true
   3. 如果x是number，
      1. 如果x是NaN，返回false
      2. 如果y是NaN，返回false
      3. 如果x和y是相同的数值，返回true，不相同就返回false
      4. 如果x是+0，y是-0，返回true
      5. 如果x是-0，y是+0，返回true
      6. 以上都不是时，返回false
   4. 如果x是string，当x和y里的字符都一样时，返回true，不一样就返回false
   5. 如果x是boolean，如果x和y同时为true或者false时，返回true，不一样时返回false
   6. 如果x和y存储着相同对象的引用时，返回true，不同就返回false
2. 如果x是null，y是undefined，返回true
3. 如果x是undefined，y是null，返回true
4. 如果x是number，y是string，把y转换为number再比较
5. 如果x是string，y是number，把x转换为number再比较
6. 如果x是boolean，把x转换为number再比较
7. 如果y是boolean，把y转换为number再比较
8. 如果x是string或者number，y是object，把y转换为基本类型再比较
9. 如果x是object，y是string或者number，把x转换为基本类型再比较
10. 以上都不是，返回false

### 例子

了解完`==`比较的规范后，我们再来看一下这些示例就很清晰了，我们来分析一下：

> 关于类型转换参考另一篇文章：[js中的类型转换](http://www.bnbiye.cn/#/articleDetail/b86f6770-50ee-11ec-96d5-7933aca11ca0)

1. `console.log([10] == 10)`
   ```js
   /*
   	x=[10]，是object，y=10，是number，类型不一样
   	将x转换为基本类型，[10] -> '10'，此时 
   	x='10'，是string，y=10，是number，类型不一样
   	将string转换为number，'10' -> 10，此时
   	x=10，是number，y=10，是number，类型一样
   	10=10，返回true
   */
   console.log([10] == 10);                //true
   ```
2. `console.log('10' == 10)`
   ```js
   /*
   	x='10'，是string，y=10，是number，类型不一样
   	将string转换为number，'10' -> 10，此时
   	x=10，是number，y=10，是number，类型一样
   	10==10，返回true
   */
   console.log('10' == 10);                //true
   ```
3. `console.log([] == 0)`
   ```js
   /*
   	x=[]，是object，y=0，是number，类型不一样
   	将x转换为基本类型，[] -> ''，此时 
   	x=''，是string，y=0，是number，类型不一样
   	将string转换为number，'' -> 0，此时
   	x=0，是number，y=0，是number，类型一样
   	0==0，返回true	
   */
   console.log([] == 0);                   //true
   ```
4. `console.log(true == 1)`
   ```js
   /*
   	x=true，是boolean，y=1，是number，类型不一样
   	将boolean转换为number，true -> 1，此时
   	x=1，是number，y=1，是number，类型一样
   	1==1，返回true	
   */
   console.log(true == 1);                 //true
   ```
5. `console.log([] == false)`
   ```js
   /*
   	x=[]，是object，y=false，是boolean，类型不一样
   	将boolean转换为number，false -> 0，此时 
   	x=[]，是object，y=0，是number，类型不一样
   	将x转换为基本类型，[] -> ''，此时 
   	x=''，是string，y=0，是number，类型不一样
   	将string转换为number，'' -> 0，此时
   	x=0，是number，y=0，是number，类型一样
   	0==0，返回true	
   */
   console.log([] == false);               //true
   ```
6. `console.log([] == false)`
   ```js
   /*
   	x=[]，是object，y=false，是boolean，类型不一样
   	将x转换为基本类型，[] -> ''，此时 
   	x=''，是string，y=false，是boolean，类型不一样
   	将boolean转换为number，false -> 0，此时
   	x=''，是string，y=0，是number，类型不一样
   	将string转换为number，'' -> 0，此时
   	0==0，返回true	
   */
   console.log([] == false);               //true
   ```
7. `console.log(![] == false)`
   ```js
   /*
   	x=![]，y=false，
           ! 非运算符返回值是boolean类型，[]先隐式转换为true，所以!true 就 返回了false
   	x=false，是boolean，y=false，是boolean，类型一样
   	false==false，返回true
   */
   console.log(![] == false);              //true
   ```
8. `console.log('' == 0)`
   ```js
   /*
   	x=''，是string，y=0，是string，类型不一样
   	将string转换为number，'' -> 0，此时
   	x=0，是number，y=0，是number，类型一样
   	0==0，返回true	
   */
   console.log('' == 0);                   //true
   ```
9. `console.log('' == false)`
   ```js
   /*
   	x=''，是string，y=false，是boolean，类型不一样
   	将boolean转换为number，false -> 0，此时
   	x=''，是string，y=0，是number，类型不一样
   	将string转换为number，'' -> 0，此时
   	x=0，是number，y=0，是number，类型一样
   	0==0，返回true	
   */
   console.log('' == false);               //true
   ```
10. `console.log(null == false)`

```js
/*
	null == null 返回true
	null == undefined 返回true
	其它的全部返回false
*/
console.log(null == false);             //false
```

11. `console.log(!null == true)`

```js
/*
	!null 会变为 true
	true == true 返回true
*/
console.log(!null == true);             //true
```

12. `console.log(null == undefined)`

```js
/*
	null == null 返回true
	null == undefined 返回true
	其它的全部返回false
*/
console.log(null == undefined);         //true
```

13. 剩下的自己理解理解

```js
/*
	symbol与任何其它类型==比较都返回false，除了它自己返回true
	{}对象转换为字符串会变为'[object Object]'
	[]数组转换为字符串会变为 ''，空字符串
	[1,2,3]转换为字符串会变为 '1,2,3'
	NaN与任何值比较都会返回false
*/
let a = Symbol(123)
console.log(a == 'Symbol(123)'); // false
console.log(a == a); // true
console.log('[object Object]' == {}); // true
console.log('1,2,3' == [1, 2, 3]); // true
console.log('' == []); // true
console.log(NaN == ''); // false
console.log(NaN == NaN); // false
```

### 小结

`==`其实就是（简化版，自己理解）

1. 当都是引用类型时，比较引用类型的地址，地址相当就相等
2. 当引用类型和基本类型比较时，引用类型转基本类型，然后再去比较
3. 基本类型与基本类型比较，类型相等时，
   
   1. undefind与undefined返回true
   2. null与null返回true
   3. 相等的字符串返回true
   4. 相等的数字返回true
   5. 相等的布尔值返回true
   6. +0与-0返回true
   7. NaN与任何值比较都会返回false
4. 基本类型与基本类型比较，类型不相等时，
   
   1. null与undefined比较返回true（只有`null == null，null == undefined`返回`true`，其余的与`null`做`==`比较的都返回`false`）
   2. 字符串与数字比较，字符串先转为数字，然后再比较
   3. 布尔与字符串比较，布尔先转数字，然后再比较
   4. 字符串与布尔比较，都先转换为数字，然后再比较
   
   （就是优先转换为数字，然后去比较）

> 类型转换参考另一篇文章：[js中的类型转换](http://www.bnbiye.cn/#/articleDetail/b86f6770-50ee-11ec-96d5-7933aca11ca0)

## `===`

### 规范

![image-20211129191331014](http://cdn.qiniu.bnbiye.cn/img/202111291913081.png)

图片来自：[https://262.ecma-international.org/5.1/#sec-11.9.1](https://262.ecma-international.org/5.1/#sec-11.9.1)

### 翻译成中文

比较x===y，返回true或false，规则如下：

1. 如果x和y类型不一样，直接返回false
2. 如果都是undefined，返回true
3. 如果都是null，返回true
4. 如果都是number，
   1. 如果x是NaN，返回false
   2. 如果y是NaN，返回false
   3. 如果是相同的数字，返回true
   4. 如果x是+0，y是-0，返回true
   5. 如果x是-0，y是+0，返回true
   6. 其余的都返回false
5. 如果都是string，相同返回true，不同返回false
6. 如果都是boolean，相同返回true，不同返回false
7. 如果都是object，如果两个对象的引用相同，返回true，不相同返回false

### 例子

```js
// 类型不同，返回false
console.log(1 === '1'); // false

// 都是undefined，返回true
console.log(undefined === undefined); // true

// 都是null，返回true
console.log(null === null); // true

// 都是字符串'abc'，返回true
console.log('abc' === 'abc'); // true

/*
	true === true 返回true
	false === false 返回true
	true === false 返回false
*/
console.log(true === true); // true
console.log(false === false); // true
console.log(true === false); // false

/*
	同一个symbol才会返回true
	不同的就会返回false
*/
let a = Symbol(123)
console.log(a === Symbol(123)); // false
console.log(a === a); // true

/*
	NaN与任何值比较都是false
	+0与-0 返回true
*/
console.log(NaN === NaN); // false
console.log(1 === NaN); // false
console.log(1 === 1); // true
console.log(0 === -0); // true
console.log(+0 === -0); // true

/*
	只有是同一个对象时，才会返回true
*/
console.log([1, 2, 3] === [1, 2, 3]); // false
console.log({} === {}); // false
```

## 总结

==与===的区别如下：

===比较时类型不一致会直接返回false，而==比较时，类型不一致会进行类型转换

> **==的转换规则如下（大致概括）:**
> 
> 1. 都为引用类型时
>    1. 会看它俩是否为同一份引用，引用相同时，返回true，不相同返回false
> 2. 引用类型和基本类型时
>    1. 会先将引用类型转换为基本类型，然后基本类型与基本类型比较
> 3. 基本类型与基本类型
>    1. 当类型相同时
>       1. undefined与undefined比较时，返回true
>       2. null与null比较时，返回true
>       3. string和string比较时，如果字符串全部一致时，返回true，不一致返回false
>       4. number和number比较时，
>          1. 如果有一个是NaN，返回false
>          2. 数值都相等时，返回true，数值不相等，返回false
>          3. +0和-0比较时，返回true
>       5. 当symbol比较时，同一个symbol返回true，不同的返回false
>       6. 当为bigint时，数值一样返回true，数值不同返回false
>    2. 当类型不同时
>       1. undefined与null比较时，返回true
>       2. string与number比较时，string先转换为number再进行比较
>       3. boolean与number比较时，boolean先转换为number再比较
>       4. string与boolean比较时，string和boolean都转换为数字再比较
>          
>          （就是优先转换为number，然后再比较）

> **===的转换规则如下（大致概括）:**
> 
> 1. 类型不同时，直接返回false
> 2. 类型相同时，
>    1. 都为引用类型时，比较它俩的引用地址，相同返回true，不同返回false
>    2. 都为undefined时，相同返回true，不同返回false
>    3. 都为null时，相同返回true，不同返回false
>    4. 都为string时，相同返回true，不同返回false
>    5. 都为number时，
>       1. 如果有一个是NaN时，返回false
>       2. 相同的数值返回true，不同返回false
>       3. +0和-0比较时返回true
>    6. 都为bigint时，相同返回true，不同返回false
>    7. 都为symbol时，同一个symbol返回true，不同的返回false

> tip：js中的类型是如何转换的，参考另一篇文章，[js中的类型转换](http://www.bnbiye.cn/#/articleDetail/b86f6770-50ee-11ec-96d5-7933aca11ca0)

## 参考

[https://juejin.cn/post/6844903456407289869](https://juejin.cn/post/6844903456407289869)

[https://262.ecma-international.org/5.1/#sec-11.9.1](https://262.ecma-international.org/5.1/#sec-11.9.1)
