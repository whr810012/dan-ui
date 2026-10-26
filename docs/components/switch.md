<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/switch/basic.vue'
import Text from './demos/switch/text.vue'
import Value from './demos/switch/value.vue'
import Disabled from './demos/switch/disabled.vue'
import basicSrc from './demos/switch/basic.vue?raw'
import textSrc from './demos/switch/text.vue?raw'
import valueSrc from './demos/switch/value.vue?raw'
import disabledSrc from './demos/switch/disabled.vue?raw'
</script>

# Switch 开关

## 何时使用

表示两种互斥状态之间的切换时使用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 文字描述

<DemoBlock :source="textSrc">
  <Text />
</DemoBlock>

## 自定义取值

<DemoBlock :source="valueSrc">
  <Value />
</DemoBlock>

## 禁用

<DemoBlock :source="disabledSrc">
  <Disabled />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 当前值；与 `activeValue` / `inactiveValue` 比较判断开关状态 | `boolean \| string \| number` | `false` | 否 |
| activeValue | 打开时写入的值 | `boolean \| string \| number` | `true` | 否 |
| inactiveValue | 关闭时写入的值 | `boolean \| string \| number` | `false` | 否 |
| activeText | 打开侧文案 | `string` | — | 否 |
| inactiveText | 关闭侧文案 | `string` | — | 否 |
| disabled | 禁用；可继承 Form | `boolean` | `false` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | `v-model` 更新 | `(value: boolean \| string \| number) => void` |
| change | 切换完成，并联动 FormItem | `(value: boolean \| string \| number) => void` |

### Slots

无内容插槽；文案通过 `activeText` / `inactiveText` 配置。

### 无障碍

根节点为 `button[role=switch]`，带 `aria-checked`。

### Token

| 变量 | 说明 |
|------|------|
| `--dan-color-primary` | 打开态轨道颜色 |
| `--dan-duration-fast` | 滑块过渡 |
