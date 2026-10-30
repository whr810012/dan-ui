<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tooltip/basic.vue'
import basicSrc from './demos/tooltip/basic.vue?raw'
import Raw from './demos/tooltip/raw.vue'
import rawSrc from './demos/tooltip/raw.vue?raw'
</script>

# Tooltip 文字提示

鼠标悬停或聚焦时显示简短说明。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## HTML 内容

`rawContent` 将 `content` 按 HTML 渲染（请仅使用可信内容）。

<DemoBlock :source="rawSrc">
  <Raw />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 提示文案 | `string` | `''` |
| rawContent | 将 content 作为 HTML 渲染 | `boolean` | `false` |
| placement | 出现位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| trigger | 触发方式 | `'hover' \| 'focus' \| 'click'` | `'hover'` |
| disabled | 是否禁用 | `boolean` | `false` |
| showAfter | 显示延时（ms） | `number` | `100` |
| hideAfter | 隐藏延时（ms） | `number` | `100` |
| offset | 与触发元素间距 | `number` | `8` |
| visible | 受控显示 | `boolean` | — |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 触发元素 |
| content | 自定义提示内容 |
