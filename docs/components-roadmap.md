# dan-ui 组件路线图

> 当前基线：仓库 **`2.50.0`（完成里程碑）**｜npm 公开发布以 registry 为准（目标同步 `2.50.0`）。  
> **完整开发完成定义与排期：** [`plans/2026-11-03-completion-plan.md`](./plans/2026-11-03-completion-plan.md)

## 完成定义（已确认执行）

满足计划中的 D1–D7（功能面 + 单测/CI + 文档 + checklist + **npm 发 2.x** + 范围冻结）即视为完整。  
**自本文件起：默认不再开大面新组件**；只做 bugfix、文档、测试、小增强与发版。新组件需求进入「完成后维护池」。

## 现状一句话

中后台常用面 + AI 壳 + RichText 已齐。**M0–M1 已完成；M2 = 发布 `2.50.0` 到 npm + Release tag。**

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

## 明确不做

- 图表库（ECharts 等）
- 内置 LLM / 云厂商上传 SDK
- 移动端专用组件包 / React 版
- 富文本 CRDT 协作

## 冻结后允许做

| 类型 | 示例 |
|------|------|
| P0 发版阻塞 | CI、关键单测、checklist、npm 2.x |
| P1 深度 | Form/Table/Select 边界、a11y、暗色回归 |
| P2 工程 | 按组件 CSS、视觉回归、Nuxt/starter 示例 |

发版前抽检见 [发布与视觉清单](/guide/checklist)。
