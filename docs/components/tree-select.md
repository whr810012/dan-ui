<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tree-select/basic.vue'
import basicSrc from './demos/tree-select/basic.vue?raw'
import FilterMultiple from './demos/tree-select/filter-multiple.vue'
import filterMultipleSrc from './demos/tree-select/filter-multiple.vue?raw'
</script>

# TreeSelect 树选择

下拉面板中以树形结构选择节点；支持搜索与多选。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 搜索与多选

开启 `filterable` 在面板内过滤（命中节点及其祖先保留）；`multiple` 使用复选框多选，可用 `max-tag-count` 折叠标签。

<DemoBlock :source="filterMultipleSrc">
  <FilterMultiple />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 选中节点 id；多选为数组 | `string \| number \| null \| Array<string \| number>` | `null` |
| data | 树数据 | `TreeNode[]` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| placeholder | 占位文案 | `string` | `请选择` |
| filterable | 面板内搜索 | `boolean` | `false` |
| filterPlaceholder | 搜索框占位 | `string` | `搜索` |
| multiple | 多选 | `boolean` | `false` |
| maxTagCount | 多选标签折叠数量，`0` 不折叠 | `number` | `0` |
| checkStrictly | 是否可选非叶子；默认单选仅叶子、多选任意节点 | `boolean` | — |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 选中变化 | `(value)` |
| change | 选中变化 | `(value)` |
| clear | 清空时触发 | — |
