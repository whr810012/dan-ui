# Changelog

## 1.9.0

- Locale：扩展 `LocaleMessages`（dialog / datePicker / formList / agentSteps / toolCall 等），高频组件默认文案走 `useLocale`
- 文档：SSR / Nuxt 指南；发布清单补齐「可上生产」勾选；无障碍发版抽样矩阵
- 工程：`pnpm bundle:report` 本地产物体积报告

## 1.8.0

- 新组件：ChatWorkspace、AgentSteps、MediaPreview、PromptTemplate
- 工具：`patchChatToolPart`（按 `toolCallId` 流式就地更新）；ToolCallCard 支持 `streaming`
- 文档：AI 工作台整页配方

## 1.7.0

- Table：`loading` / `#loading` / `#empty`、`multiSort`（Shift 多列排序）、`exportCsv` / `exportData` / `export-csv`
- Form：`validate` 返回 `{ valid, fields }`，新增 `getFieldsState`；新组件 FormList（动态数组字段）
- DatePicker：`type="month" | "year" | "week"`

## 1.6.0

- 新组件：Typography（Text / Title / Paragraph）、CheckTag、QRCode、Countdown、InfiniteList、CascaderPanel
- Space：`compact` 紧凑贴合模式

## 1.5.0

- 新组件：InputTag、PageHeader、Link、ToolCallCard、ArtifactPanel、PromptLibrary
- Table：列宽拖拽（`column-resize-end`）、行拖拽排序（`rowDraggable` / `row-drag-end`）
- Tree：节点拖拽（`draggable` / `allowDrag` / `allowDrop` / `node-drag-end`）
- Form：`scrollToError`、`scrollToField`
- ConfigProvider：轻量 `locale`（内置 `zhCN` / `en`，`useLocale`）
- ChatInput：附件选择与拖拽、`v-model:attachments`、斜杠指令 `commands`；`send` 载荷改为 `{ content, attachments }`
- ChatMessage：工具段改用 ToolCallCard 可折叠展示

## 1.4.0

- 文档站 SEO：Open Graph / Twitter、canonical、按页 description、sitemap.xml、robots.txt、JSON-LD（WebSite / SoftwareApplication / TechArticle / FAQPage）
- 文档站 GEO：产品权威定义、FAQ、何时用 dan-ui、`llms.txt`
- 强化首页 / 介绍 / 快速开始的可摘要结构

## 1.3.0

- 新组件：Popconfirm、Segmented、Watermark、FloatButton / FloatButtonGroup、Splitter / SplitterPanel、Tour
- Select：`multiple` / `filterable` / `collapseTags` / `virtual`
- Table：可编辑单元格（`editable` + `cell-edit`）、列拖拽排序（`column-drag-end`，扁平表头）
- Upload：`getUploadedChunks` 断点续传跳过已传分片
- AI：ChatMessage 操作条与 `parts` 多段渲染；ConversationList 会话侧栏
- 富文本：表格扩展、图片上传钩子完善、`output="markdown"` / `getMarkdown` / `setMarkdown`

## 1.2.0

- 无障碍：Tabs 方向键 / Home / End 与 `aria-controls`；Menu / Tree 键盘导航；Dialog / Drawer 补齐 `aria-labelledby`
- 暗色：固定列阴影、轮播指示器改为主题 Token（`--dan-shadow-fixed-*`、`--dan-color-on-media*`）
- 文档：更新无障碍约定、最佳实践（含 1.1 表格 / 上传建议）、发布与视觉清单、主题 Token 说明

## 1.1.0

- Table：固定列（`fixed: 'left' | 'right'`）、行多选（`selection` / `selectedRowKeys`）、内容展开行（`expandable` / `#expand`）、合计行（`showSummary` / `summaryMethod`）
- DatePicker：`disabledDate`、快捷选项 `shortcuts`、`datetime` / `datetimerange`
- Upload：可中断的 `httpRequest`（返回 `{ abort }`，实例方法 `abort` / `abortAll`）、分片钩子（`chunkSize` / `beforeChunkUpload` / `retry`），不绑定云厂商 SDK

## 1.0.0

- 首次正式发布到 npm：`@dandan-ui/ui`、`@dandan-ui/theme`
- Table：支持多级表头（`columns[].children`）、树形数据（`tree` / `expandRowKeys`）、虚拟滚动（`virtual`）
- 无障碍：Select / Dropdown 支持方向键与 Enter；MessageBox 焦点陷阱与 `aria-labelledby`；Notification `aria-live`
- 主题：暗色 placeholder / disabled 文本加深；Table 表头强制使用 muted Token，避免被文档站全局 `th` 样式覆盖

## 0.0.1

- 基础：ConfigProvider、Button、Icon、Space、Divider、Layout、Row/Col、`@dandan-ui/theme`
- 表单：Input、InputNumber、Upload、Slider、Rate、DatePicker（含范围）、TimePicker、Autocomplete、Cascader、ColorPicker、Transfer、TreeSelect、Mentions、Textarea、Checkbox、Radio、Switch、Select、Form
- 展示：Tag、Badge、Avatar、Alert、Empty、Progress、Skeleton、Statistic、Result、Descriptions、Timeline、Collapse、Image、ImagePreview、Card、Carousel、Table（筛选 / 列显隐）、Tree、Calendar
- 导航：Tabs、Menu / SubMenu、Breadcrumb、Pagination、Steps、Affix、BackTop、Anchor
- 反馈：Loading、Message、MessageBox、Notification、Dialog、Drawer、Tooltip、Popover、Dropdown
- AI：Chat 系列、Markdown、StreamText、CodeBlock、Thinking、Suggestion、GenerationControl、ModelSelect、TokenUsage、Attachment、Prompt
- 富文本：RichText、EditorToolbar、EditorBubbleMenu（TipTap）
- 文档：侧栏中英对照、本地搜索、分组折叠；AI / 富文本并入「组件」侧栏；最佳实践 / 无障碍 / 发布清单
- 工程：全量 / 按需导出、`DanUIResolver`、质量门禁；`useFocusTrap`；Dialog / Drawer 焦点陷阱
- 主题：完善暗色 Token（elevated / overlay / code / loading），浮层与按钮适配暗黑模式
