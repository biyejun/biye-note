## 前言

在js的运算中，经常涉及到数据类型的转换，有时候是显示转换，有时是隐式转换，本章就来捋一捋各种数据类型之间的转换规则。先看一道题：

```js
let result = 100 + true + 21.2 + null + undefined + "cheny" + [] + null + 9 + false;
// result应该是？
```

你知道最终的答案吗？

最终会输出`'NaNchenynull9false'`，题目考察的知识点是数据类型隐式转换，想要做对这道题，我们必须了解 JavaScript 在转换的时候，会遵循哪些规则。

### 例子分析

上面的例子我们来一点点的分析，从左往右一点点的看（先来看为什么得到这个结果，具体的细节先不关注）：

1. `100 + true`的结果是什么？
   这里的`true`会被隐式地转换为数字`1`，所以得到的结果为`101`
2. `101 + 21.2 + null`的结果是什么？
   `101 + 21.2`做正常的加法，得到`122.2`，`null`被隐式地转换为数字`0`，所以最终的结果是`122.2`
3. `122.2 + undefined`的结果是什么？
   `undefined`会尝试去转换为数字与`122.2`做加法，但是`undefined`无法转换为数字，会被隐式的转换为`NaN`，任何数字与`NaN`做加法都会返回`NaN`，所以最终的结果是`NaN`
4. `NaN + "cheny"`的结果是什么？
   右侧是字符串`"cheny"`，所以左侧的`NaN`会被隐式的转换为字符串`"NaN"`，最后的结果是字符串拼接的结果，`"NaNcheny"`
5. `"NaNcheny" + [] `的结果是什么？
   `[]`空数组会被隐士的转换为空字符串`''`，所以最终的结果仍为，`"NaNcheny"`
6. `"NaNcheny" + null `
   `null`会隐式的转换为字符串`"null"`，所以最终的结果为，`"NaNchenynull"`
7. `"NaNchenynull" + 9 + false`
   数字`9`会被隐式的转换为字符串`"9"`，布尔`fasle`也会被隐式的转换为字符串`"false"`，所以最终的结果为，`"NaNchenynull9false"`

所以输出的最终结果为：`"NaNchenynull9false"`。

## 基本类型之间的转换

### 字符串string

基本类型转换为字符串是最明显的，我们可以使用`String(value)`显示的将一个值转换为字符串，比如：

```js
let value = true;
console.log(typeof value); // boolean

value = String(value); // 现在，值是一个字符串形式的 "true"
console.log(typeof value); // string
```

当在做加法运算时，如果左侧是一个字符串，右侧不是字符串时，会隐式的将右侧的值转换为字符串做拼接，比如

```js
let str = 'abc' + true
console.log(str) // abctrue
console.log(typeof str); // string
```

#### 小结

基本类型转`string`类型是比较明显的

1. undefined ➡ string
   ```js
   // undefined -> "undefined"
   ```
2. null ➡ string
   ```js
   // null -> "null"
   ```
3. number ➡ string
   ```js
   // 123 -> "123"
   // 5.6 -> "5.6"
   // 0 -> "0"
   // -567 -> "-567"
   ```
4. bigint ➡ string
   ```js
   // 123n -> "123"
   // 5.6n -> "5.6"
   // 0n -> "0"
   // -567n -> "-567"
   ```
5. boolean ➡ string
   ```js
   // true -> "true"
   // false -> "false"
   ```
6. symbol ➡ string
   ```js
   // Symbol() -> "Symbol()"
   // Symbol(123) -> "Symbol(123)"
   // Symbol('123') -> "Symbol('123')"
   ```

### 数字number

在算术函数和表达式中，会自动进行 number 类型转换。

比如，当把除法 `/` 用于非 number 类型：

```js
let a = "6" / "2"
console.log(a); // 3
console.log(typeof a); // number

let b = "abc" / "2"
console.log(b); // NaN
```

我们也可以使用 `Number(value)` 显式地将这个 `value` 转换为 number 类型。

```js
let str = "123";
console.log(typeof str); // string

let num = Number(str); // 变成 number 类型 123

console.log(typeof num); // number
```

当我们从 string 类型源（如文本表单）中读取一个值，但期望输入一个数字时，通常需要进行显式转换。

如果该字符串不是一个有效的数字，转换的结果会是 `NaN`。例如：

```js
let age = Number("an arbitrary string instead of a number");

console.log(age); // NaN，转换失败
```

#### 小结

基本类型转`number`类型：

1. undefined ➡ number
   
   ```js
   // undefined -> NaN
   ```
2. null ➡ number
   
   ```js
   // null -> 0
   ```
3. string➡ number
   
   ```js
   // "" -> 0
   // "   " -> 0
   // " 123" -> 123
   // " 123 " -> 123
   // " 123 4" -> NaN
   // " 123a" -> NaN
   ```
   
   去掉首尾空格后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 `0`。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 `NaN`。
4. bigint ➡ number
   
   ```js
   // 123n -> 123
   // 5.6n -> 5.6
   // 0n -> 0
   // -567n -> -567
   ```
   
   注意：number的取值范围在`(-(2^53), 2^53)`之间，如果`bigint`的值在这个范围之外时转换为`number`，多余的位会被截断，因此我们应该谨慎进行此类转换，比如：
   
   ```js
   // 9007199254740992  2^53
   // 900719925474099222n
   // 900719925474099200
   // Number(900719925474099222n) -> 900719925474099200
   ```
5. boolean ➡ number
   
   ```js
   // true -> 1
   // false -> 0
   ```
6. symbol ➡ number
   symbol类型无法转换位number，会报错。
   
   ```js
   // Number(Symbol()) -> Uncaught TypeError: Cannot convert a Symbol value to a number
   ```

> ?请注意 `null` 和 `undefined` 在这有点不同：`null` 变成数字 `0`，`undefined` 变成 `NaN`。

### 布尔boolean

布尔（boolean）类型转换是最简单的一个。

它发生在逻辑运算中（稍后我们将进行条件判断和其他类似的东西），但是也可以通过调用 Boolean(value) 显式地进行转换。

转换规则如下：

* 直观上为“空”的值（如`0`、空字符串、`null`、`undefined` 和`NaN`）将变为`false`。
* 其他值变成`true`。

比如：

```js
console.log( Boolean(1) ); // true
console.log( Boolean(0) ); // false

console.log( Boolean("hello") ); // true
console.log( Boolean("") ); // false
```

> ?**请注意：包含 0 的字符串** `"0"` **是** `true`
> 
> ```js
> console.log( Boolean("0") ); // true
> console.log( Boolean(" ") ); // 空白，也是 true（任何非空字符串都是 true）
> ```

#### 小结

基本类型转`boolean`类型：

1. undefined ➡ boolean
   
   ```js
   // undefined -> false
   ```
2. null ➡ boolean
   
   ```js
   // null -> false
   ```
3. string➡ boolean
   
   ```js
   // "" -> false
   // " " -> true
   // "0" -> true
   ```
4. number➡ boolean
   
   ```js
   // 0 -> false
   // 1 -> true
   // 2 -> true
   // NaN -> false
   ```
   
   除了数值`0`转换位`boolean`时为`false`，其它`number`都为`true`，另外特殊记忆一下`NaN`，它变布尔时也返回`false`。
5. bigint➡ boolean
   
   ```js
   // 0n -> false
   // 1n -> true
   // 2n -> true
   ```
6. symbol ➡ number
   
   ```js
   // Symbol() -> true
   // Symbol(123) -> true
   ```
   
   `symbol`类型转`boolean`都为`true`

## 对象到原始值的转换

### 转换规则

#### Symbol.toPrimitive

对象到原始类型的转换其实跟它的`Symbol.toPrimitive`方法有关，该方法接收一个形参`hint`，有三种可能情况

1. hint === string
   当期望得到的值是一个字符串时，传入`Symbol.toPrimitive`方法形参`hint`的值就为`string`。
   比如：`alert(obj)`，会默认的隐式转换`obj`为字符串。或者将对象作为属性键，`anotherObj[obj] = 123`（因为对象的属性值只能为字符串或者`symbol`，当对象作为一个个属性时，会隐式转换为字符串）。
   
   ```js
   // 输出
   alert(obj);
   
   // 将对象作为属性键
   anotherObj[obj] = 123;
   ```
2. hint === number
   当期望得到的值是一个数字时，传入`Symbol.toPrimitive`方法形参`hint`的值就为`number`。
   比如：显示转换为某个对象为`number`，`Number(obj)`，或者数学运算`+obj`，将`obj`转换为`number`。再或者`> <`对对象进行比较时。
   
   ```js
   // 显式转换
   let num = Number(obj);
   
   // 数学运算（除了二元加法）
   let n = +obj; // 一元加法
   let delta = date1 - date2;
   
   // 小于/大于的比较
   let greater = user1 > user2;
   ```
3. hint === default
   当期望得到的值不确定时，传入`Symbol.toPrimitive`方法形参`hint`的值就为`default`。
   比如：`+`运算符可以作为数值相加，也可以作为字符串拼接，`obj + obj`。另外在做`==`比较时，也会做类型转换，如果对象被用于与字符串、数字、或者`Symbol`比较时，到底进行哪种转换也不确定，因此此时的`hint`也是`default`。
   
   ```js
   // 二元加法使用默认 hint
   let total = obj1 + obj2;
   
   // obj == number 使用默认 hint
   if (user == 1) { ... };
   ```
   
   像 `<` 和 `>` 这样的小于/大于比较运算符，也可以同时用于字符串和数字。不过，它们使用 “number” hint，而不是 “default”。这是历史原因。实际上，我们没有必要记住这些奇特的细节，除了一种情况（`Date` 对象）之外，所有内建对象都以和 `"number"` 相同的方式实现 `"default"` 转换。我们也可以这样做。

> 注意：没有`hint === boolean`的情况，所有对象在转换为`boolean`类型时，都会返回`true`
> 
> 如果我们将 `"default"` 和 `"number"` 视为相同，就像大多数内建函数一样，那么就只有两种转换了。

**为了进行转换，JavaScript 尝试查找并调用三个对象方法：**

1. 调用`obj[Symbol.toPrimitive](hint)` —— 带有 symbol 键`Symbol.toPrimitive`（系统 symbol）的方法，如果这个方法存在的话，
2. 否则，如果 hint 是`"string"` —— 尝试`obj.toString()` 和`obj.valueOf()`，无论哪个存在。
3. 否则，如果 hint 是`"number"` 或`"default"` —— 尝试`obj.valueOf()` 和`obj.toString()`，无论哪个存在。

##### 一个例子

```js
let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// 转换演示：
// hint string
console.log(String(user)); // hint: string -> {name: "John"}
// hint number
console.log(+user); // hint: number -> 1000
// hint default
console.log(user + 500); // hint: default -> 1500
```

上述例子中，有个对象`user`，手动实现了它的`Symbol.toPrimitive`方法，

1. `String(user)`，显示的将`user`转换为字符串，所以`hint === 'string'`，调用`Symbol.toPrimitive`方法，最终返回字符串`{name: 'John'}`
2. `+user`，隐式地将转换转换为`number`，所以`hint === 'number'`，调用`Symbol.toPrimitive`方法，返回`this.money`，所以输出数值`1000`
3. `user + 500`，并不知道`user`的期望值，所以`hint === 'default'`，调用`Symbol.toPrimitive`方法，返回`this.money`，所以输出数值`1500`

#### toString/valueOf

那么，假如在上古时代，没有`Symbol`时，对象是按什么规则转换成原始类型的呢？其实是通过对象的两个方法实现转换的。`toString()和valueOf()`。

如果没有 `Symbol.toPrimitive`，那么 JavaScript 将尝试找到它们，并且按照下面的顺序进行尝试：

* 对于 “string” hint，`toString -> valueOf`。
* 其他情况，`valueOf -> toString`。

> 注意：这些方法必须返回一个原始值。如果 `toString` 或 `valueOf` 返回了一个对象，那么返回值会被忽略。

默认情况下，普通对象具有 `toString` 和 `valueOf` 方法：

* `toString` 方法返回一个字符串`"[object Object]"`。
* `valueOf` 方法返回对象自身。

比如：

```js
let user = { name: "John" };

console.log(user.toString()); // [object Object]
console.log(String(user)); // [object Object]
console.log(user.valueOf() === user); // true
```

因为默认的`valueOf`返回的就是对象本身，所以我们可以忽略它，具体是为什么，那就是历史原因，咱也不知道，可以假装它不存在就行了。

##### 一个小例子

```js
let user = {
    name: "John",
    money: 1000,

    // 对于 hint="string"
    toString() {
        return `{name: "${this.name}"}`;
    },

    // 对于 hint="number" 或 "default"
    valueOf() {
        return this.money;
    }

};

// hint string
console.log(String(user)); // toString -> {name: "John"}
// hint number
console.log(+user); // valueOf -> 1000
// hint default
console.log(user + 500); // valueOf -> 1500
```

上面的找个例子中，并没有实现它的`Symbol.toPrimitive`，而是实现了它的`toString()和valueOf()`，所以，

1. `String(user)`，当打印它的值时，显示转换为字符串，因此转换顺序为先`toString`，然后`valueOf`，调用`toString()`时，返回了基本类型`string`，其值为`'{name: John}'`
   > 这里你可以尝试着将`toString`返回一个对象试试，最终会被忽略，走`valueOf`的返回值`1000`
2. `+user`，隐式转换为`number`，先走`valueOf()`，再走`toString()`，因为`valueOf()`有原始类型的返回值`1000`，所以直接返回`1000`
3. `user + 500`，并不知道需要将`user`转换为那种值，所以仍然先走`valueOf()`，再走`toString()`，因为`valueOf()`有原始类型的返回值`1000`，所以直接返回`1000`

> 通常我们希望有一个“全能”的地方来处理所有原始转换。在这种情况下，我们可以只实现 `toString`，就像这样：
> 
> ```js
> let user = {
>   name: "John",
> 
>   toString() {
>     return this.name;
>   }
> };
> 
> console.log(String(user)); // toString -> John
> console.log(user + 500); // toString -> John500
> ```

#### 返回类型

关于所有原始转换方法，有一个重要的点需要知道，就是它们不一定会返回 “hint” 的原始值。

没有限制 `toString()` 是否返回字符串，或 `Symbol.toPrimitive` 方法是否为 hint “number” 返回数字。

唯一强制性的事情是：这些方法必须返回一个原始值，而不是对象。

> ❗**历史原因**
> 
> 由于历史原因，如果 `toString` 或 `valueOf` 返回一个对象，则不会出现 error，但是这种值会被忽略（就像这种方法根本不存在）。这是因为在 JavaScript 语言发展初期，没有很好的 “error” 的概念。
> 
> 相反，`Symbol.toPrimitive` **必须** 返回一个原始值，否则就会出现 error。

#### 进一步的转换

我们知道，许多运算符和函数执行类型转换，例如乘法 `*` 将操作数转换为数字。

如果我们将对象作为参数传递，则会出现两个阶段：

1. 对象被转换为原始值（通过前面我们描述的规则）。
2. 如果生成的原始值的类型不正确，则继续进行转换。

例如：

```js
let obj = {
  // toString 在没有其他方法的情况下处理所有转换
  toString() {
    return "2";
  }
};

console.log(obj * 2); // 4，对象被转换为原始值字符串 "2"，之后它被乘法转换为数字 2。
```

1. 乘法`obj * 2` 首先将对象转换为原始值（字符串 “2”）。
2. 之后`"2" * 2` 变为`2 * 2`（字符串被转换为数字）。

二元加法在同样的情况下会将其连接成字符串，因为它更愿意接受字符串：

```js
let obj = {
  toString() {
    return "2";
  }
};

console.log(obj + 2); // 22（"2" + 2）被转换为原始值字符串 => 级联
```

### 一些小例子

#### 例子1：对象转`string`

```js
// String([]) === ''
// String(['']) === ''
// String([1,2,3]) === '1,2,3'
// String([1,,3]) === '1,,3'
// String([1,undefined,3]) === '1,,3'
// String([1,null,3]) === '1,,3'
// String([1,'',3]) === '1,,3'

// String({}) === '[object Object]'
// String({name: 'John'}) === '[object Object]'
```

#### 例子2 对象转`number`

其实也是先转成`string`，然后通过`string`转`number`

```js
console.log(Number([])); // 0
console.log(Number([''])); // 0
console.log(Number([' '])); // 0
console.log(Number([1, 2, 3])); // NaN

console.log(Number({})) // NaN
```

## 总结

js中有显示类型转换和隐式类型转换

1. 显示类型转换：比如`String(value)、Number(value)、Boolean(value)`等显示的将目标值转换为期望的类型。
2. 隐式类型转换：比如js中的一些运算，`'abc' + 123`，会隐式的将`123`转换为字符串`'123'`，然后再进行字符串拼接。

类型转换规则

1. 基本类型之间的转换
   
   1. 转换为`string`
      比较简单，`true->'true'`、`0->'0'`、`undefined=>'undefined'、Symbol(123)->'Symbol(123)'`等
   2. 转换为`number`
      字符串转`number`时，会去除两边的空格，然后看中间的值是否可以转换成`number`，如果去除完前后的空格后为空字符串，那就转换为`0`，如果不能转换为数值，就转换为`NaN`。
      > 注意：`bigint`转`number`时要注意下精度，如果超出了`number`的存储范围，会被截断一部分。`numer`的取值返回在`(-2^53, 2^53)`之间。
      > 
      > `symbol`类型无法转换为`number`。
      > 
      > `boolean`的`true`变`1`，`false`变`0`。
      > 
      > 另外需要特殊记一下`undefined`和`null`，`undefined`会转换成`NaN`，`null`会变为`0`
   3. 转换为` boolean`
      `undefined、null、0、''、NaN`变`boolean`时为`false`，其余的都为`true`。
2. 对象到原始值之间的转换
   转换规则如下：
   
   1. 有`Symbol.toPrimitive`方法时，按照该方法转换
      
      1. 当需要转换为`string`时，`hint === string`
      2. 当需要转换为`number`时， `hint === number`
      3. 当需要转换的类型值不确定时，`hint === default`
         > `hint === number`与 `hint === default`其实可以看成相同的一类，
         > 
         > 也就是说如果不走`hint === string`的转换逻辑，那就直接走`hint === number||default`的逻辑。
   2. 当没有`Symbol.toPrimitive`方法时，遵循下面的转换规则，会去找对象的`toString`和`valueOf`方法
      
      1. 当需要转换为`string`时，即`hint === string`，先找`toString`，再找`valueOf`
      2. 当需要转换为别的类型时，即`hint === number || defalut`，先找`valueOf`，再找`toString`
      
      > ❗注意：在`Symbol.toPrimitive`中的转换规则里，如果返回值不是原始类型，会直接报错，`TypeError: Cannot convert object to primitive value`。而当没有`Symbol.toPrimitive`时，`toString`或者`valueOf`的返回值如果不是原始类型会直接忽略。
      > 
      > 另外，数字和字符串都可以使用`> <`进行比较，这时走的`hint === number`，是历史遗留下来的，记住就行了。比如：
      > 
      > * 当有`Symbol.toPrimitive`时
      >   ```js
      >   let a = {
      >       [Symbol.toPrimitive](hint) {
      >           console.log(`hint: ${hint}`);
      >           return hint === 'string' ? 'hello' : 123
      >       }
      >   }
      >   
      >   let b = {
      >       [Symbol.toPrimitive](hint) {
      >           console.log(`hint: ${hint}`);
      >           return hint === 'string' ? 'hello' : 456
      >       }
      >   }
      >   
      >   console.log(a < b);
      >   // hint: number
      >   // hint: number
      >   // true 因为 123 < 456
      >   ```
      > * 当没有Symbol.toPrimitive`时
      >   ```js
      >   let a = {
      >       toString() {
      >           return 'hello'
      >       },
      >       valueOf() {
      >           console.log('hint: number');
      >           return 123
      >       }
      >   }
      >   
      >   let b = {
      >       toString() {
      >           return 'hello'
      >       },
      >       valueOf() {
      >           console.log('hint: number');
      >           return 456
      >       }
      >   }
      >   
      >   // 走number时，先找valueOf 再找toString
      >   console.log(a < b);
      >   // hint: number
      >   // hint: number
      >   // true 因为 123 < 456
      >   ```
   
   在实践中，为了便于进行日志记录或调试，对于所有能够返回一种“可读性好”的对象的表达形式的转换，只实现以 `obj.toString()` 作为全能转换的方法就够了。

## 参考

[https://juejin.cn/post/6956170676327677966#heading-0](https://juejin.cn/post/6956170676327677966#heading-0)

[https://zh.javascript.info/type-conversions](https://zh.javascript.info/type-conversions)

[https://zh.javascript.info/object-toprimitive](https://zh.javascript.info/object-toprimitive)
