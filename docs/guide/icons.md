---
title: 图标扩展
description: 使用内置 Icon、插槽自定义 SVG，或外置图标库与 dan-ui 共存。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import { DanIcon, DanSpace } from '@dandan-ui/ui'
</script>

# 图标扩展

`DanIcon` 内置一组常用线性图标（见 [Icon 组件](/components/icon)）。业务图标过多时，**不必**全部塞进组件库——用插槽或外置库即可。

## 内置 name

```vue
<DanIcon name="search" />
<DanIcon name="user" :size="18" />
```

完整列表在 Icon 文档「全部图标」。

## 插槽自定义 SVG（推荐扩展方式）

不传 `name` 时，默认插槽可放任意 SVG（继承 `currentColor` / size 样式）：

<DemoBlock>
  <DanSpace>
    <DanIcon :size="20" color="var(--dan-color-primary)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    </DanIcon>
    <DanIcon :size="20">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="8" />
      </svg>
    </DanIcon>
  </DanSpace>
</DemoBlock>

## 外置图标库

可与 [Iconify](https://iconify.design/) / 业务 SVG Sprite 并存：

- 导航、按钮旁：继续用 `DanIcon` 或插槽。
- 大量品牌 / 业务图标：用 `@iconify/vue` 等，**不要** PR 进 `@dandan-ui/ui` 内置表。

```vue
<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="mdi:account" width="20" />
</template>
```

## 何时贡献回组件库

仅当图标被 **多个官方组件默认态** 使用（如 Upload、Close）时，才适合加入 `iconMap`。其余场景优先插槽 / 外置。
