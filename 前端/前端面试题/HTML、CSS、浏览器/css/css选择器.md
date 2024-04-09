# css选择器

## 概要

1. **基本选择器**:
   - 通用选择器（`*`）：选中HTML中的所有元素。
   - 元素类型选择器：根据元素的类型进行选择，例如`div`选择器将选中所有`<div>`元素。
   - 类选择器（`.class`）：选中具有指定类名的所有元素。
   - ID选择器（`#id`）：选中具有特定ID的单个元素。
   
2. **组合选择器**:
   
   - 后代选择器（`A B`）：选中A元素内部的所有B元素。
   - 子选择器（`A > B`）：选中A元素直接子元素中的所有B元素。
   - 相邻兄弟选择器（`A + B`）：选中紧接在A元素之后的第一个B元素。
   - 通用兄弟选择器（`A ~ B`）：选中A元素之后所有同级的B元素。
   
3. **属性选择器**:
   
   - 存在和值属性选择器（`[attr]`、`[attr=value]`）：选中具有指定属性的元素，或者属性具有特定值的元素。
   - 包含某值的属性选择器（`[attr*=value]`）：选中属性中包含指定值的元素。
   - 以某值开头或结尾的属性选择器（`[attr^=value]`、`[attr$=value]`）：选中属性值以指定值开头或结尾的元素。
   - 以某值开头并分隔的属性选择器（`[attr|=value]`）：选中属性值以指定值开头，后面紧跟连字符的元素。
   
4. **伪类选择器**:
   - 动态伪类（`:hover`、`:active`、`:focus`）：根据用户与元素的交互来选中元素。
   - 目标伪类（`:target`）：选中URL的哈希标识符指向的元素。
   - UI元素状态伪类（`:checked`、`:disabled`）：选中表单控件的不同状态。
   - 结构伪类（`:first-child`、`:last-child`、`:nth-child()`、`:nth-last-child()`、`:only-child`）：根据元素在其父元素中的位置来选中元素。
   - 否定伪类（`:not()`）：选中不符合指定条件的元素。
   
5. **伪元素选择器**:
   
   - `::before` 和 `::after`：在元素内容的前面或后面插入内容。
   - `::first-line` 和 `::first-letter`：选中块级元素的第一行或第一个字母。
   - `::selection`：选中用户高亮选择的文本部分。
   
6. **CSS4选择器**:
   
   - CSS4引入了一些新的选择器，尽管一些选择器如`:has()`目前还没有被广泛支持，但它们提供了更强大的选择能力，比如选择器列表、否定伪类的扩展等。
   
7. **选择器性能**:

   - 高性能的选择器通常具有低特异性，且不涉及深层次的后代选择器。
   - 避免使用通用选择器和属性选择器作为关键选择器（最右边的选择器），因为它们的匹配规则比较慢。

   > 在CSS规则中，最右边的选择器被称为关键选择器（Key Selector），也就是实际应用样式时直接作用于目标元素的选择器。在浏览器解析CSS规则时，它会从右向左读取选择器，因为这样可以更快地确定规则是否适用于当前元素。因此，关键选择器的性能对整个选择器链的匹配效率有很大影响。
   >
   > 例如，在以下CSS规则中：
   >
   > ```css
   > #navbar .menu-item a:hover {
   >   color: #ff0000;
   > }
   > ```
   >
   > 最右边的选择器是 `a:hover`，它是这条规则的关键选择器。浏览器会首先查找所有处于`:hover`状态的`<a>`元素，然后检查这些元素是否匹配左边的`.menu-item`类选择器和`#navbar` ID选择器。
   >
   > 由于通用选择器`*`和属性选择器（如`[type="text"]`）通常匹配大量元素，如果将它们用作关键选择器，浏览器需要检查更多的元素以确定哪些元素应用规则，这可能会降低样式计算的性能。相反，如果关键选择器是一个特定的类选择器或ID选择器，浏览器可以更快地确定哪些元素需要应用规则。
   >
   > 因此，为了优化性能，推荐使用更具体的选择器作为关键选择器，尤其是在大型或复杂的样式表中。

## 选择器优先级

CSS选择器的优先级（也称为特异性）是一个决定哪些CSS规则将应用到元素上的系统。当多个规则冲突时，浏览器使用特异性来决定使用哪个规则。特异性是根据选择器中不同类型的组件计算得出的，具有以下顺序：

1. **内联样式**： 直接在HTML元素的 `style` 属性中定义的样式具有最高优先级。
2. **ID选择器**： 如 `#id`，特异性值为（0,1,0,0）。
3. **类选择器、伪类和属性选择器**： 如 `.class`、`:hover` 或 `[type="text"]`，每个都有特异性值（0,0,1,0）。
4. **元素（类型）选择器和伪元素选择器**： 如 `div` 或 `::before`，每个都有特异性值（0,0,0,1）。
5. **通用选择器（`\*`）和组合器（`>`, `+`, `~`）**： 对特异性没有贡献，即（0,0,0,0）。

特异性的计算方式是将每种类型的选择器视为一个“等级”，然后计算每个等级的数量。这些数字被放在一起，就像一个数字串，以确定哪个规则具有更高的特异性。例如，选择器 `#id .class div` 的特异性将是（0,1,1,1）。

如果特异性相同，则最后定义的样式将应用到元素上，这是因为CSS的“层叠”性质。

此外，`!important` 规则可以覆盖其他所有正常规则的特异性，但如果有多个 `!important` 规则应用于同一个元素，则这些规则之间的冲突将由它们自己的特异性来决定。

请注意，当选择器具有相同的特异性值时，源代码中最后出现的选择器将优先应用，因为CSS的样式是按照顺序层叠的。

为了避免特异性带来的问题，建议尽可能使用一致的选择器模式，并避免过度依赖ID选择器和内联样式，以保持样式的可维护性和灵活性。

## 一些例子

### 后代选择器  （`A B`）

```html
<div class="container">
  <p>这是一个段落。</p>
  <div class="content">
    <p>这是另一个段落，位于.content内部。</p>
    <article>
      <p>这是一个位于article内的段落。</p>
    </article>
  </div>
</div>
```

```css
.content p {
  color: blue;
}
```

这条CSS规则会选中所有位于`.content`类后代中的`<p>`元素。在这个例子中，它将选中以下两个段落：

```html
<p>这是另一个段落，位于.content内部。</p>
<p>这是一个位于article内的段落。</p>
```

这两个`<p>`元素都会被选中并应用蓝色字体颜色，因为它们都是`.content`的后代。而位于`.container`中但不在`.content`内的第一个`<p>`元素则不会被选中，因此不会应用蓝色字体颜色。

后代选择器非常有用，因为它允许你根据文档的层次结构来指定样式，而无需对每个元素添加额外的类或ID。

### 子选择器  （`A > B`）

```html
<div class="container">
  <p>这是一个段落。</p>
  <div class="content">
    <p>这是另一个段落，位于.content直接子元素中。</p>
    <article>
      <p>这是一个位于article内的段落。</p>
    </article>
  </div>
</div>
```

```css
.content > p {
  color: green;
}
```

这条CSS规则会选中`.content`类的直接子元素中的所有`<p>`元素。在这个例子中，它将只选中这个段落：

```html
<p>这是另一个段落，位于.content直接子元素中。</p>
```

这个`<p>`元素会被选中并应用绿色字体颜色，因为它是`.content`的直接子元素。而位于`<article>`内部的`<p>`元素不是`.content`的直接子元素，因此不会被选中，也就不会应用绿色字体颜色。

子选择器是一种更精确的选择器，它允许你将样式规则限制为直接子元素，而不会影响到更深层次的后代元素。

### 相邻兄弟选择器（`A + B`）

相邻兄弟选择器（`A + B`）用于选择紧跟在A元素后面的B元素，且两者具有相同的父元素。这种选择器只会选择紧邻的下一个兄弟元素，而不会选择后面所有的B元素。

```html
<div class="example">
  <h2>标题一</h2>
  <p>这是标题一之后的段落。</p>
  <p>这是另一个段落，但不是标题一之后的第一个段落。</p>
  <h2>标题二</h2>
  <p>这是标题二之后的段落。</p>
</div>
```

```css
h2 + p {
  color: red;
  font-weight: bold;
}
```

这条CSS规则会选中每个`<h2>`元素后面的第一个`<p>`元素，并将其文本颜色设置为红色，字体加粗。在这个例子中，它将只选中这两个段落：

```html
<p>这是标题一之后的段落。</p>
<p>这是标题二之后的段落。</p>
```

这两个`<p>`元素都是紧接在`<h2>`元素之后的，因此它们会被选中并应用上述样式。而其他`<p>`元素，即使是同一父元素下的兄弟元素，但不是紧跟在`<h2>`元素之后的，就不会被选中。

### 通用兄弟选择器（`A ~ B`）

通用兄弟选择器（`A ~ B`）用于选择所有跟在A元素后面的同级B元素，不论B元素是否紧邻A元素。只要B元素与A元素具有相同的父元素，并且在A元素之后，就会被选中。

```html
<div class="example">
    <p>这段落不会被选中，因为它在标题之前。</p>
    <h2>标题</h2>
    <div>这个div不会被选中，因为它不是p元素。</div>
    <p>这段落会被选中，因为它跟在标题之后。</p>
    <section>
        <p>这段落不会被选中，因为它不是标题的同级元素。</p>
    </section>
    <p>这段落也会被选中，因为它跟在标题之后。</p>
</div>
```

```css
h2 ~ p {
  color: green;
}
```

这条CSS规则会选中所有在`<h2>`元素之后的同级`<p>`元素，并将其文本颜色设置为绿色。在这个例子中，它将选中以下两个段落：

```html
<p>这段落会被选中，因为它跟在标题之后。</p>
<p>这段落也会被选中，因为它跟在标题之后。</p>
```

### 属性选择器

```html
<input type="text" name="username" value="user123">
<input type="password" name="password">
<input type="text" name="search" value="Search...">
<a href="https://www.example.com">Visit Example.com</a>
<a href="https://www.test.com">Visit Test.com</a>
```

1. 存在和值属性选择器

   - `[attr]`：选中具有指定属性的所有元素。
   - `[attr=value]`：选中具有特定属性值的元素。

   ```css
   /* 选中所有具有name属性的input元素 */
   input[name] {
     border: 2px solid blue;
   }
   
   /* 选中value属性为"Search..."的input元素 */
   input[value="Search..."] {
     background-color: yellow;
   }
   ```

2. 包含某值的属性选择器

   - `[attr*=value]`：选中属性中包含指定值的所有元素。

   ```css
   /* 选中href属性中包含"example"的所有a元素 */
   a[href*="example"] {
     color: green;
   }
   ```

3. 以某值开头或结尾的属性选择器

   - `[attr^=value]`：选中属性值以指定值开头的所有元素。
   - `[attr$=value]`：选中属性值以指定值结尾的所有元素。

   ```css
   /* 选中href属性以"https"开头的所有a元素 */
   a[href^="https"] {
     font-weight: bold;
   }
   
   /* 选中name属性以"word"结尾的所有input元素 */
   input[name$="word"] {
     border: 1px solid red;
   }
   ```

4. 以某值开头并分隔的属性选择器

   - `[attr|=value]`：选中属性值以指定值开头，后面紧跟连字符的所有元素。

   ```css
   /* 选中href属性以"https"开头并紧跟连字符的所有a元素 */
   a[href|="https"] {
     text-decoration: underline;
   }
   ```

在上面的代码中，`a[href|="https"]` 选择器没有匹配任何元素，因为没有`<a>`元素的`href`属性值是以`https`开头并紧跟连字符的。一个匹配该选择器的例子可能是`<a href="https-www.example.com">链接</a>`。

属性选择器非常灵活，可以用于定位具有特定属性或属性值的元素，这在表单样式化、链接样式化等方面尤其有用。

### 动态伪类（`:hover`、`:active`、`:focus`）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      /* :hover - 当用户鼠标悬停在元素上时应用样式 */
      button:hover {
        background-color: yellow;
      }

      /* :active - 当用户点击元素并且它处于激活状态时应用样式 */
      button:active {
        background-color: red;
      }

      /* :focus - 当元素获得焦点时（例如通过点击或使用键盘导航）应用样式 */
      input:focus {
        border-color: green;
      }
    </style>
  </head>
  <body>
    <button>悬停我</button>
    <br /><br />
    <input type="text" placeholder="点击或使用Tab键聚焦我" />
  </body>
</html>

```

- 当用户将鼠标悬停在`<button>`元素上时，按钮的背景颜色会变为黄色，这是`:hover`伪类的效果。
- 当用户按下并且正在点击`<button>`元素时，按钮的背景颜色会变为红色，这是`:active`伪类的效果。请注意，`:active`状态通常只在元素被按下的瞬间存在，一旦鼠标点击完成并释放，`:active`状态就会消失。
- 当`<input>`元素获得焦点时，比如用户点击它或者使用Tab键将焦点移动到它上面时，输入框的边框颜色会变为绿色，这是`:focus`伪类的效果。

动态伪类在交互设计中非常有用，它们可以提供视觉反馈，让用户知道他们的交互操作，如悬停、点击或聚焦，已经被识别。

### 目标伪类（`:target`）

目标伪类 `:target` 用于选中文档中的目标元素，该元素的ID与当前URL的片段标识符（也称为“哈希”）相匹配。当用户点击一个链接，该链接指向一个页面内ID时，拥有该ID的元素就会成为目标元素。

```html
<style>
/* 使用 :target 伪类高亮显示被选中的目标元素 */
:target {
  background-color: yellow;
}
</style>

<h2 id="section1">第一节</h2>
<p>一些内容...</p>

<h2 id="section2">第二节</h2>
<p>更多内容...</p>

<nav>
  <ul>
    <li><a href="#section1">跳转到第一节</a></li>
    <li><a href="#section2">跳转到第二节</a></li>
  </ul>
</nav>
```

在这个例子中，当用户点击导航中的链接时，页面会滚动到相应的 `<h2>` 元素。如果URL的哈希部分是 `#section1`（例如，页面URL是 `http://example.com/page.html#section1`），则具有ID `section1` 的 `<h2>` 元素会被选中并应用 `:target` 伪类的样式，其背景颜色会变成黄色。

相同的规则适用于ID为 `section2` 的元素。当URL的哈希部分是 `#section2` 时，`<h2 id="section2">` 元素的背景颜色会变成黄色。

`:target` 伪类非常有用，可以用来指示用户当前查看的页面部分，特别是在制作单页应用或有很多片段链接的文档时。

### UI元素状态伪类（`:checked`、`:disabled`）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      /* 使用 :checked 伪类为选中的复选框和单选按钮应用样式 */
      input[type='checkbox']:checked,
      input[type='radio']:checked {
        outline: 2px solid green;
      }

      /* 使用 :disabled 伪类为禁用的表单控件应用样式 */
      input:disabled {
        opacity: 0.5;
      }
    </style>
  </head>
  <body>
    <form>
      <label> <input type="checkbox" name="option1" checked /> 选项 1 </label>
      <label> <input type="checkbox" name="option2" /> 选项 2 </label>
      <br />
      <label> <input type="radio" name="choice" checked /> 选择 A </label>
      <label> <input type="radio" name="choice" /> 选择 B </label>
      <br />
      <input type="text" value="我是禁用的" disabled />
      <input type="text" value="我是可用的" />
    </form>
  </body>
</html>

```

- `input[type="checkbox"]:checked` 和 `input[type="radio"]:checked` 选择器分别选中了被选中的复选框和单选按钮，并为它们应用了一个绿色的轮廓。
- `input:disabled` 选择器选中了所有禁用的输入框，并将它们的不透明度设置为 0.5，使其看起来呈现灰色（或半透明）效果，表明这些控件当前不可交互。

这些伪类使得基于控件状态的样式化变得简单，无需额外的JavaScript或类添加，提升了表单元素的用户体验。

### 结构伪类（`:first-child`、`:last-child`、`:nth-child()`、`:nth-last-child()`、`:only-child`）

```html
<div class="list">
  <p>段落 1</p>
  <p>段落 2</p>
  <p>段落 3</p>
  <p>段落 4</p>
</div>
```

1. **`:first-child`** - 选择第一个子元素。

```css
.list p:first-child {
  color: red;
}
```

​	这将使得“段落 1”变为红色，因为它是 `.list` 的第一个子元素。

2. **`:last-child`** - 选择最后一个子元素。

```css
.list p:last-child {
  color: blue;
}
```

​	这将使得“段落 4”变为蓝色，因为它是 `.list` 的最后一个子元素。

3. **`:nth-child()`** - 选择父元素的第n个子元素。

```css
.list p:nth-child(2) {
  font-weight: bold;
}
```

这将使得“段落 2”字体加粗，因为它是 `.list` 的第二个子元素。

4. **`:nth-last-child()`** - 选择父元素的倒数第n个子元素。

```css
.list p:nth-last-child(3) {
  background-color: yellow;
}
```

这将使得“段落 2”背景变为黄色，因为它是 `.list` 的倒数第三个子元素。

5. **`:only-child`** - 选择没有兄弟元素的元素，即它是其父元素的唯一子元素。

```html
<div class="single">
  <p>这是唯一的段落</p>
</div>
```

```css
.single p:only-child {
  border: 2px solid green;
}
```

这将给 `.single` 中的 `<p>` 元素添加一个绿色边框，因为它是其父元素的唯一子元素。 有多个的话就无效了。

```html
<ul>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 4</li>
  <li>List Item 5</li>
  <li>List Item 6</li>
  <li>List Item 7</li>
  <li>List Item 8</li>
  <li>List Item 9</li>
  <li>List Item 10</li>
</ul>
```

可以使用 `:nth-child()` 选择器的不同模式来选择这个列表中的一批元素：

1. **选择偶数项** - 使用关键词 `even` 可以选择所有偶数位置的 `<li>` 元素：

```css
ul li:nth-child(even) {
  background-color: lightgray;
}
```

这会将背景颜色设置为浅灰色的列表项为：List Item 2, List Item 4, List Item 6, List Item 8, List Item 10。

2. **选择奇数项** - 使用关键词 `odd` 可以选择所有奇数位置的 `<li>` 元素：

```css
ul li:nth-child(odd) {
  background-color: lightblue;
}
```

这会将背景颜色设置为浅蓝色的列表项为：List Item 1, List Item 3, List Item 5, List Item 7, List Item 9。

3. **每隔三个元素选择一个** - 使用公式 `3n`（或 `3n+0`）可以每隔三个元素选择一个：

```css
ul li:nth-child(3n) {
  color: red;
}
```

这会将文本颜色设置为红色的列表项为：List Item 3, List Item 6, List Item 9。

4. **选择前三个元素** - 使用公式 :nth-child(-n+3)` 可以选择前三个元素：

```css
ul li:nth-child(-n+3) {
  font-weight: bold;
}
```

这会将字体加粗的列表项为：List Item 1, List Item 2, List Item 3。

### 否定伪类（`:not()`）

```html
<ul>
  <li class="red">红色项</li>
  <li class="blue">蓝色项</li>
  <li>无颜色项</li>
  <li class="green">绿色项</li>
  <li>另一个无颜色项</li>
</ul>
```

```css
li:not(.red) {
  border: 1px solid black;
}
```

这条CSS规则会选中所有不具有 `.red` 类的 `<li>` 元素，并为它们添加一个黑色边框。在这个例子中，它将选中以下元素：

```html
<li class="blue">蓝色项</li>
<li>无颜色项</li>
<li class="green">绿色项</li>
<li>另一个无颜色项</li>
```

这些元素都不包含 `.red` 类，因此会被选中并应用样式。而具有 `.red` 类的 `<li>` 元素则不会被选中，也不会应用这个样式。

`:not()` 伪类非常有用，特别是当你想为除了某些特定元素之外的所有元素应用样式时。它可以简化CSS规则，使你不必为排除的元素写额外的样式。

### 伪元素选择器

这些伪元素选择器提供了一种方法来向元素添加装饰性内容或者改变部分内容的样式。以下是每个伪元素的具体例子：

1. **`::before` 和 `::after`**:

```html
<p class="decorated">这是一段文本。</p>
```

```css
.decorated::before {
  content: "【";
  color: blue;
}

.decorated::after {
  content: "】";
  color: blue;
}
```

这个例子中，`::before` 伪元素在段落内容之前插入了一个蓝色的开方括号，而 `::after` 伪元素在内容之后插入了一个蓝色的闭方括号。

2. **`::first-line` 和 `::first-letter`**:

```html
<p class="fancy">这是一段非常非常非常长的文本，它可能会跨越多行，取决于视口的大小。</p>
```

```css
.fancy::first-line {
  font-weight: bold;
  color: green;
}

.fancy::first-letter {
  font-size: 200%;
  color: red;
}
```

在这个例子中，`::first-line` 伪元素将第一行文本的字体加粗并改为绿色，而 `::first-letter` 伪元素将第一个字母的字体大小增加到200%并改为红色。

3. **`::selection`**:

```html
<p>尝试选中这段文本看看会发生什么。</p>
```

```css
p::selection {
  background: yellow;
  color: black;
}
```

这个例子中，`::selection` 伪元素将用户选中的文本部分的背景设置为黄色，文本颜色设置为黑色。

伪元素允许你对文本的特定部分应用样式或者添加额外的内容，而不需要更改HTML结构，这在提升页面的视觉效果和用户体验方面非常有帮助。