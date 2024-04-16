# vue2插槽概要

## 什么是插槽，它们用于解决什么问题？

在Vue.js中，插槽（Slots）是一种组件模板的内容分发机制，它允许你将模板的一部分定义在子组件中，而这部分内容可以在父组件中填充和替换。插槽用于解决以下问题：

1. **内容组合**: 插槽允许开发者将不同的内容组合到组件的布局中。这样，你可以在组件的不同部分插入任何内容，包括静态文本、HTML标签、另一个组件等。
2. **复用性**: 通过插槽，你可以创建高度复用的组件模板，因为插槽使得组件的某些部分可以被不同的内容填充。这样，同一个组件可以被用于多种不同的情况和上下文。
3. **可定制性**: 插槽提供了一种定制组件内部内容的方式，而不必通过props传递大量数据或创建多个相似的组件变体。
4. **解耦**: 插槽有助于将父组件的内容和子组件的实现细节解耦。父组件可以决定如何填充子组件的插槽，而无需知道子组件的内部工作原理。
5. **作用域清晰**: 插槽可以清晰地定义子组件模板和父组件模板的作用域边界。插槽内的内容在父组件作用域中编译，而组件自身的模板在其自己的作用域中编译。

举个简单的例子，假设你有一个`<alert-box>`组件，你想让它显示不同的警告信息。使用插槽，你可以这样做：

```html
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>注意！</strong>
    <slot>默认警告信息</slot>
  </div>
</template>
```

在父组件中，你可以像这样使用`<alert-box>`组件，并提供自定义的内容：

```html
<alert-box>
  这是一个重要的警告信息。
</alert-box>
```

在这个例子中，`<alert-box>`组件定义了一个插槽，并提供了默认的内容。在父组件中使用时，插槽的默认内容被自定义的警告信息所替换。这样，你可以重用`<alert-box>`组件来显示不同的警告信息。

## 如何在父组件中使用插槽传递内容到子组件？

在Vue.js中，父组件可以通过插槽将内容传递到子组件中。这是通过在子组件的模板中定义一个 `<slot>` 元素来实现的，而在父组件中使用该子组件时，可以在其标签内部放置想要分发的内容。下面是一个简单的例子：

**子组件** (`ChildComponent.vue`):

```html
<template>
  <div class="child-component">
    <!-- 定义一个插槽 -->
    <slot>
      <!-- 这里是默认内容，如果父组件没有提供任何内容，将显示这里的内容 -->
      默认插槽内容
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent'
  // 组件逻辑
}
</script>
```

**父组件**:

```html
<template>
  <div class="parent-component">
    <!-- 在子组件标签内部放置想要分发的内容 -->
    <child-component>
      这是父组件传递给子组件的内容。
    </child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  }
  // 父组件逻辑
}
</script>
```

在这个例子中，`ChildComponent` 定义了一个插槽，而 `ParentComponent` 则向该插槽传递了一些自定义内容。当 `ChildComponent` 被渲染时，它的 `slot` 标签的位置将被 `ParentComponent` 中 `child-component` 标签内部的内容所替换。

如果 `ParentComponent` 没有提供任何内容，那么 `ChildComponent` 中的默认内容将被显示。这种方式使得父组件可以自定义子组件的某些部分，同时子组件可以提供回退内容，以防没有内容被提供。

## 描述匿名插槽和具名插槽的区别。

在Vue.js中，插槽分为匿名插槽（也称为默认插槽）和具名插槽。以下是它们之间的区别：

**匿名插槽（默认插槽）**:

- 匿名插槽没有名字，因此被称为默认插槽。
- 当子组件的模板中只有一个 `<slot>` 元素时，它就是一个匿名插槽。
- 在父组件中使用子组件时，任何不包裹在 `<template v-slot>` 中的内容都会被视为默认插槽的内容，填充到子组件的默认插槽中。

子组件：

```html
<template>
  <div>
    <slot>这里是默认内容，如果父组件没有提供内容，则显示这个。</slot>
  </div>
</template>
```

父组件：

```html
<child-component>
  这里是父组件传递给默认插槽的内容。
</child-component>
```

**具名插槽**:

- 具名插槽有一个唯一的名字，使得子组件可以有多个插槽。
- 在子组件的 `<slot>` 元素上使用 `name` 属性来定义具名插槽。
- 父组件中，使用 `<template>` 标签和 `v-slot` 指令（在Vue 2.6+中也可以使用缩写 `#`）来指定哪些内容属于哪个具名插槽。

子组件：

```html
<template>
  <div>
    <slot name="header">这里是头部的默认内容。</slot>
    <slot>这里是不具名插槽的默认内容。</slot>
    <slot name="footer">这里是底部的默认内容。</slot>
  </div>
</template>
```

父组件：

```html
<child-component>
  <!-- 具名插槽 'header' 的内容 -->
  <template v-slot:header>
    这里是父组件传递给头部插槽的内容。
  </template>

  <!-- 默认插槽的内容 -->
  这里是父组件传递给默认插槽的内容。

  <!-- 具名插槽 'footer' 的内容 -->
  <template v-slot:footer>
    这里是父组件传递给底部插槽的内容。
  </template>
</child-component>
```

通过使用具名插槽，父组件能够将内容精确地插入到子组件的指定位置，而默认插槽适用于简单场景，当只需要一个插槽时。具名插槽提供了更高的灵活性，尤其是在构建复杂的组件结构时。

## 解释作用域插槽（Scoped Slots）的概念。

作用域插槽（Scoped Slots）是Vue.js中的一个高级特性，它允许子组件将数据作为一个临时的作用域传递给父组件插槽的内容。这意味着父组件可以访问子组件中的数据，并在插槽内容中使用这些数据，就好像这些数据是在父组件内部定义的一样。

作用域插槽的主要用途是创建一个可重用的组件，这个组件可以将其内部数据暴露给使用它的父组件，使得父组件可以根据这些数据来定制渲染内容。

**如何定义作用域插槽：**

在子组件中，你可以通过 `<slot>` 元素的 `v-bind` 或简写 `:` 来传递数据给插槽。这样，`<slot>` 元素就成为了一个模板，其中可以包含可用于父组件的数据。

例如，子组件 `TodoList.vue` 可能包含一个作用域插槽，将单个待办项的数据传递给父组件：

```html
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <!-- 定义一个作用域插槽，并将 'todo' 对象作为属性传递给父组件 -->
      <slot name="todo" :todo="todo">
        <!-- 默认内容，如果父组件没有提供插槽内容 -->
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['todos'],
  // 组件逻辑
}
</script>
```

**如何使用作用域插槽：**

在父组件中，你可以使用 `<template>` 元素和 `v-slot` 指令来接收子组件传递的数据，并使用这些数据来定义插槽的内容。

例如，父组件可以这样使用 `TodoList` 组件，并接收作用域插槽中的 `todo` 数据：

```html
<template>
  <todo-list :todos="todos">
    <!-- 使用具名作用域插槽 'todo'，并定义如何使用传递的 'todo' 数据 -->
    <template v-slot:todo="{ todo }">
      <span class="todo-item">{{ todo.text }}</span>
      <span class="todo-status">状态：{{ todo.completed ? '完成' : '未完成' }}</span>
    </template>
  </todo-list>
</template>

<script>
import TodoList from './TodoList.vue';

export default {
  components: { TodoList },
  data() {
    return {
      todos: [
        { id: 1, text: '买牛奶', completed: false },
        { id: 2, text: '读书', completed: true },
        // ...
      ]
    };
  },
  // 父组件逻辑
}
</script>
```

在这个例子中，父组件通过 `TodoList` 的作用域插槽接收到每个待办项的 `todo` 数据，并使用这些数据来自定义显示待办项的方式。父组件可以决定如何渲染每个待办项的文本和状态，而不仅仅是使用子组件提供的默认内容。这为组件间的通信和内容的自定义提供了极大的灵活性。

## 如何使用作用域插槽传递数据？

在Vue.js中，使用作用域插槽来传递数据涉及两个步骤：首先在子组件中定义作用域插槽并传递数据，然后在父组件中通过作用域插槽接收并使用这些数据。

**1. 子组件中定义作用域插槽并传递数据：**

在子组件中，你可以使用 `<slot>` 元素，并通过 `v-bind` 或简写 `:` 将数据传递给这个插槽。这样，父组件就可以通过插槽访问到子组件中的数据。

```html
<!-- 子组件 -->
<template>
  <div>
    <slot :someData="dataToPass">默认内容</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataToPass: {
        message: "来自子组件的数据"
      }
    };
  }
}
</script>
```

在这个例子中，子组件通过 `someData` 属性传递了名为 `dataToPass` 的数据对象给作用域插槽。

**2. 父组件中使用作用域插槽接收数据：**

在父组件中，你需要使用 `<template>` 标签来包裹插槽的内容，并使用 `v-slot` 指令来接收子组件传递的数据。你可以为 `v-slot` 指定一个参数来接收数据，这个参数是一个对象，包含了从子组件传递过来的所有插槽属性。

```html
<!-- 父组件 -->
<template>
  <child-component>
    <template v-slot:default="slotProps">
      <p>{{ slotProps.someData.message }}</p>
    </template>
  </child-component>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  }
}
</script>
```

在这个例子中，父组件通过 `v-slot:default="slotProps"` 接收了子组件传递的 `someData` 数据，并在插槽内容中使用了 `slotProps.someData.message` 来显示消息。

注意：

- `v-slot:default` 可以简写为 `v-slot`，或者使用 `#` 作为缩写。例如，`<template v-slot="slotProps">` 或 `<template #default="slotProps">`。
- `default` 是针对匿名插槽的命名，如果是具名插槽，则应该使用对应的插槽名。例如，如果插槽是 `name="header"`，则使用 `v-slot:header`。
- 在Vue 2.6.0及以上版本中，`v-slot` 语法被引入。在旧版本中，你可能需要使用 `slot` 和 `slot-scope` 属性来达到相同的效果。

通过作用域插槽，父组件可以更灵活地定义如何显示子组件的数据，从而创建更复杂和强大的组件。

## 描述插槽内容的编译作用域问题。

在Vue.js中，插槽内容的编译作用域是一个重要概念，它涉及到插槽内容在哪个作用域内进行编译。理解这个概念对于正确使用插槽非常关键，尤其是当插槽内容需要访问父组件或子组件中的数据时。

**普通插槽的编译作用域：**

对于普通插槽（无论是匿名插槽还是具名插槽），插槽内容总是在父组件的作用域内编译的。这意味着插槽内部的所有模板表达式都应该使用父组件的数据和方法。

例如，如果父组件有一个数据属性 `parentData`，你可以在插槽内容中直接访问它：

父组件：

```html
<template>
  <child-component>
    <template v-slot>
      <p>{{ parentData }}</p>
    </template>
  </child-component>
</template>

<script>
export default {
  data() {
    return {
      parentData: "来自父组件的数据"
    };
  }
}
</script>
```

**作用域插槽的编译作用域：**

对于作用域插槽，插槽内容仍然在父组件的作用域内编译，但子组件可以通过插槽传递数据给父组件。父组件可以使用这些数据来渲染插槽内容，但这些数据必须通过 `<template>` 标签的 `v-slot` 指令或 `#` 缩写来接收。

子组件：

```html
<template>
  <div>
    <slot :childData="childData">默认内容</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childData: "来自子组件的数据"
    };
  }
}
</script>
```

父组件：

```html
<template>
  <child-component>
    <template v-slot="slotProps">
      <p>{{ slotProps.childData }}</p>
    </template>
  </child-component>
</template>
```

在这个例子中，即使 `childData` 来自子组件，父组件也可以通过 `v-slot` 指令传递给插槽的模板来访问它。

**总结：**

- 普通插槽的内容总是在父组件的作用域内编译。
- 作用域插槽允许子组件传递数据给父组件的插槽内容，但插槽内容仍然在父组件的作用域内编译。
- 作用域插槽提供了一种方式，使得父组件可以访问并使用子组件中的数据来渲染插槽内容，增加了组件间的灵活性和可交互性。

## 插槽中的内容是在父组件中编译还是在子组件中编译？

插槽中的内容是在父组件的作用域中编译的。这意味着当你在父组件模板中提供插槽内容时，你可以访问父组件中的数据和方法，而不是子组件中的数据和方法。

这个规则对于所有类型的插槽都适用，无论是默认插槽、具名插槽还是作用域插槽。父组件的模板定义了插槽的内容，因此插槽内容必须能够访问父组件的作用域。

然而，对于作用域插槽，虽然内容是在父组件的作用域中编译的，子组件可以提供额外的数据作为插槽的作用域。父组件可以通过一个特殊的 `<template>` 标签来接收这些作用域数据，并在插槽内容中使用它们。

这种设计允许父组件控制插槽内容的渲染，并且能够根据需要使用子组件提供的数据，从而实现高度灵活和可重用的组件设计。



## 在设计可复用的组件时，如何决定使用插槽？

在设计可复用的组件时，使用插槽是一种强大的方式来提供额外的内容定制化。以下是几个决定何时使用插槽的指导原则：

1. **内容复杂性**: 如果你的组件需要在特定区域显示不同的内容，这些内容可能包括纯文本、HTML标记、另一个组件或者动态内容，那么插槽是理想的选择。
2. **定制需求**: 当你预见到用户可能需要对组件的某些部分进行样式或结构上的定制时，使用插槽可以让用户插入自定义内容或组件。
3. **组件复用**: 如果你希望你的组件在不同的场景下被复用，并且每次使用时都可能有不同的内容或样式需求，插槽可以使得组件更加灵活。
4. **避免过多的props**: 如果你发现你的组件需要接受大量的props来处理内容变化，那么插槽可能是一个更好的解决方案。插槽可以减少props的数量，使得组件的使用更简洁。
5. **组件层次结构**: 当你的组件表示一个容器或框架，需要在其中填充不同的内容时，插槽是将内容传递到组件内部的一种自然方式。
6. **交叉关注点**: 如果组件的主要关注点与它应该显示的内容是分开的，那么使用插槽将内容作为交叉关注点传递进来是合理的。
7. **模板引用和作用域**: 当需要在插槽内容中访问父组件作用域中的数据时，或者需要子组件提供数据给插槽内容时（使用作用域插槽），插槽是实现这种模式的理想选择。

### 示例：

假设你正在创建一个可复用的模态框（Modal）组件，你希望用户能够自定义头部、内容和底部区域：

```html
<!-- ModalComponent.vue -->
<template>
  <div class="modal">
    <div class="modal-header">
      <slot name="header">默认头部</slot>
    </div>
    <div class="modal-body">
      <slot>默认内容</slot>
    </div>
    <div class="modal-footer">
      <slot name="footer">默认底部</slot>
    </div>
  </div>
</template>
```

使用这个模态框组件时，用户可以如下提供自定义的头部、内容和底部：

```html
<modal-component>
  <template #header>
    <h1>自定义头部标题</h1>
  </template>

  <p>这里是自定义的模态框内容，可以包含文本、图片、组件等。</p>

  <template #footer>
    <button>关闭</button>
  </template>
</modal-component>
```

总结来说，选择使用插槽的关键是考虑组件的灵活性、复用性和内容的定制需求。插槽提供了一种强大的方式来构建一个可定制并且易于维护的组件接口。

## 如何使用动态插槽名，并且为什么要使用它们？

动态插槽名允许你在运行时根据组件的状态或父组件的输入来决定使用哪个插槽。这在你想根据不同的条件来渲染不同的插槽内容时非常有用。动态插槽名提供了额外的灵活性，使得组件能够根据外部因素更改其内容布局。

### 如何使用动态插槽名：

在Vue 2和Vue 3中，你可以使用方括号 `[]` 来绑定动态插槽名。以下是如何使用动态插槽名的例子：

**子组件** (`DynamicSlotComponent.vue`):

```html
<template>
  <div>
    <!-- 使用动态插槽名，由 prop 'dynamicSlotName' 决定 -->
    <slot :name="dynamicSlotName"></slot>
  </div>
</template>

<script>
export default {
  props: ['dynamicSlotName']
}
</script>
```

**父组件**:

```html
<template>
  <dynamic-slot-component :dynamic-slot-name="slotName">
    <!-- 使用 v-slot:[dynamicSlotName] 指令来匹配子组件的动态插槽 -->
    <template v-slot:[slotName]>
      这是动态插槽内容
    </template>
  </dynamic-slot-component>
</template>

<script>
import DynamicSlotComponent from './DynamicSlotComponent.vue';

export default {
  components: { DynamicSlotComponent },
  data() {
    return {
      slotName: 'customSlotName' // 这个值可以根据需要动态更改
    };
  }
}
</script>
```

在这个例子中，父组件通过 `:dynamic-slot-name` prop 向子组件传递了插槽的名字。然后，父组件使用 `v-slot:[slotName]` 来提供内容给子组件的动态命名插槽。

### 为什么要使用动态插槽名：

1. **条件渲染**: 动态插槽名允许组件根据条件渲染不同的插槽内容，而不需要创建多个几乎相同的组件或者使用多个 `v-if`/`v-else` 条件块。
2. **组件复用**: 使用动态插槽名可以使得组件更加通用和灵活，因为它可以适应多种不同的使用场景，而不是为每个场景创建一个专用的插槽。
3. **减少模板复杂性**: 动态插槽名可以简化模板的复杂性，因为你可以在一个插槽中处理多个可能的内容，而不是为每种情况创建单独的插槽。
4. **动态组件行为**: 当组件的行为需要根据外部数据动态变化时，动态插槽名可以根据这些数据来调整组件的内容和布局。

总的来说，动态插槽名在需要根据应用状态或用户交互动态改变插槽内容时非常有用，它们提供了一种灵活且强大的方式来构建复杂的组件和用户界面。

## vue2与vue3插槽使用的相同点和不同点

Vue 2和Vue 3都支持插槽（Slots），它们是Vue组件系统的一个重要特性，允许开发者将可复用的组件与自定义内容结合起来。尽管Vue 3在很多方面进行了更新和改进，但是插槽的基本概念和大部分用法在两个版本中是相似的。

### 相同点：

**基本插槽**： 在Vue 2和Vue 3中，你都可以使用基本的无名插槽来分发内容。

子组件：

```html
<template>
  <div>
    <slot>默认插槽内容</slot>
  </div>
</template>
```

父组件：

```html
<template>
  <child-component>
    分发的内容
  </child-component>
</template>
```

**具名插槽**： 具名插槽在两个版本中都是通过在`<slot>`元素上使用`name`属性来定义的。

子组件：

```html
<template>
  <div>
    <slot name="header">默认头部内容</slot>
  </div>
</template>
```

父组件：

```html
<template>
  <child-component>
    <template v-slot:header>
      自定义头部内容
    </template>
  </child-component>
</template>
```

**作用域插槽**： 作用域插槽允许子组件将数据传递回插槽内容。这在Vue 2和Vue 3中都是通过在`<slot>`元素上绑定数据来实现的。

子组件：

```html
<template>
  <div>
    <slot :item="itemData">默认内容</slot>
  </div>
</template>
```

父组件：

```html
<template>
  <child-component>
    <template v-slot:default="slotProps">
      自定义内容 {{ slotProps.item }}
    </template>
  </child-component>
</template>
```

### 不同点：

**插槽的缩写语法**： Vue 3引入了一种新的缩写语法，可以使用`#`符号作为`v-slot`的简写。

Vue 3父组件使用缩写语法：

```html
<template>
  <child-component>
    <template #header>
      自定义头部内容
    </template>
  </child-component>
</template>
```

**动态插槽名**： Vue 3对动态插槽名的支持更加直观。你可以使用动态指令参数来定义动态插槽名。

Vue 3子组件：

```html
<template>
  <div>
    <slot :name="dynamicSlotName">默认内容</slot>
  </div>
</template>
```

Vue 3父组件：

```html
<template>
  <child-component>
    <template #[dynamicSlotName]>
      自定义内容
    </template>
  </child-component>
</template>
```

**全局API的变化**： Vue 3中，全局API发生了变化，影响到了如何访问插槽。在Vue 2中，你可能使用`this.$slots`和`this.$scopedSlots`，而在Vue 3中，`this.$scopedSlots`被合并到`this.$slots`中，而且插槽现在是函数。

**Fragment支持**： Vue 3支持Fragment，这意味着组件可以有多个根节点。在Vue 2中，你需要一个单一的根节点来包裹插槽，而Vue 3中，你可以在组件的根层级有多个插槽。

## vue2的 `this.$slots`和`this.$scopedSlots`

在Vue 2中，`this.$slots` 和 `this.$scopedSlots` 是两个不同的对象，它们用于访问组件内部的插槽内容。让我们来看看它们的区别和用法：

### `this.$slots`：

`this.$slots` 是一个包含所有未命名插槽内容的对象。每个键对应一个插槽的名字，而值是一个包含VNode节点的数组。默认插槽的内容可以通过 `this.$slots.default` 访问。如果你使用具名插槽，那么可以通过插槽名作为键来访问对应的内容。

例如，如果你有一个名为 `header` 的具名插槽，你可以通过 `this.$slots.header` 访问它的内容。

### `this.$scopedSlots`：

`this.$scopedSlots` 是一个包含所有作用域插槽的对象。与 `$slots` 不同，`$scopedSlots` 中的插槽被表示为返回VNode节点的函数而不是VNode节点数组。这允许父组件传递数据到子组件的作用域插槽中，且子组件可以决定如何使用这些数据来渲染插槽内容。

例如，如果你有一个作用域插槽 `item`，你可以通过 `this.$scopedSlots.item(props)` 来访问并渲染它的内容，其中 `props` 是一个包含从父组件传递给作用域插槽的数据的对象。

### 用法示例：

假设你有一个子组件 `ChildComponent`，它定义了一个默认插槽和一个作用域插槽 `item`：

```html
<template>
  <div>
    <slot>
      默认内容
    </slot>
    <slot name="item" :text="itemText"></slot>
  </div>
</template>

<script>
export default {
  props: ['itemText'],
  mounted() {
    console.log(this.$slots.default); // 访问默认插槽内容
    console.log(this.$scopedSlots.item({ text: this.itemText })); // 渲染作用域插槽内容
  }
}
</script>
```

父组件可能如下使用 `ChildComponent`：

```html
<template>
  <child-component item-text="Hello">
    <template v-slot:default>
      <p>这是父组件提供的默认插槽内容</p>
    </template>
    <template v-slot:item="slotProps">
      <p>{{ slotProps.text }}</p>
    </template>
  </child-component>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  }
}
</script>
```

在Vue 3中，`this.$scopedSlots` 和 `this.$slots` 被合并，以简化API。所有的插槽都通过 `this.$slots` 访问，作用域插槽现在是函数形式的插槽。这意味着在迁移到Vue 3时，你可能需要更新对作用域插槽的引用。

## vue3中的`this.$slots`

在Vue 3中，`this.$slots` API被简化了，将 `this.$scopedSlots` 和 `this.$slots` 合并为一个统一的 `this.$slots` 对象。这个改变使得处理插槽变得更简单，因为现在所有的插槽内容，包括作用域插槽和非作用域插槽，都可以通过 `this.$slots` 访问。

在Vue 3中，每个插槽都是一个函数，即使它不是作用域插槽。当你调用这些函数时，它们会返回对应的VNode数组。

### 如何使用 `this.$slots`：

**访问默认插槽内容**:

```js
const defaultSlotContent = this.$slots.default ? this.$slots.default() : [];
```

**访问具名插槽内容**:

```js
const headerSlotContent = this.$slots.header ? this.$slots.header() : [];
```

**访问作用域插槽内容**: 作用域插槽在Vue 3中以相同方式使用，但是你不再需要区分 `$scopedSlots` 和 `$slots`。

```js
const scopedSlotContent = this.$slots.item ? this.$slots.item({ itemProp: 'value' }) : [];
```

在上面的例子中，`item` 是作用域插槽的名字，`{ itemProp: 'value' }` 是传递给插槽的作用域数据。

### 示例：

假设你有一个子组件 `MyComponent`，它定义了一个默认插槽和一个名为 `header` 的具名插槽：

```html
<template>
  <div>
    <header>
      <!-- 具名插槽 'header' -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 默认插槽 -->
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
    // 访问默认插槽内容
    const defaultSlot = this.$slots.default ? this.$slots.default() : null;
    console.log(defaultSlot);

    // 访问具名插槽 'header' 的内容
    const headerSlot = this.$slots.header ? this.$slots.header() : null;
    console.log(headerSlot);
  }
}
</script>
```

父组件如下使用 `MyComponent` 并提供插槽内容：

```html
<template>
  <my-component>
    <!-- 提供 'header' 具名插槽的内容 -->
    <template #header>
      <h1>这是标题</h1>
    </template>
    <!-- 提供默认插槽的内容 -->
    <p>这是正文内容</p>
  </my-component>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent
  }
}
</script>
```

在Vue 3中，你可以更加直观地处理插槽内容，而不用担心是否需要使用 `$scopedSlots`。所有插槽都通过 `this.$slots` 访问，并且都是函数。这种改变使得组件的插槽逻辑更加统一和简洁。