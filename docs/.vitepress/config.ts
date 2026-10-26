import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

export default defineConfig({
  title: 'dan-ui',
  description: 'Vue 3 通用基础 UI 组件库',
  lang: 'zh-CN',
  srcExclude: ['**/plans/**', 'DOC_PLAN.md', 'components-roadmap.md'],
  themeConfig: {
    logo: undefined,
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: 'AI', link: '/ai/overview' },
      { text: '编辑器', link: '/editor/rich-text' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '引入方式', link: '/guide/import' },
            { text: '主题定制', link: '/guide/theming' },
            { text: 'Changelog', link: '/guide/changelog' },
          ],
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
        {
          text: '表单组件',
          items: [
            { text: 'Input', link: '/components/input' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Select', link: '/components/select' },
            { text: 'Form', link: '/components/form' },
          ],
        },
      ],
      '/ai/': [
        {
          text: 'AI 组件',
          items: [
            { text: '概览', link: '/ai/overview' },
            { text: 'Chat', link: '/ai/chat' },
            { text: 'ChatMessage', link: '/ai/chat-message' },
            { text: 'ChatInput', link: '/ai/chat-input' },
            { text: 'Markdown', link: '/ai/markdown' },
            { text: 'StreamText', link: '/ai/stream-text' },
            { text: 'CodeBlock', link: '/ai/code-block' },
            { text: 'Thinking', link: '/ai/thinking' },
            { text: 'Suggestion', link: '/ai/suggestion' },
            { text: 'GenerationControl', link: '/ai/generation-control' },
            { text: 'ModelSelect', link: '/ai/model-select' },
            { text: 'TokenUsage', link: '/ai/token-usage' },
            { text: 'Attachment', link: '/ai/attachment' },
            { text: 'Prompt', link: '/ai/prompt' },
          ],
        },
      ],
      '/editor/': [
        {
          text: '富文本',
          items: [
            { text: 'RichText', link: '/editor/rich-text' },
            { text: '扩展说明', link: '/editor/extensions' },
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
