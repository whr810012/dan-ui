<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/transfer/basic.vue'
import basicSrc from './demos/transfer/basic.vue?raw'
import Advanced from './demos/transfer/advanced.vue'
import advancedSrc from './demos/transfer/advanced.vue?raw'
</script>

# Transfer 穿梭框

在两栏之间转移已选项，支持搜索过滤。

## 基础用法

面板标题旁可全选；右侧显示 `已勾选/可见数`。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 按钮文案与搜索占位

`button-texts` 自定义左右转移按钮；`filter-placeholder` 自定义搜索框占位。

<DemoBlock :source="advancedSrc">
  <Advanced />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 右侧已选 key 列表 | `(string \| number)[]` | `[]` |
| data | 数据源 | `TransferItem[]` | `[]` |
| titles | 左右标题 | `[string, string]` | `['列表 1', '列表 2']` |
| filterable | 是否可搜索 | `boolean` | `false` |
| filterPlaceholder | 搜索框占位 | `string` | `'搜索'` |
| buttonTexts | 转移按钮文案 `[向右, 向左]`；空则用 › / ‹ | `[string, string]` | `['', '']` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 选中变化 | `(value)` |
| change | 穿梭后触发 | `(value, direction, movedKeys)` |
| left-check-change | 左侧勾选变化 | `(keys)` |
| right-check-change | 右侧勾选变化 | `(keys)` |

### TransferItem

| 字段 | 说明 | 类型 |
|------|------|------|
| key | 唯一键 | `string \| number` |
| label | 展示文案 | `string` |
| disabled | 禁用该项 | `boolean` |
