<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/textarea/basic.vue'
import Limit from './demos/textarea/limit.vue'
import Disabled from './demos/textarea/disabled.vue'
import Autosize from './demos/textarea/autosize.vue'
import basicSrc from './demos/textarea/basic.vue?raw'
import limitSrc from './demos/textarea/limit.vue?raw'
import disabledSrc from './demos/textarea/disabled.vue?raw'
import autosizeSrc from './demos/textarea/autosize.vue?raw'
</script>

# Textarea 文本域

## 何时使用

需要多行文本录入时使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 字数统计与格式化

对齐 Input：`show-word-limit` 需配合 `maxlength`，禁用时隐藏；可用 `formatter` / `parser` 分离展示值与绑定值。

<DemoBlock :source="limitSrc">
  <Limit />
</DemoBlock>

## 禁用与只读

<DemoBlock :source="disabledSrc">
  <Disabled />
</DemoBlock>

## 自适应高度

`autosize` 可按内容增高；对象形式可限制 `minRows` / `maxRows`。

<DemoBlock :source="autosizeSrc">
  <Autosize />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 绑定文本 | `string` | `''` | 否 |
| rows | 可见行数 | `number` | `3` | 否 |
| autosize | 自适应高度 | `boolean \| { minRows?: number; maxRows?: number }` | `false` | 否 |
| maxlength | 最大字符数 | `number` | — | 否 |
| showWordLimit | 是否显示字数统计；需同时设置 `maxlength`；禁用时隐藏 | `boolean` | `false` | 否 |
| formatter | 展示值格式化 | `(value: string) => string` | — | 否 |
| parser | 将输入解析回 `v-model` | `(value: string) => string` | — | 否 |
| disabled | 禁用；可继承 Form | `boolean` | `false` | 否 |
| readonly | 只读 | `boolean` | `false` | 否 |
| placeholder | 占位文案 | `string` | `''` | 否 |


### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | `v-model` 更新 | `(value: string) => void` |
| input | 输入时触发 | `(value: string) => void` |
| change | 变更确认，并联动 FormItem | `(value: string) => void` |
| focus | 聚焦 | `(event: FocusEvent) => void` |
| blur | 失焦，并联动 FormItem | `(event: FocusEvent) => void` |

### Slots

无具名内容插槽；文本通过 `v-model` 绑定。

### 与 Form 联用

置于 `DanFormItem` 且配置 `prop` 后，失焦/变更会触发字段校验。

### Token

| 变量 | 说明 |
|------|------|
| `--dan-color-border` / `--dan-color-primary` | 边框与聚焦 |
| `--dan-color-primary-light` | 聚焦光晕 |
| `--dan-font-size-xs` | 字数统计字号 |
