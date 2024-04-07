# display grid 概要

1. **Grid 基本概念**:

   - 什么是 CSS Grid 布局？

     CSS Grid 布局是一个二维布局系统，允许开发者创建复杂的网格布局，这是一个在行和列上同时控制布局的方法。

   - Grid 布局与 Flexbox 有什么不同？

     与 Flexbox 相比，Grid 帜局主要针对二维布局（可以同时处理行和列），而 Flexbox 更适合一维布局（要么处理行，要么处理列）。Grid 提供了对网格内部元素位置和尺寸的精确控制。

2. **Grid 容器属性**:

   - `display: grid` 和 `display: inline-grid` 有什么区别？

     `display: grid;` 创建一个块级网格，`display: inline-grid;` 创建一个行内网格。

   - `grid-template-columns` 和 `grid-template-rows` 如何定义网格的列和行？

     `grid-template-columns` 和 `grid-template-rows` 用于定义网格的列宽和行高，可以指定固定尺寸、百分比或使用`fr`单位来分配可用空间。

   - `grid-gap`（或 `row-gap` 和 `column-gap`）属性是做什么的？

     `grid-gap`（现在推荐使用 `gap`，`row-gap` 和 `column-gap`）定义了网格项之间的间隙。

   - `grid-auto-flow` 属性是如何工作的？

     `grid-auto-flow` 控制自动放置网格项的顺序，可以是`row`、`column`或`dense`（尝试填充网格的空白区域）。

3. **Grid 项目属性**:

   - `grid-column-start`, `grid-column-end`, `grid-row-start` 和 `grid-row-end` 如何确定网格项的位置？

     `grid-column-start`, `grid-column-end`, `grid-row-start` 和 `grid-row-end` 指定网格项的起始和结束位置，可以是数字或命名网格线。

   - `grid-column` 和 `grid-row` 是什么？

     `grid-column` 和 `grid-row` 是上述属性的简写形式，用于指定网格项在网格中的位置和跨越的列或行数。

   - `grid-area` 属性是如何使用的？

     `grid-area` 用于指定网格项在网格中的位置，可以用来引用网格模板中的命名区域。

   - `justify-self`, `align-self`, 和 `place-self` 如何控制单个网格项？

     `justify-self`, `align-self`, 和 `place-self` 控制网格项在其网格区域内的对齐方式，分别是水平对齐、垂直对齐和两者的简写形式。

4. **复杂网格布局**:

   - 如何使用命名网格线或网格区域来创建布局？

     使用命名网格线（例如 `grid-template-columns: [start] 1fr [middle] 1fr [end];`）或网格区域（通过 `grid-template-areas`）可以创建更加结构化和可读的布局。

   - 如何创建响应式网格布局？

     创建响应式网格布局通常涉及使用媒体查询来调整`grid-template-columns`和`grid-template-rows`的值，以适应不同的屏幕尺寸。

5. **布局技术**:

   - 如何使用 Grid 布局来实现常见的布局模式，如三栏布局、圣杯布局或砌石布局？

     三栏布局可以通过指定三个列宽来实现，例如 `grid-template-columns: 1fr 2fr 1fr;`。

     圣杯布局和砌石布局可以通过组合`grid-template-areas`和其他Grid属性来创建。

   - 如何在网格布局中使用媒体查询来创建响应式设计？

     媒体查询可以与Grid属性结合使用，以根据屏幕大小调整布局。

6. **浏览器兼容性**:

   - Grid 布局在不同浏览器上的支持情况如何？

     Grid布局得到了所有现代浏览器的广泛支持。然而，一些旧版本的浏览器，如IE11，对Grid的支持是基于旧版本的规范，可能需要特殊处理。

   - 如何处理不支持 Grid 的浏览器？

     对于不支持Grid的浏览器，可以使用功能检测（如Modernizr）并提供一个回退布局，通常使用Flexbox或传统的浮动和定位技术。

7. **性能和最佳实践**:

   - 使用 Grid 布局时应注意哪些性能问题？

     性能问题通常不是Grid布局的主要担忧点，但在创建非常大和复杂的网格时需要注意。

   - 有哪些最佳实践可以帮助提高网格布局的可维护性和可扩展性？

     最佳实践包括使用命名网格线和区域以提高代码的可读性，以及使用最小化和适用的代码来创建所需的布局。