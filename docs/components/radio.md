# Radio 单选框

## 何时使用

在一组互斥选项中选择一项时使用。

## 基础用法

<<< @/components/demos/radio/basic.vue

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number \| boolean` | — |
| label | 选项值 | `string \| number \| boolean` | — |
| disabled | 禁用 | `boolean` | `false` |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 选中值 | `string \| number \| boolean` | — |
| disabled | 禁用整组 | `boolean` | `false` |
