<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/time-picker/basic.vue'
import basicSrc from './demos/time-picker/basic.vue?raw'
import Range from './demos/time-picker/range.vue'
import rangeSrc from './demos/time-picker/range.vue?raw'
</script>

# TimePicker 时间选择器

选择时分（`HH:mm`）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 时间范围

`is-range` 时值为 `[start, end]`；支持 `clearable`。

<DemoBlock :source="rangeSrc">
  <Range />
</DemoBlock>

## TimePicker Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 单值为 `HH:mm`，范围为 `[string, string]` | `string \| [string, string] \| null` | `null` |
| isRange | 范围选择 | `boolean` | `false` |
| step | 分钟步进 | `number` | `5` |
| clearable / disabled | 清空 / 禁用 | `boolean` | `false` |
| placeholder | 单值占位 | `string` | `'选择时间'` |
| startPlaceholder / endPlaceholder | 范围占位 | `string` | — |
