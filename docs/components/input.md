# Input 输入框

## 何时使用

需要单行文本录入时使用。

## 基础用法

<<< @/components/demos/input/basic.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | `''` |
| type | 原生类型 | `string` | `'text'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | 继承配置 |
| disabled | 禁用 | `boolean` | `false` |
| clearable | 可清空 | `boolean` | `false` |
| placeholder | 占位符 | `string` | `''` |

### Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | 值变化 |
| change | 变更确认 |
| blur / focus | 失焦 / 聚焦 |
| clear | 点击清空 |
