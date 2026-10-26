# 介绍

**dan-ui** 是一套 Vue 3 通用基础 UI 组件库，一期覆盖：

1. 底座：ConfigProvider、Icon、主题 Token  
2. 表单：Button、Input、Textarea、Checkbox、Radio、Switch、Select、Form  
3. AI：Chat 系列、Markdown、StreamText 等  
4. 富文本：TipTap 封装（RichText + Toolbar）

## 安装（预览）

脚手架阶段包尚未发布到 npm，本地开发请使用 monorepo：

```bash
pnpm install
pnpm build
pnpm dev:play
pnpm dev:docs
```

业务侧未来用法：

```bash
pnpm add @dan-ui/ui @dan-ui/theme
```

```ts
import { createApp } from 'vue'
import DanUI from '@dan-ui/ui'
import '@dan-ui/theme'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

## 相关文档

- [设计纪要](/plans/2026-10-26-dan-ui-design)
- [实施计划](/plans/2026-10-26-dan-ui-implementation)
