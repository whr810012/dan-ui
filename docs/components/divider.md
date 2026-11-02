<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/divider/basic.vue'
import basicSrc from './demos/divider/basic.vue?raw'
import Style from './demos/divider/style.vue'
import styleSrc from './demos/divider/style.vue?raw'
</script>

# Divider 分割线

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 线条样式

通过 `border-style` 设置 `solid` / `dashed` / `dotted`（`dashed` 布尔属性仍可用）。

<DemoBlock :source="styleSrc">
  <Style />
</DemoBlock>

## Divider Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| contentPosition | 文案位置（水平） | `'left' \| 'center' \| 'right'` | `'center'` |
| borderStyle | 边框样式 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| dashed | 是否虚线（兼容旧用法） | `boolean` | `false` |
