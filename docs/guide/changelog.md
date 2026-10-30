# Changelog

## 2.22.0

- Popconfirm：`trigger` 对齐 Popover（`click` / `hover` / `focus` / `contextmenu`）；补齐 `showAfter` / `hideAfter`

## 2.21.0

- Upload：拖拽区图标与 locale 文案；`dragText` / `tip` / `#tip`；自动展示 `limit` / `accept` 副文案

## 2.20.0

- Table：筛选面板改为确认 / 重置；无匹配结果时展示空筛提示与「清除筛选」

## 2.19.0

- Image：`previewSrcList` / `initialIndex` 多图预览，左右切换与 `switch` 事件
- Dropdown：`trigger` 增补 `focus` / `contextmenu`
- Select：`maxCollapseTags` 控制折叠标签展示数量

## 2.18.0

- Tabs：`closable` / `addable` / `editable`；`tabRemove` / `tabAdd` / `edit`；TabPane 可覆盖 `closable`

## 2.17.0

- Popover：`trigger` 增补 `focus` / `contextmenu`；文档补齐 `showAfter` / `hideAfter`
- Tooltip：`rawContent` HTML 渲染；`trigger` 增补 `click`

## 2.16.0

- Message / Notification：`offset`、`grouping`（相同内容合并计数）
- Form：`requireAsteriskPosition`；补齐 `labelPosition=left` 样式
- Checkbox：文档确认 `indeterminate`（已有能力）
- TimePicker：`isRange` 时间范围 + `clearable` 文档
- DatePicker：`unlinkPanels` 范围双面板独立翻月

## 2.15.0

- Rate：`clearable`（再点同星清空）；文档补齐 `allowHalf`
- Slider：`marks` 刻度标记（可点击跳转）

## 2.14.0

- Drawer：`resizable` / `v-model:size` / `minSize`；文档补齐 `destroyOnClose`
- Dialog：`alignCenter` / `draggable`；文档补齐 `destroyOnClose`

## 2.13.0

- Alert：`center`、`closeText`
- Tag：`hit` 描边强调

## 2.12.0

- Switch：`loading`、`beforeChange`（支持异步确认）
- InputNumber：完善 `precision` / 右侧控制文档与用例

## 2.11.0

- Progress：`textInside` / `striped` / `stripedFlow` / `indeterminate`
- Pagination：`sizes` / `jumper` 布局、`pageSizes`、`v-model:pageSize`、`size-change`

## 2.10.0

- Badge：`offset` / `showZero`
- Mentions：方向键与 Enter / Esc、`loading`、`filterOption`、`search`

## 2.9.0

- Autocomplete：`debounce` / `loading`、空态、方向键与 Enter 选择
- Textarea：`autosize`（`minRows` / `maxRows`）

## 2.8.1

- Upload：替换文件列表时释放 `blob:` 预览 URL，避免泄漏
- Cascader：规范 `normalizeCascaderPaths`，修复空数组 / 错误形态静默误判
- Empty：预设文案接入 locale（`search` / `network` / `permission`）
- Scrollbar：自定义 `tag` 时正确解析 `$el` 供 ResizeObserver 使用

## 2.8.0

- Upload：`listType="picture-card"` 照片墙；图片本地预览 URL

## 2.7.0

- Empty：`type` 预设（search / network / permission）、`image` URL、插画样式

## 2.6.0

- 新组件：Scrollbar（自定义滚动条、`native` / `always`、滚动方法暴露）

## 2.5.0

- Select：`remote` / `remoteMethod` / `loading` / `remoteDebounce`；选中 label 缓存

## 2.4.0

- 新组件：TimeSelect（`start` / `end` / `step` / `minTime` / `maxTime`）

## 2.3.0

- Cascader / CascaderPanel：`multiple` 多路径选择；触发器标签与 `maxTagCount`

## 2.2.0

- TreeSelect：`filterable` 面板搜索、`multiple` 多选标签、`maxTagCount` / `checkStrictly`

## 2.1.0

- Cascader / CascaderPanel：`filterable` 搜索、`virtual` 长列虚拟滚动；下拉复用 Panel
- FormItem：`dependencies` 依赖字段变化时重校验
- 文档：Image / Avatar / Carousel / Card 等 Demo 使用 `withBase`，适配 `/dan-ui/` 部署

## 2.0.0

- 生态文档：Admin 模板配方（登录壳 + 权限菜单）、从零搭建、版本与迁移承诺、图标扩展指南
- 确立 2.x 语义化版本与弃用策略（theme / ui 同号发布）
- 无运行时破坏性变更（相对 1.9）；升级以文档与承诺为主

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
