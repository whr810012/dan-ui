<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/anchor/basic.vue'
import basicSrc from './demos/anchor/basic.vue?raw'
</script>

# Anchor 锚点

用于跳转到页面指定位置，并高亮当前章节。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Anchor Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| offset | 滚动偏移量 | `number` | `0` |
| bound | 判定激活的容差 | `number` | `15` |
| type | 风格 | `'default' \| 'underline'` | `'default'` |
| direction | 方向 | `'vertical' \| 'horizontal'` | `'vertical'` |

## AnchorLink Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| href | 目标 hash，如 `#section` | `string` | — |
| title | 文案（也可用默认插槽） | `string` | `''` |
