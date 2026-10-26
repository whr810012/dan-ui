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
      { text: '计划', link: '/plans/2026-10-26-dan-ui-design' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '介绍', link: '/guide/introduction' }],
        },
      ],
      '/plans/': [
        {
          text: '内部计划',
          items: [
            { text: '设计纪要', link: '/plans/2026-10-26-dan-ui-design' },
            {
              text: '实施计划',
              link: '/plans/2026-10-26-dan-ui-implementation',
            },
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
