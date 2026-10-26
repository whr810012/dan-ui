<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/radio/basic.vue'
import Disabled from './demos/radio/disabled.vue'
import basicSrc from './demos/radio/basic.vue?raw'
import disabledSrc from './demos/radio/disabled.vue?raw'
</script>

# Radio 单选框

## 何时使用

在一组互斥选项中选择一项时使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 禁用

<DemoBlock :source="disabledSrc">
  <Disabled />
</DemoBlock>

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 单独使用时的选中值 | `string \| number \| boolean` | — | 否 |
| label | 该单选项对应的值（Group 内必用） | `string \| number \| boolean` | — | 组内建议必填 |
| disabled | 禁用当前项；可继承 Group / Form | `boolean` | `false` | 否 |

### Radio Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 单独使用时的 `v-model` | `(value: string \| number \| boolean) => void` |
| change | 选中变化 | `(value: string \| number \| boolean) => void` |

### Radio Slots

| 插槽名 | 说明 |
|--------|------|
| default | 选项文案；默认回退为 `label` |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 当前选中值 | `string \| number \| boolean` | — | 否 |
| disabled | 禁用整组 | `boolean` | `false` | 否 |

### RadioGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中值更新 | `(value: string \| number \| boolean) => void` |
| change | 选择变化，并联动 FormItem | `(value: string \| number \| boolean) => void` |

### RadioGroup Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置多个 `DanRadio` |

### 与 Form 联用

推荐始终使用 `DanRadioGroup` + `prop`，由 Group 统一上报校验。
