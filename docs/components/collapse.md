<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/collapse/basic.vue'
import basicSrc from './demos/collapse/basic.vue?raw'
</script>

# Collapse 折叠面板

通过折叠面板收纳长内容。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
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
