---
title: 快速开始
description: 五分钟安装 @dandan-ui/ui 与 @dandan-ui/theme，用 Vue 3 渲染第一个 DanButton。
---

# 快速开始

本文可独立照做：安装依赖 → 全量引入主题与样式 → 渲染一个主色按钮。

## 环境

- Node.js >= 18
- 包管理器：pnpm / npm / yarn 均可（示例用 pnpm）

## 1. 安装

```bash
pnpm add vue @dandan-ui/ui @dandan-ui/theme
```

## 2. 入口注册（全量）

在应用入口（如 `main.ts`）写入：

```ts
import { createApp } from 'vue'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

说明：

- `@dandan-ui/theme`：设计 Token（颜色、间距等 CSS 变量）
- `@dandan-ui/ui/style.css`：组件样式
- `app.use(DanUI)`：注册全部组件；按需引入见 [引入方式](/guide/import)

## 3. 第一个组件

任意页面：

```vue
<script setup>
import { DanButton } from '@dandan-ui/ui'
</script>

<template>
  <DanButton type="primary">Hello dan-ui</DanButton>
</template>
```

或无 SFC 的最小挂载：

```ts
import { createApp, h } from 'vue'
import DanUI, { DanButton } from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'

createApp({
  render: () => h(DanButton, { type: 'primary' }, () => 'Hello dan-ui'),
})
  .use(DanUI)
  .mount('#app')
```

跑起来后，你应看到一个主色按钮。

## 本仓库联调（可选）

克隆 [dan-ui](https://github.com/whr810012/dan-ui) 后：

```bash
pnpm install
pnpm build
pnpm dev:play   # playground
pnpm dev:docs   # 文档站 https 本地预览
```

## 下一步

- [引入方式](/guide/import)：全量 / 按需 / Resolver
- [主题定制](/guide/theming)：CSS 变量覆盖
- [Table](/components/table)：中后台表格
- [AI 概览](/ai/overview)：假流式对话接入
- [富文本](/editor/rich-text)：TipTap 编辑器
- [FAQ](/guide/faq)：安装与 AI 边界
