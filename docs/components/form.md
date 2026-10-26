# Form 表单

## 何时使用

收集、校验并提交一组表单数据时使用。支持嵌套字段路径，如 `user.email`。

## 基础用法

<<< @/components/demos/form/basic.vue

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `object` | — |
| rules | 校验规则 | `FormRules` | `{}` |
| disabled | 禁用整表 | `boolean` | `false` |
| labelWidth | 标签宽度 | `string` | — |
| labelPosition | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |

### Form Expose

| 方法 | 说明 |
|------|------|
| validate | 校验全部字段，返回 `Promise<boolean>` |
| validateField | 校验指定字段 |
| resetFields | 重置字段值与校验状态 |
| clearValidate | 清空校验信息 |

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签文本 | `string` | — |
| prop | 字段路径 | `string` | — |
| required | 是否必填（可覆盖 rules） | `boolean` | — |
| labelWidth | 标签宽度 | `string` | — |
