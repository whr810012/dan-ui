# 快速开始

五分钟内在本地跑通 dan-ui。

## 环境

- Node.js >= 18
- pnpm >= 9

## 安装依赖

```bash
pnpm add vue @dan-ui/ui @dan-ui/theme
```

## 最小示例

```ts
import { createApp } from 'vue'
import DanUI from '@dan-ui/ui'
import '@dan-ui/theme'
import '@dan-ui/ui/style.css'
import { h } from 'vue'
import { DanButton } from '@dan-ui/ui'

createApp({
  render: () => h(DanButton, { type: 'primary' }, () => 'Hello dan-ui'),
}).use(DanUI).mount('#app')
```

## 本仓库联调

克隆本仓库后：

```bash
pnpm install
pnpm build
pnpm dev:play   # playground
pnpm dev:docs   # 文档站
```

## 下一步

- [引入方式](/guide/import)：全量 / 按需 / Resolver
- [主题定制](/guide/theming)：CSS 变量覆盖
- [AI 概览](/ai/overview)：假流式对话接入
- [富文本](/editor/rich-text)：TipTap 编辑器
