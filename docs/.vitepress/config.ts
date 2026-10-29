import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'
import {
  SITE_DESCRIPTION,
  SITE_ORIGIN,
  faqJsonLd,
  homeJsonLd,
  pageTitle,
  pageUrl,
  socialHead,
  techArticleJsonLd,
} from './seo'

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
      { text: 'Typography（排版）', link: '/components/typography' },
      { text: 'Layout（布局）', link: '/components/layout' },
      { text: 'Grid（栅格）', link: '/components/grid' },
      { text: 'Segmented（分段控制器）', link: '/components/segmented' },
      { text: 'Splitter（分割面板）', link: '/components/splitter' },
      { text: 'Watermark（水印）', link: '/components/watermark' },
    ],
  },
  {
    text: '表单',
    items: [
      { text: 'Input（输入框）', link: '/components/input' },
      { text: 'InputTag（标签输入）', link: '/components/input-tag' },
      { text: 'InputNumber（数字输入）', link: '/components/input-number' },
      { text: 'Upload（上传）', link: '/components/upload' },
      { text: 'Slider（滑块）', link: '/components/slider' },
      { text: 'Rate（评分）', link: '/components/rate' },
      { text: 'DatePicker（日期选择）', link: '/components/date-picker' },
      { text: 'TimePicker（时间选择）', link: '/components/time-picker' },
      { text: 'Autocomplete（自动完成）', link: '/components/autocomplete' },
      { text: 'Cascader（级联选择）', link: '/components/cascader' },
      { text: 'CascaderPanel（级联面板）', link: '/components/cascader-panel' },
      { text: 'ColorPicker（颜色选择）', link: '/components/color-picker' },
      { text: 'Transfer（穿梭框）', link: '/components/transfer' },
      { text: 'TreeSelect（树选择）', link: '/components/tree-select' },
      { text: 'Mentions（提及）', link: '/components/mentions' },
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
      { text: 'CheckTag（可选标签）', link: '/components/check-tag' },
      { text: 'Link（文字链接）', link: '/components/link' },
      { text: 'Badge（徽标）', link: '/components/badge' },
      { text: 'Avatar（头像）', link: '/components/avatar' },
      { text: 'Alert（警告）', link: '/components/alert' },
      { text: 'Empty（空状态）', link: '/components/empty' },
      { text: 'Progress（进度条）', link: '/components/progress' },
      { text: 'Skeleton（骨架屏）', link: '/components/skeleton' },
      { text: 'Statistic（统计数值）', link: '/components/statistic' },
      { text: 'Countdown（倒计时）', link: '/components/countdown' },
      { text: 'QRCode（二维码）', link: '/components/qrcode' },
      { text: 'InfiniteList（无限列表）', link: '/components/infinite-list' },
      { text: 'Result（结果）', link: '/components/result' },
      { text: 'Descriptions（描述列表）', link: '/components/descriptions' },
      { text: 'Timeline（时间线）', link: '/components/timeline' },
      { text: 'Collapse（折叠面板）', link: '/components/collapse' },
      { text: 'Image（图片）', link: '/components/image' },
      { text: 'ImagePreview（图片预览）', link: '/components/image-preview' },
      { text: 'Card（卡片）', link: '/components/card' },
      { text: 'Carousel（走马灯）', link: '/components/carousel' },
      { text: 'Table（表格）', link: '/components/table' },
      { text: 'Tree（树形控件）', link: '/components/tree' },
      { text: 'Calendar（日历）', link: '/components/calendar' },
    ],
  },
  {
    text: '导航',
    items: [
      { text: 'Tabs（标签页）', link: '/components/tabs' },
      { text: 'Menu（菜单）', link: '/components/menu' },
      { text: 'Breadcrumb（面包屑）', link: '/components/breadcrumb' },
      { text: 'PageHeader（页头）', link: '/components/page-header' },
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
      { text: 'Popconfirm（气泡确认）', link: '/components/popconfirm' },
      { text: 'Dropdown（下拉菜单）', link: '/components/dropdown' },
      { text: 'FloatButton（悬浮按钮）', link: '/components/float-button' },
      { text: 'Tour（漫游式引导）', link: '/components/tour' },
    ],
  },
  {
    text: 'AI',
    items: [
      { text: '概览', link: '/ai/overview' },
      { text: '工作台配方', link: '/ai/workspace' },
      { text: 'Chat（对话容器）', link: '/ai/chat' },
      { text: 'ChatWorkspace（工作台布局）', link: '/ai/chat-workspace' },
      { text: 'ChatMessage（消息）', link: '/ai/chat-message' },
      { text: 'ConversationList（会话列表）', link: '/ai/conversation-list' },
      { text: 'ChatInput（输入）', link: '/ai/chat-input' },
      { text: 'ToolCallCard（工具调用）', link: '/ai/tool-call-card' },
      { text: 'AgentSteps（Agent 步骤）', link: '/ai/agent-steps' },
      { text: 'MediaPreview（多模态预览）', link: '/ai/media-preview' },
      { text: 'ArtifactPanel（结果侧栏）', link: '/ai/artifact-panel' },
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
      { text: 'PromptLibrary（提示词库）', link: '/ai/prompt-library' },
      { text: 'PromptTemplate（变量模板）', link: '/ai/prompt-template' },
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
  // 生产挂载在 https://dandanhub.vip/dan-ui/
  base: '/dan-ui/',
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
            { text: '何时用 dan-ui', link: '/guide/why-dan-ui' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '最佳实践', link: '/guide/best-practices' },
            { text: '无障碍与键盘', link: '/guide/accessibility' },
            { text: '常见问题', link: '/guide/faq' },
            { text: '发布清单', link: '/guide/checklist' },
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/whr810012/dan-ui' },
    ],
  },
  sitemap: {
    hostname: SITE_ORIGIN,
  },
  transformPageData(pageData) {
    const isHome = pageData.relativePath === 'index.md'
    const description =
      pageData.description ||
      pageData.frontmatter.description ||
      SITE_DESCRIPTION
    pageData.description = description
    pageData.title = pageTitle(
      pageData.frontmatter.title || pageData.title,
      isHome,
    )
  },
  transformHead({ pageData }) {
    const isHome = pageData.relativePath === 'index.md'
    const title = pageTitle(
      pageData.frontmatter.title || pageData.title,
      isHome,
    )
    const description =
      (pageData.description as string) ||
      pageData.frontmatter.description ||
      SITE_DESCRIPTION
    const url = pageUrl(pageData.relativePath)
    const head = [
      ...socialHead({ title, description, url }),
      ['meta', { name: 'description', content: description }],
    ]

    if (isHome) {
      head.push(...homeJsonLd())
    } else if (pageData.relativePath.includes('guide/faq')) {
      head.push(faqJsonLd())
    } else if (
      pageData.relativePath.startsWith('components/') ||
      pageData.relativePath.startsWith('ai/') ||
      pageData.relativePath.startsWith('editor/') ||
      pageData.relativePath.startsWith('guide/')
    ) {
      head.push(techArticleJsonLd({ title, description, url }))
    }

    return head
  },
  vite: {
    resolve: {
      alias: {
        '@dandan-ui/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
        '@dandan-ui/theme': resolve(
          __dirname,
          '../../packages/theme/src/index.css',
        ),
      },
    },
  },
})
