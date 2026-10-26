# dan-ui

Vue 3 通用基础 UI 组件库，覆盖表单基础、AI 对话界面与富文本编辑能力。

## 特性

- 基于 Vue 3.5+ 与 TypeScript
- CSS 变量主题，前缀 `dan-`，支持暗色覆盖
- 支持全量注册与按需引入
- 内置 ConfigProvider，可统一尺寸与主题变量
- AI 相关组件只提供 UI 与事件，不绑定具体模型接口

## 包说明

| 包名 | 说明 |
|------|------|
| `@dan-ui/ui` | 组件库主包 |
| `@dan-ui/theme` | 设计 Token 与基础样式 |

## 安装

```bash
pnpm add @dan-ui/ui @dan-ui/theme
```

使用富文本时，额外安装 TipTap peer 依赖：

```bash
pnpm add @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-image @tiptap/pm
```

## 全量注册

```ts
import { createApp } from 'vue'
import DanUI from '@dan-ui/ui'
import '@dan-ui/theme'
import '@dan-ui/ui/style.css'
import App from './App.vue'

createApp(App).use(DanUI).mount('#app')
```

## 按需引入

```ts
import { DanButton, DanInput, DanForm } from '@dan-ui/ui'
import '@dan-ui/theme'
import '@dan-ui/ui/style.css'
```

配合 `unplugin-vue-components`：

```ts
import Components from 'unplugin-vue-components/vite'
import { DanUIResolver } from '@dan-ui/ui/resolver'

export default {
  plugins: [
    Components({
      resolvers: [DanUIResolver()],
    }),
  ],
}
```

## 样式说明

| 引入 | 作用 |
|------|------|
| `@dan-ui/theme` | CSS 变量 Token、基础 reset |
| `@dan-ui/ui/style.css` | 组件样式 |

业务侧可用 CSS 变量覆盖主题，例如 `--dan-color-primary`。

## 本地开发

```bash
pnpm install
pnpm build
pnpm dev:play
pnpm dev:docs
```

常用脚本：

| 脚本 | 说明 |
|------|------|
| `pnpm build` | 构建 theme 与 ui |
| `pnpm test` | 运行单元测试 |
| `pnpm lint` | ESLint + Prettier 检查 |
| `pnpm gen <name>` | 生成组件脚手架 |
| `pnpm docs:build` | 构建文档站 |

## 仓库结构

```text
packages/ui      组件源码
packages/theme   CSS Token
docs/            VitePress 文档站
playground/      本地联调
scripts/         工程脚本
```

## 当前能力

- 基础：ConfigProvider、Button、Icon、Space、Divider、主题 Token
- 表单：Input、Textarea、Checkbox、Radio、Switch、Select、Form
- 展示：Tag、Badge、Avatar、Alert、Empty
- 反馈：Loading、Message、Dialog
- AI：Chat、ChatMessage、ChatInput、Markdown、StreamText、CodeBlock、Thinking、Suggestion、GenerationControl、ModelSelect、TokenUsage、Attachment、Prompt
- 富文本：RichText、EditorToolbar、EditorBubbleMenu（TipTap，支持 html/json）
