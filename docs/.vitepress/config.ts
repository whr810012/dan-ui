import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

type SidebarGroup = {
  text: string
  collapsed?: boolean
  items: { text: string; link: string }[]
}

/** 侧栏分组默认折叠；当前页所在组会由 VitePress 自动展开 */
function collapsible(groups: SidebarGroup[]): SidebarGroup[] {
  return groups.map((group) => ({
    ...group,
    collapsed: group.collapsed ?? true,
  }))
}

const componentsSidebar = collapsible([
  {
    text: '基础',
    collapsed: false,
    items: [
      { text: 'ConfigProvider', link: '/components/config-provider' },
      { text: 'Button', link: '/components/button' },
      { text: 'Icon', link: '/components/icon' },
      { text: 'Space', link: '/components/space' },
      { text: 'Divider', link: '/components/divider' },
      { text: 'Layout', link: '/components/layout' },
      { text: 'Grid', link: '/components/grid' },
    ],
  },
  {
    text: '表单',
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
  {
    text: '数据展示',
    items: [
      { text: 'Tag', link: '/components/tag' },
      { text: 'Badge', link: '/components/badge' },
      { text: 'Avatar', link: '/components/avatar' },
      { text: 'Alert', link: '/components/alert' },
      { text: 'Empty', link: '/components/empty' },
      { text: 'Progress', link: '/components/progress' },
      { text: 'Skeleton', link: '/components/skeleton' },
      { text: 'Statistic', link: '/components/statistic' },
      { text: 'Result', link: '/components/result' },
      { text: 'Descriptions', link: '/components/descriptions' },
      { text: 'Timeline', link: '/components/timeline' },
      { text: 'Collapse', link: '/components/collapse' },
      { text: 'Image', link: '/components/image' },
      { text: 'Card', link: '/components/card' },
      { text: 'Carousel', link: '/components/carousel' },
      { text: 'Table', link: '/components/table' },
    ],
  },
  {
    text: '反馈',
    items: [
      { text: 'Loading', link: '/components/loading' },
      { text: 'Message', link: '/components/message' },
      { text: 'Dialog', link: '/components/dialog' },
      { text: 'Tooltip', link: '/components/tooltip' },
      { text: 'Popover', link: '/components/popover' },
      { text: 'Dropdown', link: '/components/dropdown' },
    ],
  },
  {
    text: 'AI',
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
  {
    text: '富文本',
    items: [
      { text: 'RichText', link: '/editor/rich-text' },
      { text: '扩展说明', link: '/editor/extensions' },
    ],
  },
])

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
      { text: 'Changelog', link: '/guide/changelog' },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    sidebar: {
      '/guide/': collapsible([
        {
          text: '指南',
          collapsed: false,
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '引入方式', link: '/guide/import' },
            { text: '主题定制', link: '/guide/theming' },
            { text: 'Changelog', link: '/guide/changelog' },
          ],
        },
      ]),
      '/components/': componentsSidebar,
      '/ai/': componentsSidebar,
      '/editor/': componentsSidebar,
    },
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
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
