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
      {
        text: 'ConfigProvider（全局配置）',
        link: '/components/config-provider',
      },
      { text: 'Button（按钮）', link: '/components/button' },
      { text: 'Icon（图标）', link: '/components/icon' },
      { text: 'Space（间距）', link: '/components/space' },
      { text: 'Divider（分割线）', link: '/components/divider' },
      { text: 'Layout（布局）', link: '/components/layout' },
      { text: 'Grid（栅格）', link: '/components/grid' },
    ],
  },
  {
    text: '表单',
    items: [
      { text: 'Input（输入框）', link: '/components/input' },
      { text: 'Textarea（文本域）', link: '/components/textarea' },
      { text: 'Checkbox（多选框）', link: '/components/checkbox' },
      { text: 'Radio（单选框）', link: '/components/radio' },
      { text: 'Switch（开关）', link: '/components/switch' },
      { text: 'Select（选择器）', link: '/components/select' },
      { text: 'Form（表单）', link: '/components/form' },
    ],
  },
  {
    text: '数据展示',
    items: [
      { text: 'Tag（标签）', link: '/components/tag' },
      { text: 'Badge（徽标）', link: '/components/badge' },
      { text: 'Avatar（头像）', link: '/components/avatar' },
      { text: 'Alert（警告）', link: '/components/alert' },
      { text: 'Empty（空状态）', link: '/components/empty' },
      { text: 'Progress（进度条）', link: '/components/progress' },
      { text: 'Skeleton（骨架屏）', link: '/components/skeleton' },
      { text: 'Statistic（统计数值）', link: '/components/statistic' },
      { text: 'Result（结果）', link: '/components/result' },
      { text: 'Descriptions（描述列表）', link: '/components/descriptions' },
      { text: 'Timeline（时间线）', link: '/components/timeline' },
      { text: 'Collapse（折叠面板）', link: '/components/collapse' },
      { text: 'Image（图片）', link: '/components/image' },
      { text: 'Card（卡片）', link: '/components/card' },
      { text: 'Carousel（走马灯）', link: '/components/carousel' },
      { text: 'Table（表格）', link: '/components/table' },
    ],
  },
  {
    text: '导航',
    items: [
      { text: 'Tabs（标签页）', link: '/components/tabs' },
      { text: 'Menu（菜单）', link: '/components/menu' },
      { text: 'Breadcrumb（面包屑）', link: '/components/breadcrumb' },
      { text: 'Pagination（分页）', link: '/components/pagination' },
      { text: 'Steps（步骤条）', link: '/components/steps' },
      { text: 'Affix（固钉）', link: '/components/affix' },
      { text: 'BackTop（回到顶部）', link: '/components/back-top' },
      { text: 'Anchor（锚点）', link: '/components/anchor' },
    ],
  },
  {
    text: '反馈',
    items: [
      { text: 'Loading（加载）', link: '/components/loading' },
      { text: 'Message（消息）', link: '/components/message' },
      { text: 'MessageBox（弹框）', link: '/components/message-box' },
      { text: 'Notification（通知）', link: '/components/notification' },
      { text: 'Dialog（对话框）', link: '/components/dialog' },
      { text: 'Drawer（抽屉）', link: '/components/drawer' },
      { text: 'Tooltip（文字提示）', link: '/components/tooltip' },
      { text: 'Popover（弹出框）', link: '/components/popover' },
      { text: 'Dropdown（下拉菜单）', link: '/components/dropdown' },
    ],
  },
  {
    text: 'AI',
    items: [
      { text: '概览', link: '/ai/overview' },
      { text: 'Chat（对话容器）', link: '/ai/chat' },
      { text: 'ChatMessage（消息）', link: '/ai/chat-message' },
      { text: 'ChatInput（输入）', link: '/ai/chat-input' },
      { text: 'Markdown（渲染）', link: '/ai/markdown' },
      { text: 'StreamText（流式文本）', link: '/ai/stream-text' },
      { text: 'CodeBlock（代码块）', link: '/ai/code-block' },
      { text: 'Thinking（思考过程）', link: '/ai/thinking' },
      { text: 'Suggestion（建议）', link: '/ai/suggestion' },
      { text: 'GenerationControl（生成控制）', link: '/ai/generation-control' },
      { text: 'ModelSelect（模型选择）', link: '/ai/model-select' },
      { text: 'TokenUsage（用量）', link: '/ai/token-usage' },
      { text: 'Attachment（附件）', link: '/ai/attachment' },
      { text: 'Prompt（提示词）', link: '/ai/prompt' },
    ],
  },
  {
    text: '富文本',
    items: [
      { text: 'RichText（富文本）', link: '/editor/rich-text' },
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
      { text: '更新日志', link: '/guide/changelog' },
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
            { text: '更新日志', link: '/guide/changelog' },
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
