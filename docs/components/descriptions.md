<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/descriptions/basic.vue'
import basicSrc from './demos/descriptions/basic.vue?raw'
import Extra from './demos/descriptions/extra.vue'
import extraSrc from './demos/descriptions/extra.vue?raw'
</script>

# Descriptions 描述列表

成组展示只读字段。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 额外操作与标签宽

`#extra` 放标题右侧操作；`labelWidth` 统一标签列宽。

<DemoBlock :source="extraSrc">
  <Extra />
</DemoBlock>

## Descriptions Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| column | 列数 | `number` | `3` |
| border | 边框样式 | `boolean` | `false` |
| direction | 排列 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| labelWidth | 标签列宽 | `string \| number` | — |

## Descriptions Slots

| 插槽 | 说明 |
|------|------|
| title | 自定义标题 |
| extra | 标题右侧内容 |
| default | 描述项 |

## DescriptionsItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签 | `string` | `''` |
| span | 占据列数 | `number` | `1` |
