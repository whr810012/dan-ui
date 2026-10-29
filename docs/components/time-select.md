<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/time-select/basic.vue'
import basicSrc from './demos/time-select/basic.vue?raw'
</script>

# TimeSelect 时间点选择

按固定步长从 `start` 到 `end` 生成可选时刻（`HH:mm`），适合预约时段等场景。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 选中时刻 | `string \| null` | `null` |
| start | 起始 | `string` | `'09:00'` |
| end | 结束 | `string` | `'18:00'` |
| step | 步进（分钟数或 `HH:mm`） | `number \| string` | `'00:30'` |
| minTime / maxTime | 可选上下限 | `string \| null` | `null` |
| clearable / disabled | 清空 / 禁用 | `boolean` | `false` |
| placeholder | 占位 | `string` | `'选择时间'` |
| size | 尺寸 | `DanSize` | — |
