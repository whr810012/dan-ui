<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/popover/basic.vue'
import basicSrc from './demos/popover/basic.vue?raw'
</script>

# Popover 弹出框

在触发元素旁展示一段富内容（标题 + 正文或自定义插槽）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| content | 正文 | `string` | `''` |
| placement | 位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |
| width | 面板宽度 | `string \| number` | `240` |
| disabled | 禁用 | `boolean` | `false` |
| visible | 受控显示 | `boolean` | — |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 触发元素 |
| title | 自定义标题 |
| content | 自定义正文 |
