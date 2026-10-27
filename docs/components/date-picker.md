<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/date-picker/basic.vue'
import basicSrc from './demos/date-picker/basic.vue?raw'
</script>

# DatePicker 日期选择器

选择或输入日期（一期支持单日 `YYYY-MM-DD`）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## DatePicker Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值，格式 `YYYY-MM-DD` | `string \| null` | `null` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | 继承 ConfigProvider |
| disabled | 禁用 | `boolean` | `false` |
| clearable | 可清空 | `boolean` | `false` |
| placeholder | 占位文案 | `string` | `'选择日期'` |

## DatePicker Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 值变化 | `(value)` |
| clear | 清空时 | — |
| visibleChange | 面板显隐 | `(visible)` |
| focus / blur | 聚焦 / 失焦 | `(event)` |
