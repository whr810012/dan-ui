<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/descriptions/basic.vue'
import basicSrc from './demos/descriptions/basic.vue?raw'
</script>

# Descriptions 描述列表

成组展示只读字段。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Descriptions Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| column | 列数 | `number` | `3` |
| border | 边框样式 | `boolean` | `false` |
| direction | 排列 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |

## DescriptionsItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签 | `string` | `''` |
| span | 占据列数 | `number` | `1` |
