# css外边距合并和BFC

外边距合并是一个CSS现象，当两个或多个垂直外边距相遇时，它们会合并成一个单一边距。这个单一外边距的大小是原来外边距中最大的那个。

- 块级元素的垂直外边距在普通文档流中会发生合并。
- 水平外边距不会合并。
- 清除浮动或创建BFC（Block Formatting Context）可以防止外边距合并。

## 如何避免外边距合并

改变元素的`display`属性为`inline-block`、`float`元素或者`position`为`absolute`或`fixed`，可以防止外边距合并。还可以创建一个新的BFC来避免合并。

## BFC

BFC（Block Formatting Context）是Web页面的可视化CSS渲染的一部分，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。在某些情况下，创建BFC可以防止外边距合并。

**触发BFC的条件**:

2. 浮动元素（元素的 `float` 不是 `none`）。
3. 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）。
4. 行内块元素（元素的 `display` 为 `inline-block`）。
8. `overflow` 值不为 `visible` 的块元素。
11. 弹性元素（`display` 为 `flex` 或 `inline-flex` 元素的直接子元素）。
12. 网格元素（`display` 为 `grid` 或 `inline-grid` 元素的直接子元素）。

## 举例子1

```html
<div class="first-box">第一个盒子</div>
<div class="second-box">第二个盒子</div>
```

```css
.first-box {
    width: 200px;
    height: 100px;
    background-color: lightblue;
    margin-bottom: 50px; /* 下外边距 */
}

.second-box {
    width: 200px;
    height: 100px;
    background-color: lightcoral;
    margin-top: 30px; /* 上外边距 */
    overflow: hidden; /* 触发BFC */
}
```

虽然 `second-box`触发了BFC，但是外边距还是合并了。

这是因为，即使一个元素形成了BFC，它的顶部外边距仍然可能与其前一个兄弟元素的底部外边距发生合并。要防止相邻元素之间的外边距合并，我们需要在两者之间添加一个分隔，使得两个相邻的块级元素不直接相邻，或者确保其中一个元素的外边距不参与合并。

```html
<div class="first-box">第一个盒子</div>
<div class="bfc-wrapper">
  <div class="second-box">第二个盒子</div>
</div>
```

```css
.first-box {
    width: 200px;
    height: 100px;
    background-color: lightblue;
    margin-bottom: 50px; /* 下外边距 */
}

.bfc-wrapper {
    overflow: hidden; /* 触发BFC */
}

.second-box {
    width: 200px;
    height: 100px;
    background-color: lightcoral;
    margin-top: 30px; /* 上外边距 */
}
```

## 举例子2

在CSS中，即使元素形成了BFC，它的顶部外边距仍然可能与其前一个兄弟元素的底部外边距发生合并。为了防止相邻元素之间的外边距合并，我们需要在两者之间添加一个分隔，使得两个相邻的块级元素不直接相邻，或者确保其中一个元素的外边距不参与合并。

```html
<div class="first-box">第一个盒子</div>
<div class="separator"></div>
<div class="second-box">第二个盒子</div>
```

```css
.first-box {
    width: 200px;
    height: 100px;
    background-color: lightblue;
    margin-bottom: 50px;
}

.separator {
    overflow: hidden; /* 触发BFC */
    width: 100%; /* 占满容器宽度 */
    height: 0; /* 不占空间 */
}

.second-box {
    width: 200px;
    height: 100px;
    background-color: lightcoral;
    margin-top: 30px;
}
```




