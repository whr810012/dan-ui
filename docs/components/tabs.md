<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tabs/basic.vue'
import basicSrc from './demos/tabs/basic.vue?raw'
import Card from './demos/tabs/card.vue'
import cardSrc from './demos/tabs/card.vue?raw'
</script>

# Tabs 标签页

分隔内容上等同层级的视图。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 卡片样式

<DemoBlock :source="cardSrc">
  <Card />
</DemoBlock>

## Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前激活 tab 的 name | `string \| number` | — |
| type | 风格 | `'line' \| 'card'` | `'line'` |

## Tabs Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 激活项变化时 | `(name)` |
| tabClick | 点击 tab 时 | `(name)` |

## TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 唯一标识 | `string \| number` | — |
| label | 标题 | `string` | `''` |
| disabled | 禁用 | `boolean` | `false` |
