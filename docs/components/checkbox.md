<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/checkbox/basic.vue'
import Group from './demos/checkbox/group.vue'
import Indeterminate from './demos/checkbox/indeterminate.vue'
import basicSrc from './demos/checkbox/basic.vue?raw'
import groupSrc from './demos/checkbox/group.vue?raw'
import indeterminateSrc from './demos/checkbox/indeterminate.vue?raw'
</script>

# Checkbox 多选框

## 何时使用

在一组选项中选择多项，或表示开关型同意状态时使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 多选组

<DemoBlock :source="groupSrc">
  <Group />
</DemoBlock>

## 全选 / 半选

<DemoBlock :source="indeterminateSrc">
  <Indeterminate />
</DemoBlock>

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 单独使用时为布尔；也可绑定数组（少见） | `boolean \| string \| number \| Array<...>` | — | 否 |
| label | 在 Group 内表示该选项的值 | `string \| number \| boolean` | — | 组内建议必填 |
| disabled | 禁用当前项；也可继承 Group / Form | `boolean` | `false` | 否 |
| indeterminate | 半选样式（仅视觉，常用于全选） | `boolean` | `false` | 否 |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 单独使用时的 `v-model` | `(value) => void` |
| change | 勾选变化；组内由 Group 统一处理 | `(value) => void` |

### CheckboxSlots

| 插槽名 | 说明 |
|--------|------|
| default | 选项文案；未传时回退显示 `label` |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 已选值数组 | `Array<string \| number \| boolean>` | `[]` | 否 |
| disabled | 禁用整组 | `boolean` | `false` | 否 |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中数组更新 | `(value: Array<...>) => void` |
| change | 选择变化，并联动 FormItem | `(value: Array<...>) => void` |

### CheckboxGroup Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置多个 `DanCheckbox` |

### 与 Form 联用

将 `DanCheckboxGroup`（或单个 Checkbox）放在 `DanFormItem` 内，`change` 会触发校验。数组字段可用 `type: 'array'` + `min` 规则限制最少选择数。
