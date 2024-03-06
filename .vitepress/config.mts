import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'biye-note',
  description: 'biyejun study notes',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      {
        text: '前端',
        items: [
          {
            text: '前端面试题',
            activeMatch: '/前端/前端面试题',
            link: '/前端/前端面试题/index',
          },
          {
            text: '现代 JavaScript 教程',
            items: [],
          },
          {
            text: '数据结构与算法',
            items: [],
          },
          {
            text: 'webpack',
            items: [],
          },
        ],
      },
    ],

    sidebar: {
      '/前端/前端面试题': {
        base: '/前端/前端面试题',
        items: [
          {
            text: 'HTML、CSS、浏览器',
            base: '/前端/前端面试题/HTML、CSS、浏览器',
            collapsed: true,
            items: [
              {
                text: 'html',
                base: '/前端/前端面试题/HTML、CSS、浏览器/html',
                items: [
                  {
                    text: '行内元素、块级元素和行内块元素',
                    link: '/行内元素、块级元素和行内块元素',
                  },
                ],
              },
              {
                text: 'css',
                base: '/前端/前端面试题/HTML、CSS、浏览器/css',
                items: [
                  {
                    text: 'css盒模型',
                    link: '/css盒模型',
                  },
                  {
                    text: 'BFC',
                    link: '/BFC',
                  },
                  {
                    text: '清除浮动',
                    link: '/清除浮动',
                  },
                  {
                    text: '一文读懂vertical-align',
                    link: '/一文读懂vertical-align',
                  },
                ],
              },
              {
                text: '浏览器优化首屏加载（关键渲染路径CRP评估）',
                base: '/前端/前端面试题/HTML、CSS、浏览器/浏览器优化首屏加载（关键渲染路径CRP评估）',
                items: [
                  {
                    text: '优化关键路径（引言篇）',
                    link: '/优化关键路径（引言篇）',
                  },
                  {
                    text: '构建DOM树和CSSDOM树',
                    link: '/构建DOM树和CSSDOM树',
                  },
                  {
                    text: '构建渲染树',
                    link: '/构建渲染树',
                  },
                  {
                    text: '阻塞渲染的CSS',
                    link: '/阻塞渲染的CSS',
                  },
                  {
                    text: '使用JavaScript添加交互',
                    link: '/使用JavaScript添加交互',
                  },
                  {
                    text: '评估关键渲染路径的几种方法',
                    link: '/评估关键渲染路径的几种方法',
                  },
                  {
                    text: '分析关键渲染路径性能',
                    link: '/分析关键渲染路径性能',
                  },
                  {
                    text: '优化关键渲染路径',
                    link: '/优化关键渲染路径',
                  },
                  {
                    text: '优化首屏加载的规则和建议',
                    link: '/优化首屏加载的规则和建议',
                  },
                ],
              },
              {
                text: '浏览器',
                base: '/前端/前端面试题/HTML、CSS、浏览器/浏览器',
                items: [
                  {
                    text: '微任务、宏任务、Event-Loop（nodejs篇）',
                    link: '/微任务、宏任务、Event-Loop（nodejs篇）',
                  },
                  {
                    text: '微任务、宏任务、Event-Loop（浏览器篇）',
                    link: '/微任务、宏任务、Event-Loop（浏览器篇）',
                  },
                  {
                    text: 'setTimeout 4ms延迟（科普）',
                    link: '/setTimeout 4ms延迟（科普）',
                  },
                  {
                    text: '事件冒泡和捕获',
                    link: '/事件冒泡和捕获',
                  },
                  {
                    text: '防抖和节流',
                    link: '/防抖和节流',
                  },
                  {
                    text: 'cookie、localstorage、sessinstorage、session',
                    link: '/cookie、localstorage、sessinstorage、session',
                  },
                ],
              },
            ],
          },
          {
            text: 'JS',
            base: '/前端/前端面试题/JS',
            collapsed: true,
            items: [
              {
                text: 'es5',
                base: '/前端/前端面试题/JS/es5',
                items: [
                  {
                    text: 'js中的this指向',
                    link: '/js中的this指向',
                  },
                  {
                    text: '原型链',
                    link: '/原型链',
                  },
                  {
                    text: 'call、apply、bind',
                    link: '/call、apply、bind',
                  },
                  {
                    text: 'js中的new关键字',
                    link: '/js中的new关键字',
                  },
                  {
                    text: 'js中的instanceof',
                    link: '/js中的instanceof',
                  },
                  {
                    text: 'typeof和Object.prototype.toString',
                    link: '/typeof和Object.prototype.toString',
                  },
                  {
                    text: 'js中数组Array的常用方法',
                    link: '/js中数组Array的常用方法',
                  },
                  {
                    text: 'js中的几种继承方法',
                    link: '/js中的几种继承方法',
                  },
                  {
                    text: '可迭代与类数组',
                    link: '/可迭代与类数组',
                  },
                  {
                    text: 'js中的作用域',
                    link: '/js中的作用域',
                  },
                  {
                    text: '闭包',
                    link: '/闭包',
                  },
                  {
                    text: '"new Function" 语法',
                    link: '/"new Function" 语法',
                  },
                  {
                    text: 'js中垃圾回收',
                    link: '/js中垃圾回收',
                  },
                  {
                    text: '数据类型',
                    link: '/数据类型',
                  },
                  {
                    text: 'js中的类型转换',
                    link: '/js中的类型转换',
                  },
                  {
                    text: 'js中==与===',
                    link: '/js中==与===',
                  },
                  {
                    text: 'js中的数字类型number',
                    link: '/js中的数字类型number',
                  },
                  {
                    text: 'js的字符串类型string',
                    link: '/js的字符串类型string',
                  },
                  {
                    text: 'js中String常用方法',
                    link: '/js中String常用方法',
                  },
                  {
                    text: 'js中Object的常用方法',
                    link: '/js中Object的常用方法',
                  },
                  {
                    text: '正则表达式（RegExp）和字符串（String）的方法',
                    link: '/正则表达式（RegExp）和字符串（String）的方法',
                  },
                  {
                    text: 'GMT、UTC和北京时间的关系',
                    link: '/GMT、UTC和北京时间的关系',
                  },
                  {
                    text: 'Date的常用方法',
                    link: '/Date的常用方法',
                  },
                  {
                    text: 'JSON的常用方法',
                    link: '/JSON的常用方法',
                  },
                  {
                    text: '对象的深拷贝与浅拷贝',
                    link: '/对象的深拷贝与浅拷贝',
                  },
                ],
              },
              {
                text: 'es6',
                base: '/前端/前端面试题/JS/es6',
                items: [
                  {
                    text: 'let和const',
                    link: '/let和const',
                  },
                  {
                    text: 'Promise',
                    link: '/Promise',
                  },
                  {
                    text: '解构赋值',
                    link: '/解构赋值',
                  },
                  {
                    text: 'Async、await',
                    link: '/Async、await',
                  },
                  {
                    text: 'Generator',
                    link: '/Generator',
                  },
                  {
                    text: 'Rest参数与Spread语法',
                    link: '/Rest参数与Spread语法',
                  },
                  {
                    text: 'Symbol类型',
                    link: '/Symbol类型',
                  },
                  {
                    text: 'Class基本语法',
                    link: '/Class基本语法',
                  },
                  {
                    text: '类继承',
                    link: '/类继承',
                  },
                ],
              },
              {
                text: '正则表达式',
                base: '/前端/前端面试题/JS/es6',
                items: [
                  {
                    text: '模式Patterns和修饰符flags',
                    link: '/模式Patterns和修饰符flags',
                  },
                  {
                    text: '字符类',
                    link: '/字符类',
                  },
                  {
                    text: 'Unicode：修饰符 “u” 和 class \p {}',
                    link: '/Unicode：修饰符 “u” 和 class \p {}',
                  },
                  {
                    text: '锚点（Anchors）：字符串开始^和末尾$',
                    link: '/锚点（Anchors）：字符串开始^和末尾$',
                  },
                  {
                    text: 'Flag "m" — 多行模式',
                    link: '/Flag "m" — 多行模式',
                  },
                  {
                    text: '词边界：\b',
                    link: '/词边界：\b',
                  },
                  {
                    text: '转义，特殊字符',
                    link: '/转义，特殊字符',
                  },
                  {
                    text: '集合和范围[...]',
                    link: '/集合和范围[...]',
                  },
                  {
                    text: '量词 `+, *, ?` 和 `{n}`',
                    link: '/量词 `+, *, ?` 和 `{n}`',
                  },
                  {
                    text: '贪婪量词和惰性量词',
                    link: '/贪婪量词和惰性量词',
                  },
                  {
                    text: '捕获组',
                    link: '/捕获组',
                  },
                  {
                    text: '模式中的反向引用：`\N` 和 `\k<name>`',
                    link: '/模式中的反向引用：`\N` 和 `\k<name>`',
                  },
                  {
                    text: '选择（OR）|',
                    link: '/选择（OR）|',
                  },
                  {
                    text: '前瞻断言与后瞻断言',
                    link: '/前瞻断言与后瞻断言',
                  },
                  {
                    text: '灾难性回溯',
                    link: '/灾难性回溯',
                  },
                  {
                    text: '粘性标志 "y"，在位置处搜索',
                    link: '/粘性标志 "y"，在位置处搜索',
                  },
                  {
                    text: '正则表达式（RegExp）和字符串（String）的方法',
                    link: '/正则表达式（RegExp）和字符串（String）的方法',
                  },
                ],
              },
            ],
          },

          {
            text: 'vue',
            base: '/前端/前端面试题/vue',
            collapsed: true,
            items: [
              {
                text: 'vue基础',
                base: '/前端/前端面试题/JS/vue基础',
              },
              {
                text: 'vue进阶',
                base: '/前端/前端面试题/JS/vue进阶',
                items: [],
              },
              {
                text: '微信小程序',
                base: '/前端/前端面试题/JS/微信小程序',
                items: [],
              },
            ],
          },

          {
            text: '计算机网络、网络安全',
            base: '/前端/前端面试题/计算机网络、网络安全',
            collapsed: true,
            items: [
              {
                text: '网络',
                base: '/前端/前端面试题/计算机网络、网络安全/网络',
              },
              {
                text: '安全相关',
                base: '/前端/前端面试题/计算机网络、网络安全/安全相关',
              },
            ],
          },

          {
            text: '前端工程化',
            base: '/前端/前端面试题/前端工程化',
            collapsed: true,
            items: [
              {
                text: 'webpack',
                base: '/前端/前端面试题/前端工程化/webpack',
              },
              {
                text: 'vite',
                base: '/前端/前端面试题/前端工程化/vite',
              },
            ],
          },
        ],
      },
    },

    /* sidebar: [
      {
        text: '前端面试题',
        link: '/前端/前端面试题/index',
        items: [
          {
            text: 'HTML、CSS、浏览器',
            items: [
              {
                text: 'html',
                items: [],
              },
              {
                text: 'css',
                items: [],
              },
              {
                text: '浏览器优化首屏加载（关键渲染路径CRP评估）',
                items: [],
              },
            ],
          },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ], */

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
