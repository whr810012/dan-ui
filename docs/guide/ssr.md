---
title: SSR / Nuxt
description: 在 Nuxt 与 SSR 场景使用 dan-ui：客户端专用组件、hydration 与样式引入注意点。
---

# SSR / Nuxt

dan-ui 以 **客户端组件** 为主：浮层 Teleport、`document`/`window`、焦点陷阱等依赖浏览器 API。可在 Nuxt / Vite SSR 中使用，但需注意下列约定。

## 推荐引入

```ts
// plugins/dan-ui.client.ts（Nuxt：仅客户端）
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DanUI)
})
```

按需引入时同样建议放在 **client** 插件，或对使用浮层 / 上传 / 日期面板的页面加 `<ClientOnly>`。

## 必须客户端渲染的能力

| 能力 | 原因 |
|------|------|
| Dialog / Drawer / MessageBox / Notification / Message | Teleport + `document.body` |
| Select / DatePicker / Dropdown / Popover 面板 | 定位依赖 `getBoundingClientRect` |
| Tour / Affix / BackTop | 滚动与视口 |
| Upload 分片 / abort | 浏览器 File / XHR |
| MessageBox 命令式 API | 运行时挂载 DOM |

服务端预渲染页面主体（Layout、Button、纯展示）通常没问题；上述组件请：

1. 包在 `<ClientOnly>` 内，或  
2. 仅在 `onMounted` 后打开，或  
3. 使用 `.client` 插件全量注册后，避免在 SSR 模板里命令式调用 `DanMessage` / `DanMessageBox`

## Hydration 注意

- **不要**在 setup 顶层读写 `window` / `localStorage` 决定首屏 DOM 结构（主题类名除外可用 cookie / 内联脚本）。
- 带随机 id 的属性（如部分 `aria-labelledby`）已尽量稳定；若业务侧自造 id，请保证 SSR / CSR 一致。
- ConfigProvider 的 `locale` 若依赖异步加载，首屏用默认 `zhCN`，客户端再切换，避免文案节点 mismatch。

## 样式

SSR 仍需在入口引入：

```ts
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
```

Nuxt 可写在 `nuxt.config` 的 `css` 数组，保证首屏有 Token，避免闪烁。

## 自检

1. `pnpm build` 产物在 Node 下 `import '@dandan-ui/ui'` 不抛「document is not defined」（命令式 MessageBox 仅在调用时检查 document）。
2. 文档站或 Nuxt 页：刷新后 Dialog 首次打开仍正常。
3. 暗色类名若挂在 `html`，用与框架一致的方式注入，避免 hydration 警告。
