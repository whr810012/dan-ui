# 介绍

**dan-ui** 是一套 Vue 3 通用基础 UI 组件库，面向中后台与 AI 应用界面。

## 能做什么

- 搭建中后台常用界面：表单、展示、反馈浮层
- 组合 AI 对话与富文本能力（均作为组件提供）
- 通过 CSS 变量快速调整主题

## 设计原则

- 只做 Vue 3
- 样式基于 CSS 变量，便于覆盖与暗色扩展
- AI / 富文本不单独拆站，统一收在组件文档中
- AI 组件不内置具体大模型接口，由业务侧自行对接
- 组件提供清晰的 Props、Events、Slots，便于按需使用

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
- [主题定制](/guide/theming)
