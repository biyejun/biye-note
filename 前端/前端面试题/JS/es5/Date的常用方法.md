## 前言

本章对`js`中的`Date`对象常用方法做一个梳理。

## 构造方法

可以使用`new Date()`创建一个日期的实例对象。如果不使用`new`，直接调用构造方法，会返回一个当前时间的字符串。

```js
// 不使用new 返回一个本地时间的字符串
console.log(Date()); // Fri Dec 10 2021 11:59:55 GMT+0800 (中国标准时间)
console.log(typeof Date());  // string

// 使用new，才会创建一个时间类型的对象
let date = new Date()
console.log(date); // 2021-12-10T03:59:55.176Z
console.log(typeof date); // object
console.log(Object.prototype.toString.call(date)); // [object Date]
```

构造方法的参数有四种基本形式

1. 没有参数：表示实例化的是当前的日期和时间
   ```js
   let date = new Date()
   console.log(date) // 2021-12-10T04:15:40.078Z
   console.log(typeof date); // object
   ```
2. Unix时间戳：传的是一个整数值，代表的从`1970-01-01 00:00:00`开始的毫秒数，如果是负数，就是之前的时间
   ```js
   // 1970-01-01 00:00:00
   let date1 = new Date(0)
   console.log(date1); // 1970-01-01T00:00:00.000Z
   
   // 1970-01-01 00:00:00 的后一秒
   let date2 = new Date(1000)
   console.log(date2); // 1970-01-01T00:00:01.000Z
   
   // 1970-01-01 00:00:00 的前一秒
   let date3 = new Date(-1000)
   console.log(date3); // 1969-12-31T23:59:59.000Z
   ```
3. 表示日期的字符串
   如果只有一个参数，并且是字符串，那么它会被自动解析。该算法与 `Date.parse` 所使用的算法相同，我们将在下文中进行介绍。
   ```js
   /* 
   字符串的格式应该为 YYYY-MM-DDTHH:mm:ss.sssZ
   1. YYYY-MM-DD —— 日期：年-月-日。
   2. 字符 "T" 是一个分隔符。
   3. HH:mm:ss.sss —— 时间：小时，分钟，秒，毫秒。
   4. 可选字符 'Z' 为 +-hh:mm 格式的时区。单个字符 Z 代表 UTC+0 时区。
   */
   let date1 = new Date('2021-12-10')
   console.log(date1); // 2021-12-10T00:00:00.000Z
   /*
   2021-12-10T00:00:00.000Z 表示 UTC标准时区
   如果是北京时间，因为在东八区，表示的时间应该为
   2021-12-10T08:00:00.000+08:00
   */
   
   
   // 字符串是UTC标准时间
   let date2 = new Date('2021-12-10T12:33:10.123Z')
   console.log(date2); // 2021-12-10T12:33:10.123Z
   
   // 字符串是东八区时间格式 东八区的时间被转换为了UTC标准时间
   let date3 = new Date('2021-12-10T13:49:10.123+08:00')
   console.log(date3); // 2021-12-10T05:49:10.123Z
   
   // 如果不带后缀 默认为本地时间 所以被转换为了标准时间
   let date4 = new Date('2021-12-10 13:49:10')
   console.log(date4); // 2021-12-10T05:49:10.000Z
   
   // 后缀是 +08:00 表示传的是东八区的时间 准换为UTC标准时间
   let date5 = new Date('2021-12-10 13:49:10+08:00')
   console.log(date5); // 2021-12-10T05:49:10.000Z
   
   // 后缀是 +00:00 表示传的本身就是UTC标准时间
   let date6 = new Date('2021-12-10 13:49:10+00:00')
   console.log(date6); // 2021-12-10T13:49:10.000Z
   ```
4. 分别提供日期与时间的每一个成员
   `new Date(year, month, date, hours, minutes, seconds, ms)`
   使用当前时区中的给定组件创建日期。只有前两个参数是必须的。
   ```js
   /*
   - `year` 必须是四位数：`2013` 是合法的，`98` 是不合法的。
   - `month` 计数从 `0`（一月）开始，到 `11`（十二月）结束。
   - `date` 是当月的具体某一天，如果缺失，则为默认值 `1`。
   - 如果 `hours/minutes/seconds/ms` 缺失，则均为默认值 `0`。
   */
   
   // 2021-12-10 14:08:00
   let date = new Date(2021, 11, 10, 14, 08)
   console.log(date); // 2021-12-10T06:08:00.000Z
   ```

### 构造方法小结

* 如果没有输入任何参数，则Date的构造器会依据系统设置的当前时间来创建一个Date对象。
* 如果提供了至少两个参数，其余的参数均会默认设置为 1（如果没有指定 day 参数）或者 0（如果没有指定 day 以外的参数）。
* JavaScript的时间由世界标准时间（UTC）1970年1月1日开始，用毫秒计时，一天由 86,400,000 毫秒组成。`Date` 对象的范围是 -100,000,000 天至 100,000,000 天（等效的毫秒值）。
* `Date` 对象为跨平台提供了统一的行为。时间属性可以在不同的系统中表示相同的时刻，而如果使用了本地时间对象，则反映当地的时间。
* `Date` 对象支持多个处理 UTC 时间的方法，也相应地提供了应对当地时间的方法。UTC，也就是我们所说的格林威治时间，指的是time中的世界时间标准。而当地时间则是指执行JavaScript的客户端电脑所设置的时间。
* 以一个函数的形式来调用`Date` 对象（即不使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符）会返回一个代表当前日期和时间的字符串。

## 静态方法

### Date.now()

返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。

```js
console.log(Date.now()) // 1639116960077
```

### Date.parse()

接收一个表示时间的字符串，返回对应的时间戳，如果不能解析就返回`NaN`

> 最好不要用这个方法，不同宿主环境又有可能不同。想把字符串转成时间，自己可以写一套规范代码，然后跨平台的时候使用也会很方便。

> 注意：输出的总是`UTC`标准时间距离`1970-01-01`的时间戳。
> 
> 1. 如果只传入年月日，比如`1970-01-01`、`Thu, 01 Jan 1970`，那么可以看成传入的就是标准时间（虽然没有带时区标志，比如`GMT + 0800`，或者`+0800，或者`z`）
> 2. 如果传入了时分秒，不带时区标志，默认就是本地时间
> 3. 只要带时区标志，全部先转换为UTC标准时间，然后再计算时间戳

```js
// 只传年月日，不带时区标志，默认为UTC标准时区
let timestamp1 = Date.parse('1970-01-01')
console.log(timestamp1); // 0
console.log(Date.parse('1970-01-01Z')); // 0

// 传了时分秒，不带时区标志，默认为本地时间
let timestamp1_1 = Date.parse('1970-01-01 00:00:00')
console.log(timestamp1_1, 'timestamp1_1'); // -28800000 timestamp1_1

let timestamp1_2 = Date.parse('1970-01-01 00:00:00+08:00')
console.log(timestamp1_2, 'timestamp1_2'); // -28800000 timestamp1_2

// 带了UTC标准时区
let timestamp2 = Date.parse('1970-01-01T00:00:00.000Z')
console.log(timestamp2); // 0

// 如果是东八区的时间，会先转换为标准时间，输出的总是标准时间距1970-01-01的时间戳
let timestamp2_1 = Date.parse('1970-01-01T00:00:00.000+08:00')
console.log(timestamp2_1); // -28800000

// 标准时区1970-01-01 过了1s
let timestamp3 = Date.parse('1970-01-01T00:00:01.000Z')
console.log(timestamp3); // 1000

// 不加时区标志，传了时分秒，默认为本地时间 1970-01-01 过了1s
let timestamp3_1 = Date.parse('1970-01-01T00:00:01')
console.log(timestamp3_1, 'timestamp3_1'); // -28799000 timestamp3_1
let timestamp3_2 = Date.parse('1970-01-01T00:00:01+08:00')
console.log(timestamp3_2, 'timestamp3_2'); // -28799000 timestamp3_2

// 传了GMT表示为标准时间
let timestamp4 = Date.parse('Thu, 01 Jan 1970 00:00:00 GMT')
console.log(timestamp4); // 0

// 传了时分秒，东八区的时间会先转换位标准时间，然后输出标准时间距1970-01-01的时间戳
let timestamp4_1 = Date.parse('Thu, 01 Jan 1970 00:00:00 GMT+0800')
console.log(timestamp4_1, 'timestamp4_1'); // -28800000 timestamp4_1
// 传了时分秒，不带时区标志，默认为本地时区
let timestamp4_2 = Date.parse('Thu, 01 Jan 1970 00:00:00')
console.log(timestamp4_2, 'timestamp4_2'); // -28800000 timestamp4_2
```

### Date.UTC()

接收年月日时分秒，返回从1970-1-1 00:00:00 UTC到指定日期的的毫秒数。

```js
// new Date() 是基于本地时间创建的时间对象，
// 因为北京是东八区时间，所以创建的1970-01-01 00:00
// 其实是标准时间的1969-12-31 16:00
let date1 = new Date(1970, 00, 01)
console.log(date1); // 1969-12-31T16:00:00.000Z
console.log(date1.getTime()); // -28800000

// Date.UTC() 是基于UTC标准时间创建的时间戳
let timestamp2 = Date.UTC(1970, 00, 01)
console.log(timestamp2); // 0
console.log(new Date(timestamp2)); // 1970-07-01T00:00:00.000Z
```

## 原型上的方法

### 获取本地时间和UTC标准时间的年、月、日、时、分、秒、毫秒、星期几

```js
// 现在是 星期五 2021年12月10日 下午15点58分10秒259毫秒
let date = new Date('2021-12-10 15:58:10.259') // 不带时区标志的字符串，按照本地时间初始化

// 打印输出的UTC标准时间，因为北京属于东八区，比标准时间快了八小时，所以标准时间现在是 15-8=7 上午的07:58:10.259
console.log(date); // 2021-12-10T07:58:10.259Z 

// 获取年
console.log(date.getFullYear()); // 2021
console.log(date.getUTCFullYear()); // 2021

// 获取月
console.log(date.getMonth()); // 11 范围是0-11 11代表十二月
console.log(date.getUTCMonth()); // 11

// 获取日
console.log(date.getDate()); // 10 范围是1-31，10日
console.log(date.getUTCDate()); // 10

// 获取时
console.log(date.getHours()); // 15 北京时间下午三点
console.log(date.getUTCHours()); // 7 UTC标准时间 上午7点 15-8=7

// 获取分
console.log(date.getMinutes()); // 58 58分，范围是 0-59
console.log(date.getUTCMinutes()); // 58

// 获取秒
console.log(date.getSeconds()); // 10 10秒，范围是 0-59
console.log(date.getUTCSeconds()); // 10

// 获取毫秒
console.log(date.getMilliseconds()); // 259 259毫秒，范围是 0-999
console.log(date.getUTCMilliseconds()); // 259

// 获取星期几
console.log(date.getDay()); // 5 今天是星期5，范围是0-6
console.log(date.getUTCDay()); // 5
```

#### 年：getFullYear/getUTCFullYear

获取年份（4位数）

#### 月：getMonth/getUTCMonth

获取月份，从0到11，0表示一月

#### 日：getDate/getUTCDate

获取日，一个月的第几天，从1到31

#### 时：getHours/getUTCHours

获取时，一天的第几小时，从0到23

#### 分：getMinutes/getUTCMinutes

获取分，第多少分钟，从0到59

#### 秒：getSeconds/getUTCSeconds

获取秒，从0到59

#### 毫秒：getMilliseconds/getUTCMilliseconds

获取毫秒数，从0到999

#### 星期几：getDay/getUCTDay

获取星期几，从0到6，0表示星期日

### 设置本地时间和UTC标准时间的年、月、日、时、分、秒、毫秒

#### 年：setFullYear/setUTCFullYear

`dateObj.setFullYear(yearValue[, monthValue[, dayValue]])`

1. yearValue：四位数
2. monthValue：0-11的整数
3. dayValue：1-31的整数

如果没有指定 `monthValue` 和`dayValue` 参数，将会使用 `getMonth` 和`getDate` 方法的返回值。

如果有一个参数超出了合理的范围，`setFullYear` 方法会更新其他参数值，日期对象的日期值也会被相应更新。 例如，为 `monthValue `指定 15， 则年份会加1，月份值会为3。

```js
let date = new Date('2021-12-10 16:18:10.235')
console.log(date); // 2021-12-10T08:18:10.235Z

date.setFullYear(2020)
console.log(date); // 2020-12-10T08:18:10.235Z

// 设置的月份 正常为0-11，设置12 超过了一个月，年份就自动+1，月份变为了1月
date.setFullYear(2020, 12)
console.log(date); // 2021-01-10T08:18:10.235Z

// 月份设置了-1，所以就变为了2020年1月的上一月，就是 2019年12月
date.setFullYear(2020, -1)
console.log(date); // 2019-12-10T08:18:10.235Z
```

#### 月：setMonth/setUTCMonth

`dateObj.setMonth(monthValue[, dayValue])`

1. monthValue：0-11的整数
2. dayValue：1-31的整数

如果不指定 `dayValue` 参数，就会使用 `getDate`方法的返回值。

如果有一个指定的参数超出了合理范围，`setMonth` 会相应地更新日期对象中的日期信息。例如，为 `monthValue` 指定 15，则年份会加 1，月份将会使用 3。

#### 日：setDate/setUTCDate

`dateObj.setDate(dayValue)`

1. dayValue：1-31的整数

如果 `dayValue` 超出了月份的合理范围，`setDate` 将会相应地更新 `Date` 对象。

例如，如果为 `dayValue` 指定0，那么日期就会被设置为上个月的最后一天。

如果dayValue被设置为负数，日期会设置为上个月最后一天往前数这个负数绝对值天数后的日期。-1会设置为上月最后一天的前一天（译者注：例如当前为4月，如果setDate(-2),则为3月29日）

#### 时：setHours/setUTCHours

`dateObj.setHours(hoursValue[, minutesValue[, secondsValue[, msValue]]])`

1. hoursValue：一个 0 到 23 的整数，表示小时。
2. minutesValue：一个 0 到 59 的整数，表示分钟。
3. secondsValue：一个 0 到 59 的整数，表示秒数。如果指定了`secondsValue` 参数，则必须同时指定`minutesValue `参数。
4. msValue：一个 0 到 999 的数字，表示微秒数，如果指定了`msValue` 参数，则必须同时指定`minutesValue` 和`secondsValue` 参数。

如果不指定 `minutesValue`，`secondsValue` 和 `msValue` 参数，则会使用`getMinutes()`、`getSeconds()`、`getMilliseconds()`方法的返回值。

如果有一个参数超出了合理范围，`setHours` 会相应地更新日期对象中的日期信息。例如，如果为 `secondsValue` 指定了 100，则分钟会加 1，然后秒数使用 40。

#### 分：setMinutes/setUTCMinutes

`dateObj.setMinutes(minutesValue[, secondsValue[, msValue]])`

1. minutesValue：一个 0 到 59 的整数，表示分钟。
2. secondsValue：一个 0 到 59 的整数，表示秒数。如果指定了`secondsValue` 参数，则必须同时指定`minutesValue `参数。
3. msValue：一个 0 到 999 的数字，表示微秒数，如果指定了`msValue` 参数，则必须同时指定`minutesValue` 和`secondsValue` 参数。

如果没有指定 `secondsValue` 和 `msValue` 参数，就会使用 `getSeconds()`和 `getmilliseconds()` 方法的返回值。

如果有一个指定的参数超出了合理范围，`setMinutes` 会相应地更新日期对象中的时间信息。例如，为 `secondsValue` 指定 100，分钟数将会加 1，而秒数会为 40。

#### 秒：setSeconds/setUTCSeconds

`dateObj.setSeconds(secondsValue[, msValue])`

1. secondsValue：一个 0 到 59 的整数，表示秒数。
2. msValue：一个 0 到 999 的数字，表示微秒数。

如果没有指定 `msValue` 参数，就会使用 `getMilliseconds()`方法的返回值。

如果一个参数超出了合理范围， `setSeconds` 方法会相应地更新日期对象的时间信息。例如，为 `secondsValue` 指定 100，则日期对象的分钟数会相应地加 1，秒数将会使用 40。

#### 毫秒：setMilliseconds/setUTCMilliseconds

`dateObj.setMilliseconds(millisecondsValue)`

millisecondsValue：一个 0 到 999 的数字，表示豪秒数。

如果指定的数字超出了合理范围，则日期对象的时间信息会被相应地更新。例如，如果指定了 1005，则秒数加 1，豪秒数为 5。

### getTime 获取时间戳

`getTime` 方法的返回值一个数值，表示从1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象所代表时间的毫秒数。

```js
// 传了时分秒 不带时区的话 默认会以本地时间创建日期对象
// 北京在东八区，比UTC标准时间快了八小时
// 所以北京时间的 1970-01-01 00:00:00+08:00
// 实际是UTC标准时间 1969-12-31T16:00:00.000Z
// 所以这里打印的毫秒数是负值
let date = new Date('1970-01-01 00:00:00')
console.log(date); // 1969-12-31T16:00:00.000Z
console.log(date.getTime()); // -28800000

// 标准的传参，带了时区，说明这是UTC标准时区的时间
let date2 = new Date('1970-01-01T00:00:00.000Z')
console.log(date2); // 1970-01-01T00:00:00.000Z
console.log(date2.getTime()); // 0
```

### setTime 根据时间戳设置时间

`dateObj.setTime(timeValue)`

timeValue：一个整数，表示从1970-1-1 00:00:00 UTC开始计时的毫秒数。

```js
let date = new Date('1970-01-01 00:00:00z')
console.log(date); // 1970-01-01T00:00:00.000Z

// 可以使用setTime复制一个日期对象
let date2 = new Date(date.getTime())
console.log(date2); // 1970-01-01T00:00:00.000Z
```

### toString、toLocaleString、toISOString、toUTCString

1. toString：`Fri Dec 10 2021 17:20:41 GMT+0800 (中国标准时间)`
2. toLocaleString：`2021/12/10 下午5:20:41`
   方法返回该日期对象的字符串，该字符串格式因不同语言而不同。新增的参数 `locales` 和 `options` 使程序能够指定使用哪种语言格式化规则，允许定制该方法的表现（behavior）。
   `dateObj.toLocaleString([locales [, options]])`
   ```js
   let date = new Date('2021-12-10 19:34+0800')
   console.log(date.toISOString()); // 2021-12-10T11:34:00.000Z
   console.log(date.toString()); // Fri Dec 10 2021 19:34:00 GMT+0800 (中国标准时间)
   
   // 没有指定语言环境（locale）时，返回一个使用默认语言环境和格式设置（options）的格式化字符串。
   console.log(date.toLocaleString()); // 2021/12/10 下午7:34:00
   // 中国
   console.log(date.toLocaleString('zh')); // 2021/12/10 下午7:34:00
   console.log(date.toLocaleString('zh', { hour12: true })) // 2021/12/10 下午7:34:00
   console.log(date.toLocaleString('zh', { hour12: false })) // 2021/12/10 19:34:00
   // en-GB(不列颠英语)
   console.log(date.toLocaleString('en-GB')); // 10/12/2021, 11:34:00
   // 韩国
   console.log(date.toLocaleString('ko-KR')); // 2021. 12. 10. 오전 11:34:00
   ```
3. toISOString：`2021-12-10T09:20:41.081Z`
4. toUTCString：`Fri, 10 Dec 2021 09:20:41 GMT`

### toDateString、toLocaleDateString

1. toDateString：`Fri Dec 10 2021`
2. toLocalDateString：`2021/12/10`

### toTimeString、toLocaleTimeString

1. toTimeString：`17:20:41 GMT+0800 (中国标准时间)`
2. toLocalTimeString：`下午5:20:41`

### valueOf

功能和`getTime`一样，返回从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期的毫秒数。

```js
let date = new Date()

console.log(date.toString()); // Fri Dec 10 2021 17:20:41 GMT+0800 (中国标准时间)
console.log(date.toLocaleString()); // 2021/12/10 下午5:20:41

console.log(date.toDateString()); // Fri Dec 10 2021
console.log(date.toLocaleDateString()); // 2021/12/10

console.log(date.toTimeString()); // 17:20:41 GMT+0800 (中国标准时间)
console.log(date.toLocaleTimeString()); // 下午5:20:41

console.log(date.toISOString()); // 2021-12-10T09:20:41.081Z
console.log(date); // 2021-12-10T09:20:41.081Z

console.log(date.toUTCString()); // Fri, 10 Dec 2021 09:20:41 GMT

console.log(date.valueOf()); // 1639128041081
console.log(date.getTime()); // 1639128041081
```

### toJSON

返回日期的字符串形式，用来序列化的时候使用，默认使用`toISOString()`输出结果。

```js
let date = new Date()
console.log(date.toJSON()) // 2021-12-10T11:10:25.832Z
```

### getTimezoneOffset

返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。

```js
// 北京在东八区，与UTC标准时间正好差了八小时
console.log(new Date().getTimezoneOffset()) // -480
```

## 总结

1. Date构造方法的参数可以有四种形式
   1. `new Date()`：啥也不填，会返回一个本地的时间对象
   2. `new Date(0)`：填一个时间戳，从`1970-01-01 00:00:00`UTC标准的时间开始的时间戳，如果填负数，就是之前的时间
   3. `new Date('dateString')`：填一个日期格式的字符串，会被解析成一个时间对象，如果不填写时区后缀时，会默认以本地时间解析。
      
      ```js
      let date = new Date('2021-12-10 18:19') // 没有带时间后缀，默认以本地时间创建
      // UTC标准时间就是上午10点
      console.log(date.toUTCString()); // Fri, 10 Dec 2021 10:19:00 GMT
      console.log(date.toISOString()); // 2021-12-10T10:19:00.000Z
      ```
      
      > UTC时间、GMT时间、和北京时间，这三者的区别参考另一篇文章：[GMT、UTC和北京时间的关系](http://www.bnbiye.cn/#/articleDetail/a8f45760-58f5-11ec-96d5-7933aca11ca0)
      > 
      > 这里简单的总结一下，
      > 
      > UTC时间和GMT都可以视为标准时间。在早期是以GMT时间为标准时间。根据经度的不同，将地球划分为24个时区，本初子午线（0°经线）所在的区是中时区，本初子午线向东位东时区，向西为西时区，北京正好位于东八区，比标准时间快了八小时。
      > 
      > 所以在传字符串的时候，如果想传的更标准，可以这么传
      > 
      > ```js
      > /*
      > IS0的形式（UTC标准时区、中时区、伦敦在这个时区）：
      > 	2021-12-10T10:19:00.000Z
      > 如果是北京的东八区，可以这么传
      > 	2021-12-10T18:19:00.000+0800
      > 如果是华盛顿的西五区，可以这么传
      > 	2021-12-10T18:05:00.000-0500
      > */
      > /*
      > GMT的格式（GMT标准时区、中时区、伦敦在这个时区）
      > 	Fri, 10 Dec 2021 10:19:00 GMT
      > 如果是北京的东八区，可以这么传
      > 	Fri, 10 Dec 2021 18:19:00 GMT+0800
      > 如果是华盛顿的西五区，可以这么传
      > 	Fri, 10 Dec 2021 05:19:00 GMT-0500
      > */
      > ```
      > 
      > 上面的例子描述一下就是：
      > 
      > 当伦敦（中时区）上午10的时候，北京（东八区）是下午6点，比伦敦时间快了八小时。而美国的华盛顿（西五区）刚刚早上5点。看一个手机的截图：
      > 
      > ![image-20211210184104061](http://cdn.qiniu.bnbiye.cn/img/202112101841113.png)
   4. `new Date(年、月、日、时、分、秒、毫秒)`：在对应位置处填写对应的数值，根据本地时间创建的日期对象
2. 静态方法
   1. `Date.now()`：获取当前时间的时间戳，相当于`new Date().getTime()`
   2. `Date.parse()`：可以将一个字符串格式的时间转换为一个解析为一个时间戳，如果解析不成功，返回`NaN`
      1. 字符串的格式跟`new Date()`时传入的字符串格式一样。
   3. `Date.UTC()`：在使用`new Date(年、月、日...)`创建日期对象时，默认是以本地时间创建，如果想创建一个UTC标准时间，就可以使用这个静态方法，会返回一个标准时间的时间戳。
      ```js
      let localTime = new Date(年，月，日，时，分，秒，毫秒) // 默认以本地时间创建
      let utcTime = new Date(Date.UTC(年，月，日，时，分，秒，毫秒)) // Date.UTC() 会返回一个标准时间的时间戳
      ```
3. get：一些获取年、月、日、时、分、秒、毫秒、星期、的get方法（对应的增加UTC就是获取到UTC的时间）
   1. 年 getFullYear/getUTCFulllYear：返回一个四位数，比如`2021`
   2. 月 getMonth/getUTCMonth：返回一个`0-11`的数，`0`表示一月，`11`表示十二月
   3. 日 getDate/getUTCDate：返回一个`1-31`的数，`1`表示`1`号，`31`表示`31`号
   4. 时 getHours/getUTCHours：返回一个`0-23`的数，`0`表示整点（`0`点），`23`表示`23`点
   5. 分 getMinutes/getUTCMinutes：返回一个0-59的数，`0`表示整分（`0`分），`59`表示`59`分
   6. 秒 getSeconds/getUTCSeconds：返回一个`0-59`的数，`0`表示整秒，`59`表示`59`秒
   7. 毫秒 getMilliseconds/getUTCMilliseconds：返回一个`0-999`的数，`1`秒等于`1000`毫秒
   8. 星期 getDay/getUTCDay：返回一个`0-6`的数，`0`表示星期日，`6`表示星期六
4. set：一些设置年、月、日、时、分、秒、毫秒的set方法
   1. 年 setFullYear/setUTCFulllYear：
      同时还可以设置月、日，如果设置超了，会自动往前面进1，如果设置少了，就会向前面借位，方法内部实现好了日期的加减法。
   2. 月 setMonth/setUTCMonth：
      同时还可以设置日。
   3. 日 setDate/setUTCDate：
      设置日。
   4. 时 setHours/setUTCHours：
      同时还可以设置分、秒、毫秒，如果设置超了，会自动往前面进1，如果设置少了，就会向前面借位，方法内部实现好了日期的加减法。
   5. 分 setMinutes/setUTCMinutes：
      同时还可以设置 秒、毫秒
   6. 秒 setSeconds/setUTCSeconds：
      同时还可以设置 毫秒
   7. 毫秒 setMilliseconds/setUTCMilliseconds：
      设置毫秒。
5. 把日期转为可读的字符串1----字符串包括日期和时间（全量）：
   1. toString：返回一个美式英语日期格式的字符串。
      ```js
      // Fri Dec 10 2021 17:20:41 GMT+0800 (中国标准时间)
      ```
   2. toLocaleString：返回该日期对象的字符串，可以配置不同地区，或者输出的样式。
      ```js
      let date = new Date('2021-12-10 19:34+0800')
      // 没有指定语言环境（locale）时，返回一个使用默认语言环境和格式设置（options）的格式化字符串。
      console.log(date.toLocaleString()); // 2021/12/10 下午7:34:00
      // 中国
      console.log(date.toLocaleString('zh')); // 2021/12/10 下午7:34:00
      console.log(date.toLocaleString('zh', { hour12: true })) // 2021/12/10 下午7:34:00
      console.log(date.toLocaleString('zh', { hour12: false })) // 2021/12/10 19:34:00
      ```
   3. toISOString：返回一个ISO格式的字符串
      ```js
      // 2021-12-10T09:20:41.081Z
      ```
   4. toUTCString：使用UTC时区的字符串
      ```js
      // Fri, 10 Dec 2021 09:20:41 GMT
      ```
   5. toJSON：序列化的时候会调用，默认返回`ISO`格式的字符串。
6. 把日期转为可读的字符串2----字符串包括日期或者时间（部分）：
   1. toDateString：返回日期这部分的字符串
   2. toLocaleDateString：类似于toLocaleString，可以传参数，返回相应的日期格式的字符串
   3. toTimeString：返回时间这部分的字符串
   4. toLocaleTimeString：类似于toLocaleString，可以传参数，返回相应的时间这部分的字符串
7. getTime：获取时间戳
   ```js
   // 传了时分秒 不带时区的话 默认会以本地时间创建日期对象
   // 北京在东八区，比UTC标准时间快了八小时
   // 所以北京时间的 1970-01-01 00:00:00+08:00
   // 实际是UTC标准时间 1969-12-31T16:00:00.000Z
   // 所以这里打印的毫秒数是负值
   let date = new Date('1970-01-01 00:00:00')
   console.log(date); // 1969-12-31T16:00:00.000Z
   console.log(date.getTime()); // -28800000
   
   // 标准的传参，带了时区，说明这是UTC标准时区的时间
   let date2 = new Date('1970-01-01T00:00:00.000Z')
   console.log(date2); // 1970-01-01T00:00:00.000Z
   console.log(date2.getTime()); // 0
   ```
8. setTime：根据时间戳设置时间，可以用来拷贝日期
   ```js
   let date = new Date('1970-01-01 00:00:00z')
   console.log(date); // 1970-01-01T00:00:00.000Z
   
   // 可以使用setTime复制一个日期对象
   let date2 = new Date(date.getTime())
   console.log(date2); // 1970-01-01T00:00:00.000Z
   ```
9. valueOf：功能和`getTime`一样，返回从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期的毫秒数。
   ```js
   let date = new Date('1970-01-01 00:00:00z')
   console.log(date.getTime()); // 0
   console.log(date.valueOf()); // 0
   ```

## 参考

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

[https://zh.javascript.info/date](https://zh.javascript.info/date)
