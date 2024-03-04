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
                base: '/html',
                items: [],
              },
              {
                text: 'css',
                base: '/css',
                items: [],
              },
              {
                text: '浏览器优化首屏加载（关键渲染路径CRP评估）',
                base: '/前端/前端面试题/HTML、CSS、浏览器/浏览器优化首屏加载（关键渲染路径CRP评估）',
                items: [],
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
                ],
              },
              {
                text: 'es6',
                items: [],
              },
              {
                text: '正则表达式',
                items: [],
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
