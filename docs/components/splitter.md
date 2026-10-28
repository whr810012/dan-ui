<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/splitter/basic.vue'
import basicSrc from './demos/splitter/basic.vue?raw'
</script>

# Splitter 分割面板

可拖拽调整的左右 / 上下分栏。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Splitter Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| layout | 方向 | `horizontal \| vertical` | `horizontal` |

## SplitterPanel Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 初始占比（%） | `number` | `50` |
| min | 最小占比（%） | `number` | `10` |
