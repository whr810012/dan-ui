# 介绍

**dan-ui** 是一套 Vue 3 通用基础 UI 组件库，面向中后台与 AI 应用界面。

## 能做什么

- 搭建基础表单与数据录入界面
- 组合 AI 对话相关展示与输入组件
- 集成富文本编辑能力
- 通过 CSS 变量快速调整主题

## 设计原则

- 只做 Vue 3
- 样式基于 CSS 变量，便于覆盖与暗色扩展
- AI 组件不内置具体大模型接口，由业务侧自行对接
- 组件提供清晰的 Props、Events、Slots，便于按需使用

## 安装

```bash
pnpm add @dan-ui/ui @dan-ui/theme
```

## 快速使用

```ts
import { createApp } from 'vue'
import DanUI from '@dan-ui/ui'
import '@dan-ui/theme'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

本地预览文档与演示：

```bash
pnpm install
pnpm build
pnpm dev:docs
pnpm dev:play
```
