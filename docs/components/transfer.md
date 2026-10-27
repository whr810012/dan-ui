<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/transfer/basic.vue'
import basicSrc from './demos/transfer/basic.vue?raw'
</script>

# Transfer 穿梭框

在两栏之间转移已选项，支持搜索过滤。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 右侧已选 key 列表 | `(string \| number)[]` | `[]` |
| data | 数据源 | `TransferItem[]` | `[]` |
| titles | 左右标题 | `[string, string]` | `['列表 1', '列表 2']` |
| filterable | 是否可搜索 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 选中变化 | `(value)` |
| change | 穿梭后触发 | `(value, direction, movedKeys)` |

### TransferItem

| 字段 | 说明 | 类型 |
|------|------|------|
| key | 唯一键 | `string \| number` |
| label | 展示文案 | `string` |
| disabled | 禁用该项 | `boolean` |
