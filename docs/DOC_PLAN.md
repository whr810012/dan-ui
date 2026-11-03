# dan-ui 文档站计划

> 历史规划文档。信息架构与同步规则仍有效；阶段优先级以当前 **2.x** 为准，组件覆盖见 [`components-roadmap.md`](./components-roadmap.md)。

## 目标

用 **VitePress** 提供中文优先的组件文档站，保证「组件已交付 ⇒ 文档页同步存在」。

## 信息架构

```text
docs/
├── .vitepress/config.ts + theme/   # 注册 @dandan-ui/ui，Demo 容器
├── index.md                        # 品牌首页 + 安装 CTA
├── guide/                          # 指南（含 changelog / versioning / checklist）
├── components/                     # 基础 / 表单 / 展示 / 导航 / 反馈
├── ai/                             # AI 通用
├── editor/                         # 富文本
└── plans/                          # 设计/实施纪要（srcExclude，仅仓库阅读）
```

## 单页模板（强制）

1. 何时使用（可省略极简组件）
2. 基础用法（引用 `demos/**/*.vue`）
3. 常见变体
4. 与 Form 联用（适用时）
5. API 表格（Props / Events / Slots）
6. 无障碍备注（复杂交互组件）

## 与开发同步规则

每完成一个功能次版本，至少包含：

1. `packages/ui` 实现 + 单测  
2. `docs/components|ai|editor/<name>.md` 与 Demo  
3. `docs/guide/changelog.md` 条目 + 版本 bump  

指南类总览（介绍 / FAQ / checklist / roadmap）随 major 里程碑或明显过时时修订，避免长期停留在旧版号叙述。
