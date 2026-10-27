# @dandan-ui/ui

Vue 3 通用基础 UI 组件库（dan-ui）。

## 安装

```bash
pnpm add @dandan-ui/ui @dandan-ui/theme
```

使用富文本时，额外安装 TipTap peer 依赖：

```bash
pnpm add @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-image @tiptap/pm
```

## 全量注册

```ts
import { createApp } from 'vue'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

## 按需引入

```ts
import { DanButton, DanInput, DanForm } from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
```

配合 `unplugin-vue-components`：

```ts
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

## 样式

| 引入 | 作用 |
|------|------|
| `@dandan-ui/theme` | CSS 变量 Token、基础 reset |
| `@dandan-ui/ui/style.css` | 组件样式 |

## 文档

完整文档与仓库：[dan-ui](https://github.com/whr810012/dan-ui)
