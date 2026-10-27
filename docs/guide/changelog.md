# Changelog

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
