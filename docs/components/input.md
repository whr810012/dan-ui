<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/input/basic.vue'
import Types from './demos/input/types.vue'
import Sizes from './demos/input/sizes.vue'
import Clearable from './demos/input/clearable.vue'
import Disabled from './demos/input/disabled.vue'
import Affix from './demos/input/affix.vue'
import Password from './demos/input/password.vue'
import Limit from './demos/input/limit.vue'
import basicSrc from './demos/input/basic.vue?raw'
import typesSrc from './demos/input/types.vue?raw'
import sizesSrc from './demos/input/sizes.vue?raw'
import clearableSrc from './demos/input/clearable.vue?raw'
import disabledSrc from './demos/input/disabled.vue?raw'
import affixSrc from './demos/input/affix.vue?raw'
import passwordSrc from './demos/input/password.vue?raw'
import limitSrc from './demos/input/limit.vue?raw'
</script>

# Input 输入框

## 何时使用

需要单行文本录入时使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 输入类型

通过 `type` 使用原生输入类型，例如文本、密码、数字、邮箱等。

<DemoBlock :source="typesSrc">
  <Types />
</DemoBlock>

## 密码显示切换

配合 `suffix` 插槽与图标，实现显示 / 隐藏密码。

<DemoBlock :source="passwordSrc">
  <Password />
</DemoBlock>

## 尺寸

<DemoBlock :source="sizesSrc">
  <Sizes />
</DemoBlock>

## 可清空

<DemoBlock :source="clearableSrc">
  <Clearable />
</DemoBlock>

## 禁用与只读

<DemoBlock :source="disabledSrc">
  <Disabled />
</DemoBlock>

## 前缀 / 后缀

<DemoBlock :source="affixSrc">
  <Affix />
</DemoBlock>

## 字数限制

<DemoBlock :source="limitSrc">
  <Limit />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 输入框绑定值 | `string \| number` | `''` | 否 |
| type | 原生 `input[type]`，常用：`text` / `password` / `number` / `email` / `tel` / `url` / `search` | `string` | `'text'` | 否 |
| size | 尺寸；未传时继承 `ConfigProvider` | `'small' \| 'default' \| 'large'` | — | 否 |
| disabled | 禁用；在 `Form` 内也会继承表单 `disabled` | `boolean` | `false` | 否 |
| readonly | 只读，仍可聚焦但不可编辑 | `boolean` | `false` | 否 |
| clearable | 有内容且非禁用/只读时显示清空按钮 | `boolean` | `false` | 否 |
| placeholder | 占位文案 | `string` | `''` | 否 |
| maxlength | 最大输入长度（透传原生） | `number` | — | 否 |

其余原生属性（如 `autocomplete`、`name`）可通过透传 attrs 传到内部 `<input>`。

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | `v-model` 更新 | `(value: string) => void` |
| input | 每次输入触发 | `(value: string) => void` |
| change | 变更确认（原生 change）时触发，并联动 FormItem 校验 | `(value: string) => void` |
| focus | 获得焦点 | `(event: FocusEvent) => void` |
| blur | 失去焦点，并联动 FormItem 校验 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮后触发 | `() => void` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| prefix | 输入框左侧前置内容（图标、单位等） | — |
| suffix | 输入框右侧后置内容（图标、单位、密码显隐等） | — |

### 与 Form 联用

- 放在 `DanFormItem` 内且设置 `prop` 后，`change` / `blur` 会触发对应字段校验。
- 表单 `disabled` 会禁用内部输入。

### Token

| 变量 | 说明 |
|------|------|
| `--dan-color-border` / `--dan-color-primary` | 边框与聚焦态 |
| `--dan-control-height-sm/md/lg` | 高度 |
| `--dan-color-primary-light` | 聚焦光晕 |
