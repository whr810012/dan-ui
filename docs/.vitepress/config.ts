import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

export default defineConfig({
  title: 'dan-ui',
  description: 'Vue 3 通用基础 UI 组件库',
  lang: 'zh-CN',
  themeConfig: {
    logo: undefined,
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '介绍', link: '/guide/introduction' }],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'ConfigProvider', link: '/components/config-provider' },
            { text: 'Button', link: '/components/button' },
            { text: 'Icon', link: '/components/icon' },
          ],
        },
      ],
    },
    socialLinks: [],
  },
  vite: {
    resolve: {
      alias: {
        '@dan-ui/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
        '@dan-ui/theme': resolve(
          __dirname,
          '../../packages/theme/src/index.css',
        ),
      },
    },
  },
})
