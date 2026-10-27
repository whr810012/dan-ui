<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tree-select/basic.vue'
import basicSrc from './demos/tree-select/basic.vue?raw'
</script>

# TreeSelect 树选择

下拉面板中以树形结构选择叶子节点。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 选中节点 id | `string \| number \| null` | `null` |
| data | 树数据 | `TreeNode[]` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| placeholder | 占位文案 | `string` | `请选择` |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 选中变化 | `(value)` |
| change | 选中变化 | `(value)` |
| clear | 清空时触发 | — |
