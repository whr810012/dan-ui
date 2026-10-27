<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/date-picker/basic.vue'
import basicSrc from './demos/date-picker/basic.vue?raw'
import Range from './demos/date-picker/range.vue'
import rangeSrc from './demos/date-picker/range.vue?raw'
</script>

# DatePicker 日期选择器

选择单日或日期范围（`YYYY-MM-DD`）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 范围选择

<DemoBlock :source="rangeSrc">
  <Range />
</DemoBlock>

## DatePicker Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 单日 `string`，范围 `[string, string]` | `string \| [string, string] \| null` | `null` |
| type | `date` / `daterange` | `string` | `'date'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | 继承 ConfigProvider |
| disabled | 禁用 | `boolean` | `false` |
| clearable | 可清空 | `boolean` | `false` |
| placeholder | 单日占位 | `string` | `'选择日期'` |
| startPlaceholder / endPlaceholder | 范围占位 | `string` | — |

## DatePicker Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 值变化 | `(value)` |
| clear | 清空时 | — |
| visibleChange | 面板显隐 | `(visible)` |
| focus / blur | 聚焦 / 失焦 | `(event)` |
