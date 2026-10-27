<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/affix/basic.vue'
import basicSrc from './demos/affix/basic.vue?raw'
</script>

# Affix 固钉

将元素固定在可视区域。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Affix Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| offset | 偏移距离 | `number` | `0` |
| position | 固钉位置 | `'top' \| 'bottom'` | `'top'` |
| zIndex | 层级 | `number` | `100` |
| target | 滚动容器选择器或元素 | `string \| HTMLElement \| null` | `null`（window） |

## Affix Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 固定状态变化 | `(fixed)` |
| scroll | 滚动时 | `({ scrollTop, fixed })` |
