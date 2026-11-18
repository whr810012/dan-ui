---
title: 引入方式
description: dan-ui 全量注册、按需引入与 DanUIResolver 配置说明。
---

# 引入方式

## 全量注册

适合快速原型或全量使用组件库：

```ts
import { createApp } from 'vue'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

注册后可在模板中直接使用 `DanButton`、`DanForm` 等。

## 按需引入

```ts
import { DanButton, DanForm, DanFormItem, DanInput } from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
```

全量样式最省事；需要控制体积时可按组件加载（见下节）。

## unplugin-vue-components

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { DanUIResolver } from '@dandan-ui/ui/resolver'

export default {
  plugins: [
    Components({
      resolvers: [DanUIResolver()],
    }),
  ],
}
```

`DanUIResolver` 会解析以 `Dan` 开头的组件；默认附带 `sideEffects: '@dandan-ui/ui/style.css'`。

若只想解析组件、自行管理样式：

```ts
DanUIResolver({ importStyle: false })
```

## 按组件加载样式

构建产物同时输出 `dist/styles/<component>.css`（组件目录名，如 `button.css`、`table.css`），可按需引入：

```ts
import { DanButton } from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/styles/button.css'
```

- 文件名与组件目录同名（kebab-case），`animations.css` 提供浮层弹出动画等公共关键帧，用到浮层时一并引入；
- Token 来自 `@dandan-ui/theme`，始终需要引入；
- 全量 `@dandan-ui/ui/style.css` 仍然可用，两种方式不要重复引入同一组件的样式。

## 样式两件套

| 包路径 | 作用 |
|--------|------|
| `@dandan-ui/theme` | Token（`--dan-*`）与基础 reset |
| `@dandan-ui/ui/style.css` | 组件样式 |

缺少任一都会导致样式不完整。

## 富文本 peer 依赖

使用 `DanRichText` 时需自行安装 TipTap：

```bash
pnpm add @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-image @tiptap/pm
```
