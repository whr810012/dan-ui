<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/date-picker/basic.vue'
import basicSrc from './demos/date-picker/basic.vue?raw'
import Range from './demos/date-picker/range.vue'
import rangeSrc from './demos/date-picker/range.vue?raw'
import Disabled from './demos/date-picker/disabled.vue'
import disabledSrc from './demos/date-picker/disabled.vue?raw'
import Shortcuts from './demos/date-picker/shortcuts.vue'
import shortcutsSrc from './demos/date-picker/shortcuts.vue?raw'
import DateTime from './demos/date-picker/datetime.vue'
import datetimeSrc from './demos/date-picker/datetime.vue?raw'
</script>

# DatePicker 日期选择器

选择单日、范围、日期时间；值约定为 `YYYY-MM-DD` 或 `YYYY-MM-DD HH:mm`。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 范围选择

<DemoBlock :source="rangeSrc">
  <Range />
</DemoBlock>

## 禁用日期

通过 `disabled-date` 回调禁用部分日期（示例禁用周末）。

<DemoBlock :source="disabledSrc">
  <Disabled />
</DemoBlock>

## 快捷选项

`shortcuts` 可快速填入单日或区间。

<DemoBlock :source="shortcutsSrc">
  <Shortcuts />
</DemoBlock>

## 日期时间

`type="datetime" | "datetimerange"`，选日后再选时分并确认。

<DemoBlock :source="datetimeSrc">
  <DateTime />
</DemoBlock>

## DatePicker Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 单日 `string`，范围 `[string, string]` | `string \| [string, string] \| null` | `null` |
| type | `date` / `daterange` / `datetime` / `datetimerange` | `string` | `'date'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | 继承 ConfigProvider |
| disabled | 禁用 | `boolean` | `false` |
| clearable | 可清空 | `boolean` | `false` |
| placeholder | 单日占位 | `string` | `'选择日期'` |
| startPlaceholder / endPlaceholder | 范围占位 | `string` | — |
| disabledDate | 禁用日期 | `(date: Date) => boolean` | — |
| shortcuts | 快捷项 | `{ text, value }[]` | `[]` |

## DatePicker Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 值变化 | `(value)` |
| clear | 清空时 | — |
| visibleChange | 面板显隐 | `(visible)` |
| focus / blur | 聚焦 / 失焦 | `(event)` |
