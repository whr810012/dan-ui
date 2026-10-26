# Select 选择器

## 何时使用

从预设选项中单选一项时使用。

## 基础用法

<<< @/components/demos/select/basic.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number \| boolean \| null` | — |
| options | 选项列表 | `SelectOption[]` | `[]` |
| placeholder | 占位文案 | `string` | `'请选择'` |
| clearable | 可清空 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | 继承配置 |
