---
title: 版本与迁移
description: dan-ui 语义化版本约定、弃用策略与跨 major 迁移要点。
---

# 版本与迁移

从 **2.0** 起，公开 API 的兼容承诺按下列约定执行（npm：`@dandan-ui/ui` / `@dandan-ui/theme` 同步升版本）。

## 语义化版本

| 变更类型 | 版本 | 示例 |
|----------|------|------|
| 破坏性 API / 行为 | **major** `X.0.0` | 删除 Props、改 `validate` 返回值形状 |
| 新功能（兼容） | **minor** `x.Y.0` | 新组件、新可选 Props |
| 缺陷修复 / 文档 | **patch** `x.y.Z` | 样式回归、文案修正 |

主题包 `@dandan-ui/theme` 与 UI 包 **同号发布**；升级时请两个一起升。

## 弃用策略

1. 计划删除的 API 先在 Changelog 标 **Deprecated**，并保留至少一个 **minor** 周期。
2. 文档 API 表标注「弃用，请改用 …」。
3. major 版本可移除已弃用 API；迁移说明写在本节与 Changelog。

## 已知破坏性变更（摘要）

| 版本 | 变更 | 迁移 |
|------|------|------|
| 1.5 | `ChatInput` `send` 载荷改为 `{ content, attachments }` | 按对象解构 |
| 1.7 | `Form.validate()` 返回 `{ valid, fields }` | 使用 `.valid`，勿当 boolean |
| 2.0 | 无额外运行时破坏；确立版本承诺与 Admin / 脚手架文档 | 按文档接入即可 |

完整条目见 [更新日志](/guide/changelog)。

## 升级检查单

1. 阅读目标版本 Changelog。
2. `pnpm up @dandan-ui/ui @dandan-ui/theme`
3. 跑业务测试；重点回归 Form validate、Chat send、主题 CSS 变量。
4. 有 TypeScript 时看编译错误中的 Props / 导出类型。

## 兼容承诺范围

**承诺：** 文档列出的组件 Props / Events / 具名导出、`DanUIResolver`、CSS 变量 `--dan-*` 主 Token。  

**不承诺：** 未导出的内部路径、Demo 源码结构、文档站 URL 永久不变、未文档化的 DOM class 细节（`dan-` class 可作样式钩子，但重大布局 class 变更会进 minor/major 说明）。
