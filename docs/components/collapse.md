<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/collapse/basic.vue'
import basicSrc from './demos/collapse/basic.vue?raw'
import Icon from './demos/collapse/icon.vue'
import iconSrc from './demos/collapse/icon.vue?raw'
</script>

# Collapse 折叠面板

通过折叠面板收纳长内容。

## 基础用法

展开收起带高度动画；`accordion` 为手风琴模式。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 图标插槽

使用 `#icon` 自定义右侧图标，或 `hide-icon` 隐藏。

<DemoBlock :source="iconSrc">
  <Icon />
</DemoBlock>

## Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前展开项 | `string \| number \| Array` | `[]` |
| accordion | 手风琴模式 | `boolean` | `false` |

## CollapseItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| name | 唯一标识，默认用 title | `string \| number` | — |
| disabled | 禁用 | `boolean` | `false` |
| hideIcon | 隐藏默认箭头（有 `#icon` 时仍显示插槽） | `boolean` | `false` |

## CollapseItem Slots

| 插槽 | 说明 |
|------|------|
| default | 面板内容 |
| title | 自定义标题 |
| icon | 自定义右侧图标，作用域参数 `{ active }` |
