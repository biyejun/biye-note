## Promise

## 前言

通过几个例子，看一下promise的输出，来了解一下promise的运行机制。

## 例子

### 例子1 某一个.then没有返回值，下一个就会输出undefined

```js
const p1 = new Promise((resolve, reject) => {
    // 001
    console.log(6); // 同步代码 直接执行 输出 6

    resolve(1) // 状态变更 pending->fulfilled    
    reject(2) // 无效，状态一旦变化 不可逆
    resolve(3) // // 无效，状态一旦变化 不可逆

    // 002
    console.log(5); // 同步代码 直接执行 输出 6   002
})

const p2 = p1.then(res => { // .then里的代码是异步的，微任务，稍后执行
    // 003
    console.log(res); // 输出 1 

    return 4 // 返回结果为 4，链式调用 .then 的话，就相当于 return Promise.resolve(4)
}).then(res => {
    // 004
    console.log(res); // 输出4
    // 没有返回值 相当于 return undefined
})

p1.catch(err => { // .catch里的代码也是异步的，微任务
    // ，但是由于 p1的状态是 fulfilled ，这里的代码永远不会执行
    // 只有当 rejected 状态 才会执行
    console.log(err);
})

p2.then(res => { //  .then里的代码是异步的，微任务，稍后执行
    // 005
    console.log(res); // 输出 undefined
    // 因为 在 004 之后 没有返回值，就相当于 p2 = return Promise.resolve(undefined)
})

/* 
输出顺序
6
5
1
4
undefined
*/
```

### 例子2  一直有返回值

```js
const p1 = new Promise((resolve, reject) => {
    // 001
    console.log(1); // 输出1
    resolve(2)
})

let p2 = p1.then(res => {
    // 002
    console.log(res); // 输出 1

    return new Promise((reslove, reject) => {
        // 003
        console.log('hhhh'); // 输出 hhh
        reslove('aaaa')
    }).then(res => {
        // 004
        console.log(res); // 输出 aaaa
        return 'cccc'
        // 这里如果没有返回值，那么 p2.then() 打印的会是 undefined
    })
})

p2.then(res => {
    // 005
    console.log(res); // 输出 cccc
})

/* 
1
2
hhhh
aaaa
cccc
*/
```

### 例子3 返回值是个带then方法的对象，then也是一个普通值

```js
const promise = new Promise((resolve, reject) => {
    console.log(1); // 1
    resolve(2)
})

promise.then(res => {
    console.log(res); // 2
    return {
        a: 1,
        then: 'aaa'
    }
}).then(res => {
    console.log(res); // { a: 1, then: 'aaa' }
})
```

### 例子4 返回值是个带then方法的对象，不按照标准写

```js
const promise = new Promise((resolve, reject) => {
    console.log(1); // 1
    resolve(2)
})

promise.then(res => {
    console.log(res); // 2
    return {
        a: 1,
        then: function () {
            // 当为function时，必须按照(resolve, reject)的形式写，通过resolve或reject给后序的结果传值
            return 'bbb'
        }
    }
}).then(res => {
    console.log(res); // 不会执行，被对象里的then方法卡住了，因为状态一直是pending
})
```

### 例子5 返回值是个带then方法的对象，按照标准写

```js
const promise = new Promise((resolve, reject) => {
    console.log(1); // 1
    resolve(2)
})

promise.then(res => {
    console.log(res); // 2
    return {
        a: 1,
        then: function (resolve, reject) {
            resolve('bbb')
        }
    }
}).then(res => {
    console.log(res); // bbb
})
```

### 例子6 返回值是promise

```js
const promise = new Promise((resolve, reject) => {
    console.log(1); // 1
    resolve(2)
})

promise.then(res => {
    console.log(res); // 2
    return Promise.resolve(333)
}).then(res => {
    console.log(res); // 333
})
```

## 手写代码

### Promise.resolve

将值转换为fullfilled状态的promise，如果本身就是，原样返回

```js
Promise.myResolve = function (value) {
    if (value instanceof Promise) {
        return value
    }

    return new Promise(resolve => resolve(value))
}
```

### Promise.reject

将值转换为rejected状态的promise，如果本身就是，这里与resolve有些区别，会返回一个新的Promise值

```js
Promise.myReject = function (reason) {
    return new Promise((reslove, reject) => reject(reason))
}
```

### Promise.all

所有都成功，返回结果

```js
Promise.myAll = function (arr) {
    let result = [] // 存放输出结果
    let count = 0 // 记录 resolve 的结果 个数

    return new Promise((resolve, reject) => {

        // arr 里 的每一项是同步执行的，并且需要是promise

        for (let i = 0; i < arr.length; i++) {
            // 转换成promise，确保安全
            Promise.resolve(arr[i]).then(res => {
                // 没成共一个 记录一次
                count++

                // 记录结果
                result.push(res)

                // 在这里比较，因为是异步任务，当最后一个执行成功后。改变状态
                if (count === arr.length) {
                    resolve(result)
                }

            }).catch(err => { // 一旦有一个失败 就直接返回结果
                reject(err)
            })
        }
    })
}

// 测试
let arr = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    4
]

Promise.myAll(arr).then(res => {
    console.log(res); // [ 1, 2, 3, 4 ]
})


let arr2 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    4,
    Promise.reject('出错了')
]

Promise.myAll(arr2).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err); // 出错了
})
```

### Promise.race

只要有一个有结果，直接返回，无论是fullfilled还是rejected

```js
Promise.myRace = function (arr) {
    return new Promise((reslove, reject) => {
        // 有一个成功就返回结果
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
```

### Promise.allSettled

所有状态都变化了，返回一个变化后的数组

```js
Promise.myAllSettle = function (arr) {
    let result = []

    return new Promise((reslove, reject) => {
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res => {
                result.push({
                    status: 'fulfilled',
                    value: res
                })

                if (result.length === arr.length) {
                    reslove(result)
                }
            }).catch(err => {
                result.push({
                    status: 'rejected',
                    value: err
                })
                if (result.length === arr.length) {
                    reject(result)
                }
            })
        }
    })
}
```

### Promise.any

空数组或者所有都rejected，会返回一个 AggregateError，

只要有一个fulfilled，就返回这个新的promise

```js
Promise.myAny = function (arr) {
    let count = 0; // 记录失败的次数

    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            reject(new AggregateError('All promise were rejected'))
        }

        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res => {
                // 只要有一个成功的 就返回
                resolve(res)
            }).catch(err => {
                count++

                if (count === arr.length) {
                    reject(new AggregateError('All promise were rejected'))
                }
            })
        }
    })
}
```

### 手写一个Promise

```js
const PEDNING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {

    // then() 2.2
    FULFILLED_CALLBACK_LIST = []
    REJECTED_CALLBACK_LIST = []

    /**
     * 定义私有变量 _status，其对应的属性是构造器中的status
     * 在使用getter、setter监听status时，我们操控 _status
     * 防止死循环
     * （
     *      如果不用一个私有变量存储，那么在每次 对 status进行赋值和取值的操作时，
     *      都会调用 setter和getter，这样就又是一波 赋值取值操作，然后就继续调用 setter和getter，
     *      如此循环往复，成了死循环。
     *      
     *      但是，当使用 _status 私有变量成员时，_status 并不会被getter、setter监听，
     *      
     *  ）
     */
    _status = PEDNING


    /**
     * @description 构造器，new MyPromise 会自动执行
     * @param {Function<resolve,reject>} fn 接收的入参，是个函数，有resolve、reject两个参数
     * 
     * 注意：在初始化promise的时候，就需要执行这个函数，并且有任何报错都要通过reject抛出去
     * 所以，执行的时候用try...catch...包裹一下，使用bind绑定当前的this，防止出现乱起八糟的情况
     */
    constructor(fn) {
        // 初始状态为pending
        this.status = PEDNING
        this.value = null
        this.reason = null

        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    // then() 2.1
    get status() {
        return this._status
    }

    // then() 2.1
    set status(newStatus) {
        this._status = newStatus

        switch (newStatus) {
            case FULFILLED:
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value)
                })
                break;
            case REJECTED:
                this.REJECTED_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason)
                })
                break;
        }
    }

    /**
     * @description promise的resolve，成功时执行
     * 做了两件事
     *  1、设置自己的 value
     *  2、将状态改为 FULFILLED
     * 状态有两种流转方式，所以只有当前状态是 PENDING 时才允许改变，一旦改变不可逆
     *  pending -> resolve(value) -> fulfilled    
     *  pending -> reject(reason) -> rejected
     * 
     * @param {*} value 从外面传过来的值，可以是任意类型
     */
    resolve(value) {
        if (this.status === PEDNING) {
            this.value = value
            this.status = FULFILLED
        }
    }
    /**
     * @description promise的reject，失败时执行
     * 做了两件事
     *  1、设置自己的 reason
     *  2、将状态改为 REJECTED
     * 状态有两种流转方式，所以只有当前状态是 PENDING 时才允许改变，一旦改变不可逆
     *  pending -> resolve(value) -> fulfilled    
     *  pending -> reject(reason) -> rejected
     * 
     * @param {*} reason 从外面传过来的值，可以是任意类型
     */
    reject(reason) {
        if (this.status === PEDNING) {
            this.reason = reason
            this.status = REJECTED
        }
    }



    /**
     * @description promise的then方法
     * @param {Function<value>} onFulfilled 成功时的回调
     * @param {Function<reason>} onRejected 失败时的回调
     * 
     * onFulfilled、onRejected必须为函数类型，如果不是函数类型，就忽略
     * 忽略是指原样返回value或reason
     * 
     * 1、先判断 onFulfilled、onRejected 是否为函数
     *  - onFulfilled 执行成功时的回调
     *  - onRejected 执行失败时的回调
     * 2、then返回值是一个新的promise
     *  2.1 根据当前promise的状态，调用不同的函数
     *  （
     *      需要一个状态的监听机制，只有当状态变为 fulfilled 或者 rejected时，
     *      才去执行对应的回调，可以使用 getter和setter 来监听属性值的变化
     *   ）
     *   补充：（函数的执行必须在微任务中，使用queueMicrotask包裹）
     *    
     *  2.2 所以需要拿到所有的callback，在某个时机去执行它们
     *      新建两个数组，分别存储成功和失败的回调，调用 then 方法时，
     *      如果还是 pending 就先存入数组中，等到状态变为 fulfilled 或者 rejected时，
     *      再从数组中拿出来执行
     *  2.3 如果 执行 onFulfilled、onRejected 时，抛出一个异常e，则promise必须拒绝执行，
     *      并返回拒绝原因e，手动 try...catch... 捕获一下
     *  2.4 如果 onFulfilled 不是函数，且promise1 成功执行，promise2必须成功执行并返回相同的value。
     *  2.5 如果 onFulfilled 不是函数，且promise1 拒绝执行，promise2必须拒绝执行并返回相同的reason。
     *      （需要注意的是，如果promise1的onRejected执行成功了，promise2应该被resolve）
     */
    then(onFulfilled, onRejected) {
        // 1、
        // 2.4
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value
        }
        // 1、
        // 2.4
        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            throw reason
        }
        // 2、
        const promise2 = new MyPromise((resolve, reject) => {

            // 补充：（函数的执行必须在微任务中，使用queueMicrotask包裹）
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    // 2.3
                    try {
                        /**
                         * 并不确定传入的函数到底是个什么样的，平时我们写的时候最常见的是
                         *  (res)=>{ console.log(res); this.xxxList = res.data; }
                         * 还有很多可能情况，所以我们需要处理一下这个函数的返回值，
                         * 看看到底是个什么种类的函数
                         */
                        const x = realOnFulfilled(this.value)
                        // 这个函数有大量的if判断，待会详细看
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }


            // 2.1
            switch (this.status) {
                case FULFILLED:
                    fulfilledMicrotask()
                    break;
                case REJECTED:
                    rejectedMicrotask()
                    break;

                case PEDNING:
                    // 2.2
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask)
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask)
                    break;
            }
        })

        return promise2
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    /* 
    无论成功失败，都会执行
    */
    finally(callback) {
        return this.then(
            (value) => {
                return MyPromise.resolve(callback()).then(() => value)
            },
            (err) => {
                return MyPromise.resolve(callback()).then(() => { throw err })
            }
        )
    }

    /**
     * @description 对promise .then 链式执行时的判断逻辑处理
     * @param {Promise} promise2 执行完.then后返回的新的promise
     * @param {*} x 
     * @param {*} resolve 
     * @param {*} reject 
     * 
     * 1、如果 newPromise 和 x 相等(===)，以TypeError为因拒绝执行
     *    （为了防止死循环）
     * 2、如果 x 是一个promise，newPromise就接收 x 的状态
     *    （
     *          也就是继续执行x，
     *      2.1 如果执行的时候拿到一个y，
     *          递归 resolvePromise(promise2, y, resolve, reject)，一直往下解析下去，
     *          直到解析出别的条件为止
     *     ）
     * 3、如果 x 是一个对象或者函数
     *  3.1 null 也会被判断为对象，单独处理一下
     *      if(x === null) return resolve(x)
     *  3.2 let then = x.then
     *      （
     *          注意，这里取值可能会报错，所以使用try...catch...包裹一下
     *          当有报错时，直接reject(e)
     *       ）
     *  3.2.1 如果 then 是函数
     *          then.call(x, resolvePromiseFn, rejectPromiseFn)
     *          将 x 作为函数的作用域this调用，传递两个回调函数作为参数 resolvePromiseFn和rejectPromiseFn
     *          - resolvePromiseFn：入参是 y，递归执行 resolvePromise(promise2, y, resolve, reject)
     *          - rejectPromiseFn：入参是 r，reject promise with r
     *          （
     *              3.2.1.1 注意：需保证resolvePromiseFn和rejectPromiseFn只调用一次
     *                      所以，可以使用一个Boolean变量确定其是否被调用，初始值设为false，
     *                      当有函数被调用时改为true
     * 
     *              3.2.1.2 另外：不能保证在调用then方法时会不会出错，所以也需要用try...catch...包裹一下
     *              
     *              一旦出错，
     *              3.2.1.3 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
     *              3.2.1.4 反之，reject promise with e as the reason
     *           ）
     *          
     *  3.2.2 如果 then 不是函数
     *          （
     *              说明这个 x 就是一个单纯的对象，直接以 x 为参数执行 promise
     *              reslove(x)
     *           ）
     * 4、既不是promise，也不是对象，又不是函数，最后只能是基本类型了
     *    以 x 为参数执行promise  resolve(x) 
     */
    resolvePromise(promise2, x, resolve, reject) {
        // 1、
        if (promise2 === x) {
            return reject(new TypeError('The promise and the return value are the same'))
        }

        // 2、
        if (x instanceof MyPromise) {
            queueMicrotask(() => {
                // 2.1
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, reject)
                }, reject)
            })

        } else if (typeof x === 'object' || this.isFunction(x)) { // 3、
            // 3.1
            if (x === null) {
                return resolve(x)
            }

            // 3.2
            let then = null
            try {
                then = x.then
            } catch (e) {
                return reject(e)
            }

            // 3.2.1
            if (this.isFunction(then)) {
                // 3.2.1.1
                let called = false
                // 3.2.1.2
                try {
                    then.call(
                        x,
                        (y) => {
                            if (called) return
                            called = true
                            this.resolvePromise(promise2, y, resolve, reject)
                        },
                        (r) => {
                            if (called) return
                            called = true
                            reject(r)
                        },
                    )
                } catch (e) {
                    // 3.2.1.3
                    if (called) return
                    called = true

                    // 3.2.1.4
                    reject(e)
                }

            } else { // 3.2.2
                resolve(x)
            }

        } else { // 4、
            resolve(x)
        }

    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }

        return new MyPromise((resolve) => {
            resolve(value)
        })

    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })

    }


    /**
     * @description 当iterableList中有一项执行完成，不管是fulfilled或者rejected，直接返回结果
     * @param {Iterable} iterableList 入参必须是可迭代的
     * @returns {Promise} 第一个执行出来的结果
     * 
     * 需要注意：
     * 1、入参必须是可迭代，含有Symbol.iterator属性
     * 2、将类数组转换为数组 Array.from()
     * 3、for循环默认是同步的，使用for循环遍历执行每一项promise
     * 4、每一项都必须是promise对象，直接使用静态方法Promise.resolve()，全部转换为promise对象
     * 5、只要有一个执行完成，不管是fulfilled或者rejected，直接返回
     */
    static race(iterableList) {
        return new MyPromise((resolve, reject) => {
            // 1、
            if (!MyPromise.isIterable(iterableList)) {
                return reject(new TypeError(`${iterableList} is not iterable (cannot read property Symbol(Symbol.iterator))`))
            }

            // 2、
            const promiseList = Array.from(iterableList)
            const promiseLength = promiseList.length

            if (promiseLength === 0) {
                return resolve([])
            } else {
                // 3、
                for (let i = 0; i < promiseLength; i++) {
                    // 4、
                    MyPromise.resolve(promiseList[i]).then(
                        (value) => {
                            // 5、
                            return resolve(value)
                        },
                        (reason) => {
                            // 5、
                            return reject(reason)
                        }
                    )
                }
            }
        })
    }

    /**
     * @description 当promiseList中所有项都fulfilled时，一块全返回出去，当有一个rejected，就直接reject出去
     * @param {Iterable} iterableList 入参必须是可迭代的
     * @returns {Promise} 返回所有执行完成的结果，当有一个rejected时，返回rejected的结果
     * 
     * 需要注意：
     * 1、入参必须是可迭代，含有Symbol.iterator属性
     * 2、将类数组转换为数组 Array.from()
     * 3、for循环默认是同步的，使用for循环遍历执行每一项promise
     * 4、每一项都必须是promise对象，直接使用静态方法Promise.resolve()，全部转换为promise对象
     * 5、将执行状态为fulfilled的结果存入一个临时数组中，所有的promise全部resolve时，把这个临时数组返回
     * 6、只要有一个状态为rejected时，就直接返回rejected的结果
     */
    static all(iterableList) {
        return new MyPromise((resolve, reject) => {
            // 1、
            if (!MyPromise.isIterable(iterableList)) {
                return reject(new TypeError(`${iterableList} is not iterable (cannot read property Symbol(Symbol.iterator))`))
            }
            // 2、
            const promiseList = Array.from(iterableList)
            const promiseLength = promiseList.length
            let resolvedCount = 0
            let resolvedValues = new Array(promiseLength)

            if (promiseLength === 0) {
                return resolve([])
            } else {
                // 3、
                for (let i = 0; i < promiseLength; i++) {
                    // 4、
                    MyPromise.resolve(promiseList[i]).then(
                        (value) => {
                            resolvedCount++
                            // 5、
                            resolvedValues[i] = value
                            if (resolvedCount === promiseLength) {
                                return resolve(resolvedValues)
                            }
                        },
                        (reason) => {
                            // 6、
                            return reject(reason)
                        },
                    )

                }
            }
        })
    }



    /**
     * @description 判断是否为函数
     * @param {*} param 
     * @returns {Boolean} true：是函数；false：不是函数 
     */
    isFunction(param) {
        return typeof param === 'function'
    }

    /**
     * @description 判断value是否可迭代
     * @param {*} value 
     * @returns {Boolean} true：可迭代；false：不可迭代
     */
    static isIterable(value) {
        if (value === null || value === undefined) {
            return false
        } else {
            return !(value[Symbol.iterator] === undefined)
        }
    }
}
```

## 总结

1. promise可以解决回调套回调，异步任务之间有依赖关系时，相互取值的问题
2. 使用方法
   ```js
   return new Promise((resolve,reject)=>{
        resolve()
    }).then().catch().finally()
   ```
3. .then、.catch、.finally都是异步任务，微任务，（resolve, reject）里的代码会立即执行
4. 同一个promise，可以使用.then注册多个异步任务，他们被保存在一个缓存数组中`fulfilledCallbackList`，.catch同理，`rejectedCallbackList`，当状态改变时，会遍历数组中的回调依次执行
5. Promise.then会返回一个新的promise，支持链式调用，上一个结果的返回值会被解析由下一个.then继承，如果没有返回值，默认返回undefined。返回值会有很多情况，可能是基本类型，可能是对象，可能是函数等，具体情况看上述的例子。
6. Promise.resolve，会返回一个新的fulfilled状态的promise对象，如果原来就是promise，会返回自己本身
7. Promise.reject，会返回一个新的rejected状态的promise对象，与resolve的区别是，即使自己本身是promise，也会返回一个新的
8. Promise.all，所有的都fulfilled之后，返回一个Promise对象，带着一个所有结果，一旦有一个失败，就返回
9. Promise.race，那个先执行成功，哪个先返回，无论fulfilled或者rejected
10. Promise.allSettled，返回所有的执行结果，都存放在数组中，会包含自己的状态
11. Promise.any，空数组或者全部失败会报个错，all Promise were rejected，一旦有一个成功的就返回结果。
