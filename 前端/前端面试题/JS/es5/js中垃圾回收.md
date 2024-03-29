## 前言

在学习闭包时，我们知道了内部函数可以访问外部函数的参数和变量，即使外部函数已经被返回（寿命终止）。那么你是否存在过这样一个疑惑，如果这些变量通过闭包的形式还能访问到，就说明它们仍旧存储在内存中，那假设我们在闭包中声明了很多很多的变量，有很多很多个这样的闭包，那内存肯定会有不够的时候，如果某个变量我们不再需要的时候，它还存储在内存中，这显然是不合理的？

对于这种情况，js引擎是如何应对的？

实际上，js引擎有一套独立的垃圾回收机制，对于那些不再使用的变量，js的垃圾回收器会自动删除它们，释放内存。

本章就学习一下，js中，当我们不再需要某个东西时会发生什么？引擎是如何发现它并清理它？

## 可达性（Reachability）

JavaScript 中主要的内存管理概念是 **可达性** 。

简而言之，“可达”值是那些以某种方式可访问或可用的值。它们一定是存储在内存中的。

1. 这里列出固有的可达值的基本集合，这些值明显不能被释放。
   比方说：
   
   * 当前函数的局部变量和参数。
   * 嵌套调用时，当前调用链上所有函数的变量与参数。
   * 全局变量。
   * （还有一些内部的）
   
   这些值被称作 **根（roots）** 。
2. 如果一个值可以通过引用或引用链从根访问任何其他值，则认为该值是可达的。
   比方说，如果全局变量中有一个对象，并且该对象有一个属性引用了另一个对象，则 **该** 对象被认为是可达的。而且它引用的内容也是可达的。下面是详细的例子。

在 JavaScript 引擎中有一个被称作 [垃圾回收器](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) 的东西在后台执行。它监控着所有对象的状态，并删除掉那些已经不可达的。

## 一个简单的例子

这里是一个最简单的例子：

```js
// user 具有对这个对象的引用
let user = {
  name: "John"
};
```

![image-20211126104849949](http://cdn.qiniu.bnbiye.cn/img/202111261048080.png)

这里的箭头描述了一个对象引用。全局变量 `"user"` 引用了对象 `{name："John"}`（为简洁起见，我们称它为 John）。John 的 `"name"` 属性存储一个原始值，所以它被写在对象内部。

如果 `user` 的值被重写了，这个引用就没了：

```js
user = null;
```

![image-20211126105006006](http://cdn.qiniu.bnbiye.cn/img/202111261050047.png)

现在 John 变成不可达的了。因为没有引用了，就不能访问到它了。垃圾回收器会认为它是垃圾数据并进行回收，然后释放内存。

## 两个引用

现在让我们想象下，我们把 `user` 的引用复制给 `admin`：

```js
// user 具有对这个对象的引用
let user = {
  name: "John"
};

let admin = user;
```

![image-20211126105046043](http://cdn.qiniu.bnbiye.cn/img/202111261050083.png)

现在如果执行刚刚的那个操作：

```js
user = null;
```

……然后对象仍然可以被通过 `admin` 这个全局变量访问到，所以对象还在内存中。如果我们又重写了 `admin`，对象就会被删除。

## 相互关联的对象

现在来看一个更复杂的例子。这是个家庭：

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

`marry` 函数通过让两个对象相互引用使它们“结婚”了，并返回了一个包含这两个对象的新对象。

由此产生的内存结构：

![image-20211126105138956](http://cdn.qiniu.bnbiye.cn/img/202111261051002.png)

到目前为止，所有对象都是可达的。

现在让我们移除两个引用：

```js
delete family.father;
delete family.mother.husband;
```

![image-20211126105234305](http://cdn.qiniu.bnbiye.cn/img/202111261052355.png)

仅删除这两个引用中的一个是不够的，因为所有的对象仍然都是可达的。

但是，如果我们把这两个都删除，那么我们可以看到再也没有对 John 的引用了：

![image-20211126105257613](http://cdn.qiniu.bnbiye.cn/img/202111261052659.png)

对外引用不重要，只有传入引用才可以使对象可达。所以，John 现在是不可达的，并且将被从内存中删除，同时 John 的所有数据也将变得不可达。

经过垃圾回收：

![image-20211126105317713](http://cdn.qiniu.bnbiye.cn/img/202111261053755.png)

## 无法到达的岛屿

几个对象相互引用，但外部没有对其任意对象的引用，这些对象也可能是不可达的，并被从内存中删除。

源对象与上面相同。然后：

```js
family = null;
```

内存内部状态将变成：

![image-20211126105444794](http://cdn.qiniu.bnbiye.cn/img/202111261054842.png)

这个例子展示了可达性概念的重要性。

显而易见，John 和 Ann 仍然连着，都有传入的引用。但是，这样还不够。

前面说的 `"family"` 对象已经不再与根相连，没有了外部对其的引用，所以它变成了一座“孤岛”，并且将被从内存中删除。

## 内部算法

垃圾回收的基本算法被称为 “mark-and-sweep”（标记and清除）。

定期执行以下“垃圾回收”步骤：

* 垃圾收集器找到所有的根，并“标记”（记住）它们。
* 然后它遍历并“标记”来自它们的所有引用。
* 然后它遍历标记的对象并标记**它们的** 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。
* ……如此操作，直到所有可达的（从根部）引用都被访问到。
* 没有被标记的对象都会被删除。

例如，使我们的对象有如下的结构：

![image-20211126105625844](http://cdn.qiniu.bnbiye.cn/img/202111261056889.png)

我们可以清楚地看到右侧有一个“无法到达的岛屿”。现在我们来看看“标记和清除”垃圾收集器如何处理它。

第一步标记所有的根：

![image-20211126105640324](http://cdn.qiniu.bnbiye.cn/img/202111261056369.png)

然后它们的引用被标记了：

![image-20211126105659105](http://cdn.qiniu.bnbiye.cn/img/202111261056145.png)

……如果还有引用的话，继续标记：

![image-20211126105716753](http://cdn.qiniu.bnbiye.cn/img/202111261057799.png)

现在，无法通过这个过程访问到的对象被认为是不可达的，并且会被删除。

![image-20211126105731310](http://cdn.qiniu.bnbiye.cn/img/202111261057355.png)

我们还可以将这个过程想象成从根溢出一个巨大的油漆桶，它流经所有引用并标记所有可到达的对象。然后移除未标记的。

这是垃圾收集工作的概念。JavaScript 引擎做了许多优化，使垃圾回收运行速度更快，并且不影响正常代码运行。

一些优化建议：

* **分代收集（Generational collection）** —— 对象被分成两组：“新的”和“旧的”。许多对象出现，完成它们的工作并很快死去，它们可以很快被清理。那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少。
* **增量收集（Incremental collection）** —— 如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟。所以引擎试图将垃圾收集工作分成几部分来做。然后将这几部分会逐一进行处理。这需要它们之间有额外的标记来追踪变化，但是这样会有许多微小的延迟而不是一个大的延迟。
* **闲时收集（Idle-time collection）** —— 垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。

还有其他垃圾回收算法的优化和风格。尽管我想在这里描述它们，但我必须打住了，因为不同的引擎会有不同的调整和技巧。而且，更重要的是，随着引擎的发展，情况会发生变化，所以在没有真实需求的时候，“提前”学习这些内容是不值得的。当然，除非你纯粹是出于兴趣。我在下面给你提供了一些相关链接。

## 总结

主要需要掌握的内容：

* 垃圾回收是自动完成的，我们不能强制执行或是阻止执行。
* 当对象是可达状态时，它一定是存在于内存中的。
* 被引用与可访问（从一个根）不同：一组相互连接的对象可能整体都不可达。

现代引擎实现了垃圾回收的高级算法。

《The Garbage Collection Handbook: The Art of Automatic Memory Management》（R. Jones 等人著）这本书涵盖了其中一些内容。

如果你熟悉底层（low-level）编程，关于 V8 引擎垃圾回收器的更详细信息请参阅文章 [V8 之旅：垃圾回收](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)。

[V8 博客](http://v8project.blogspot.com/) 还不时发布关于内存管理变化的文章。当然，为了学习垃圾收集，你最好通过学习 V8 引擎内部知识来进行准备，并阅读一个名为 [Vyacheslav Egorov](http://mrale.ph/) 的 V8 引擎工程师的博客。我之所以说 “V8”，因为网上关于它的文章最丰富的。对于其他引擎，许多方法是相似的，但在垃圾收集上许多方面有所不同。

当你需要底层的优化时，对引擎有深入了解将很有帮助。在熟悉了这门编程语言之后，把熟悉引擎作为下一步计划是明智之选。

## 参考

[https://zh.javascript.info/garbage-collection#ke-da-xing-reachability](https://zh.javascript.info/garbage-collection#ke-da-xing-reachability)
