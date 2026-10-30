<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/badge/basic.vue'
import basicSrc from './demos/badge/basic.vue?raw'
import Offset from './demos/badge/offset.vue'
import offsetSrc from './demos/badge/offset.vue?raw'
</script>

# Badge 徽标

在图标或按钮右上角展示数量 / 状态点。

## 基础用法

`value` 超 `max` 时显示为 `max+`；`is-dot` 为圆点提醒。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 偏移与零值

`offset` 为相对右上角的 `[x, y]`（px）。默认不展示 `0`，设 `show-zero` 可显示。

<DemoBlock :source="offsetSrc">
  <Offset />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 展示内容 | `string \| number` | — |
| max | 封顶数字，超出显示 `max+` | `number` | `99` |
| isDot | 圆点模式 | `boolean` | `false` |
| hidden | 强制隐藏 | `boolean` | `false` |
| showZero | 值为 `0` 时是否显示 | `boolean` | `false` |
| offset | 相对右上角偏移 `[x, y]`（px） | `[number, number]` | `[0, 0]` |
| type | 色系 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 被徽标包裹的内容 |
