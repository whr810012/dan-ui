# 主题定制

dan-ui 样式基于 CSS 变量，前缀为 `--dan-`。

## 默认主题

安装后引入：

```ts
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
```

`@dandan-ui/theme` 会在 `:root` 注入色板、字号、间距、圆角、阴影等 Token。

## 覆盖变量

在业务全局样式中覆盖即可：

```css
:root {
  --dan-color-primary: #0f766e;
  --dan-color-primary-hover: #0d9488;
  --dan-color-primary-active: #115e59;
  --dan-border-radius-md: 10px;
}
```

## ConfigProvider

`DanConfigProvider` 可统一尺寸，并通过 `theme` 注入局部 CSS 变量；也可传入 `locale`（内置 `zhCN` / `en`，组件默认文案走 `useLocale`）：

```vue
<script setup>
import { en } from '@dandan-ui/ui'
</script>

<template>
  <DanConfigProvider
    size="large"
    :locale="en"
    :theme="{ 'color-primary': '#0f766e' }"
  >
    <DanButton type="primary">主题按钮</DanButton>
  </DanConfigProvider>
</template>
```

`theme` 的 key 可为短名（如 `color-primary`，自动补成 `--dan-color-primary`），或完整 CSS 变量名。

局部覆盖只作用于 Provider 子树，便于分区换肤。

## 常用 Token

| 变量 | 说明 |
|------|------|
| `--dan-color-primary` | 主色 |
| `--dan-color-text` | 正文色 |
| `--dan-color-border` | 边框色 |
| `--dan-color-bg` | 背景色 |
| `--dan-font-size-md` | 默认字号 |
| `--dan-spacing-md` | 中等间距 |
| `--dan-radius-md` | 中等圆角 |
| `--dan-z-index-modal` | 模态层 z-index |
| `--dan-shadow-fixed-left` / `right` | 表格固定列阴影 |
| `--dan-color-on-media` | 叠在媒体上的浅色指示（如轮播点） |

完整列表见 `@dandan-ui/theme` 源码 `packages/theme/src/index.css`。

## 暗色

在根节点加上 `dark` class 或 `data-theme="dark"` 即可启用内置暗色 Token（与 VitePress 文档站暗色开关一致）：

```html
<html class="dark">
  <!-- 或 -->
<html data-theme="dark">
```

暗色预设会覆盖主色、文本、边框、背景、浮层、阴影与代码块色板；浮层组件使用 `--dan-color-bg-elevated`，加载遮罩使用 `--dan-color-loading-mask`。固定列阴影与媒体叠色指示也会切换到暗色专用 Token。

也可在暗色下继续局部覆盖：

```css
html.dark {
  --dan-color-primary: #38bdf8;
}
```

发版前暗色抽检步骤见 [发布与视觉清单](/guide/checklist)。
