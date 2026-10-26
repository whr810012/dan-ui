# Checkbox 多选框

## 何时使用

在一组选项中选择多项，或表示开关型同意状态时使用。

## 基础用法

<<< @/components/demos/checkbox/basic.vue

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean \| array` | — |
| label | 选项值 | `string \| number \| boolean` | — |
| disabled | 禁用 | `boolean` | `false` |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 选中值数组 | `array` | `[]` |
| disabled | 禁用整组 | `boolean` | `false` |
