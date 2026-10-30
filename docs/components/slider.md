<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/slider/basic.vue'
import basicSrc from './demos/slider/basic.vue?raw'
import Marks from './demos/slider/marks.vue'
import marksSrc from './demos/slider/marks.vue?raw'
</script>

# Slider 滑块

通过拖拽选择指定范围内的数值。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 刻度标记

`marks` 在轨道下方显示文案；点击标记可跳到对应值。

<DemoBlock :source="marksSrc">
  <Marks />
</DemoBlock>

## Slider Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `number` | `0` |
| min / max | 最小值 / 最大值 | `number` | `0` / `100` |
| step | 步长 | `number` | `1` |
| disabled | 禁用 | `boolean` | `false` |
| showStops | 是否显示间断点 | `boolean` | `false` |
| showTooltip | 是否显示提示 | `boolean` | `true` |
| marks | 刻度标记 | `Record<number, string \| { label?: string; style?: CSSProperties }>` | — |

## Slider Events

| 事件 | 说明 | 参数 |
|------|------|------|
| input | 拖动过程中 | `(value)` |
| change | 松手或点击后 | `(value)` |
