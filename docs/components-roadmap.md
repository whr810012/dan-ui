# dan-ui 组件路线图

> 当前基线：**2.46.0**（`@dandan-ui/ui` / `@dandan-ui/theme` 同号）。  
> 早期「一期～五期」交付目标已完成；下文为**现状与后续方向**。

## 现状一句话

中后台常用面（布局 / 表单 / 表格 / 浮层 / 导航）+ AI 对话壳 + TipTap 富文本已齐；近期次版本以 **API 深度与交互打磨** 为主（如 AvatarGroup、Skeleton throttle、Timeline mode、Statistic 格式化等）。

## 已覆盖（按文档侧栏）

| 分组 | 代表组件 |
|------|----------|
| 基础 | ConfigProvider、Button、Icon、Space、Layout/Grid、Typography、Segmented、Splitter、Watermark… |
| 表单 | Input 系列、Select、Cascader、Date/Time、Upload、Transfer、TreeSelect、Mentions、Form/FormList… |
| 数据展示 | Table、Tree、Image、Descriptions、Timeline、Skeleton/SkeletonItem、Statistic、Carousel、Avatar/AvatarGroup… |
| 导航 | Tabs、Menu、Breadcrumb、Pagination、Steps、Affix、BackTop、Anchor… |
| 反馈 | Message/Box、Notification、Dialog、Drawer、Tooltip/Popover/Popconfirm、Tour、FloatButton… |
| AI | Chat 系列、ConversationList、ToolCallCard、AgentSteps、PromptLibrary… |
| 富文本 | RichText + TipTap 扩展说明 |

完整 API 与 Demo 见文档站侧栏；变更见 [Changelog](/guide/changelog)。

## 明确不做

- 图表库（ECharts 等）
- 内置 LLM / 云厂商上传 SDK
- 移动端专用组件包 / React 版
- 富文本 CRDT 协作

## 后续方向（按需排期）

| 优先级 | 方向 | 示例 |
|--------|------|------|
| P0 | 高频组件深度 | Table/Form/Select 边界、无障碍与暗色回归 |
| P1 | 展示与反馈补齐 | Watermark 图水印、Carousel 竖向、Skeleton 更多形态 |
| P2 | 工程体验 | 按组件拆 CSS、更多 SSR 示例、视觉回归 |

发版前抽检见 [发布与视觉清单](/guide/checklist)。
