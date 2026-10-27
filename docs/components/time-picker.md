<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/time-picker/basic.vue'
import basicSrc from './demos/time-picker/basic.vue?raw'
</script>

# TimePicker 时间选择器

选择时分（`HH:mm`）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## TimePicker Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | `HH:mm` | `string \| null` | `null` |
| step | 分钟步进 | `number` | `5` |
| clearable / disabled | 清空 / 禁用 | `boolean` | `false` |
