---
title: Form 表单
description: Vue 3 表单布局与校验，配合 Input、Select、DatePicker 等 dan-ui 控件。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/form/basic.vue'
import Controls from './demos/form/controls.vue'
import LabelTop from './demos/form/label-top.vue'
import FormListDemo from './demos/form/form-list.vue'
import basicSrc from './demos/form/basic.vue?raw'
import controlsSrc from './demos/form/controls.vue?raw'
import labelTopSrc from './demos/form/label-top.vue?raw'
import formListSrc from './demos/form/form-list.vue?raw'
</script>

# Form 表单

## 何时使用

收集、校验并提交一组表单数据时使用。支持嵌套字段路径，如 `user.email`。

## 基础校验

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 综合表单

组合输入框、单选、多选、选择器、开关等控件。

<DemoBlock :source="controlsSrc">
  <Controls />
</DemoBlock>

## 顶部标签

<DemoBlock :source="labelTopSrc">
  <LabelTop />
</DemoBlock>

## 动态列表 FormList

在 Form 内用 `DanFormList` 管理数组字段；`prop` 指向数组路径，插槽提供 `row` / `index` / `remove`。

<DemoBlock :source="formListSrc">
  <FormListDemo />
</DemoBlock>

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| model | 表单数据对象，字段需可响应式 | `Record<string, unknown>` | — | 是 |
| rules | 校验规则表，key 支持嵌套路径如 `user.email` | `FormRules` | `{}` | 否 |
| disabled | 禁用整表内可继承的控件 | `boolean` | `false` | 否 |
| size | 向下提供的默认尺寸 | `'small' \| 'default' \| 'large'` | — | 否 |
| labelWidth | 统一标签宽度，如 `'88px'` | `string` | — | 否 |
| labelPosition | 标签布局 | `'left' \| 'right' \| 'top'` | `'right'` | 否 |
| scrollToError | `validate` 失败时滚到首个错误项 | `boolean` | `false` | 否 |

### FormRules / FormRule

| 字段 | 说明 | 类型 |
|------|------|------|
| required | 是否必填 | `boolean` |
| message | 错误文案 | `string` |
| trigger | 触发时机，如 `'blur'` / `'change'` | `string \| string[]` |
| min / max | 字符串长度或数组长度限制 | `number` |
| pattern | 正则校验 | `RegExp` |
| type | 期望类型 | `'string' \| 'number' \| 'boolean' \| 'array'` |
| validator | 自定义异步/同步校验 | `(rule, value, callback) => void` |

### Form Expose

通过 `ref` 调用：

| 方法 | 说明 | 签名 |
|------|------|------|
| validate | 校验全部已注册字段 | `() => Promise<{ valid: boolean; fields: FormFieldState[] }>` |
| validateField | 校验单个字段 | `(prop: string) => Promise<boolean>` |
| getFieldsState | 当前各字段校验快照 | `() => FormFieldState[]` |
| resetFields | 恢复各字段初始值并清空校验 | `() => void` |
| clearValidate | 清空校验态；可传字段名或字段名数组 | `(props?: string \| string[]) => void` |
| scrollToField | 滚到指定字段 FormItem | `(prop: string) => void` |

### Form Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置若干 `DanFormItem` |

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| label | 标签文本 | `string` | — | 否 |
| prop | 对应 `model` 的字段路径，支持 `a.b.c` | `string` | — | 校验时必填 |
| required | 强制显示必填星号；不传则根据 rules 推断 | `boolean` | — | 否 |
| labelWidth | 覆盖 Form 的标签宽度 | `string` | — | 否 |

### FormItem Slots

| 插槽名 | 说明 |
|--------|------|
| default | 表单控件（Input / Select 等） |
| label | 自定义标签内容 |

### FormItem 行为

- 挂载时记录初始值，供 `resetFields` 使用。
- 子控件触发 `change` / `blur` 时按 rule.trigger 过滤后校验。
- 校验失败时在控件下方显示首条错误信息。

### FormList Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prop | 对应 `model` 上的数组路径 | `string` | — |
| addText | 添加按钮文案 | `string` | `'添加一项'` |
| createItem | 新增行工厂函数 | `() => Record<string, unknown>` | `() => ({})` |

### FormList Slots

| 插槽 | 说明 |
|------|------|
| default | `{ row, index, remove }` |

### 注意事项

- `model` 请使用 `reactive` / `ref` 对象，确保双向绑定生效。
- 嵌套路径如 `profile.email` 要求 `model.profile` 事先存在。
- `Form.validate()` 自 1.7 起返回 `{ valid, fields }`（破坏性变更）。
