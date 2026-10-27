# @dandan-ui/theme

dan-ui 设计 Token 与基础样式（CSS 变量，前缀 `dan-`）。

**官网：** [https://dandanhub.vip/dan-ui](https://dandanhub.vip/dan-ui)

## 安装

```bash
pnpm add @dandan-ui/theme
```

## 使用

```ts
import '@dandan-ui/theme'
```

或：

```ts
import '@dandan-ui/theme/index.css'
```

配合组件库时，通常与 `@dandan-ui/ui` 一起引入：

```ts
import '@dandan-ui/theme'
import '@dandan-ui/ui/style.css'
```

## 主题覆盖

通过 CSS 变量覆盖，例如：

```css
:root {
  --dan-color-primary: #2563eb;
}
```

## 文档

更多说明见仓库：[dan-ui](https://github.com/whr810012/dan-ui)
