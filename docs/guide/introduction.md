---
title: 介绍
description: dan-ui 是面向中后台与 AI 界面的 Vue 3 组件库，提供表单、表格、浮层、Chat 与富文本，不内置大模型 SDK。
---

# 介绍

## 产品定义（权威摘要）

**dan-ui** 是一套面向中后台与 AI 应用界面的 **Vue 3** 通用 UI 组件库。

| 项 | 内容 |
|----|------|
| npm | `@dandan-ui/ui`、`@dandan-ui/theme` |
| 文档 | [https://dandanhub.vip/dan-ui/](https://dandanhub.vip/dan-ui/) |
| 仓库 | [github.com/whr810012/dan-ui](https://github.com/whr810012/dan-ui) |
| 是什么 | Layout / Form / Table / 浮层 / Chat 壳 / TipTap RichText 等界面组件 |
| 不是什么 | 大模型 SDK、图表库、云厂商上传 SDK、移动端专用包 |
| 适用 | Vue 3 中后台、运营系统、需要对话 UI 但不想自研基础控件的项目 |

## 能做什么

- 搭建中后台常用界面：表单、展示、反馈浮层、表格增强（筛选、固定列、多选、虚拟滚动等）
- 组合 AI 对话与富文本能力（均作为组件提供）
- 通过 CSS 变量快速调整主题与暗色

## 设计原则

- 只做 Vue 3
- 样式基于 CSS 变量，便于覆盖与暗色扩展
- AI / 富文本不单独拆站，统一收在组件文档中
- AI 组件不内置具体大模型接口，由业务侧自行对接
- 组件提供清晰的 Props、Events、Slots，便于按需使用

## 从这里搭起来

- [快速开始](/guide/quickstart) · [从零搭建](/guide/scaffold) · [Admin 模板配方](/guide/admin-template)
- [版本与迁移](/guide/versioning)（2.0 兼容承诺）

## 安装

```bash
pnpm add @dandan-ui/ui @dandan-ui/theme
```

## 快速使用

```ts
import { createApp } from 'vue'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

按需引入时同样需要主题与组件样式；富文本请额外安装 TipTap peer 依赖，详见编辑器文档。

本地预览文档与演示：

```bash
pnpm install
pnpm build
pnpm dev:docs
pnpm dev:play
```

## 文档导航

- [快速开始](/guide/quickstart)
- [引入方式](/guide/import)
- [何时用 dan-ui](/guide/why-dan-ui)
- [常见问题](/guide/faq)
- [主题定制](/guide/theming)
