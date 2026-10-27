<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/input-number/basic.vue'
import basicSrc from './demos/input-number/basic.vue?raw'
import Controls from './demos/input-number/controls.vue'
import controlsSrc from './demos/input-number/controls.vue?raw'
</script>

# InputNumber 数字输入框

仅允许输入标准数字值，可通过按钮或键盘上下键调节。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 控制按钮

右侧按钮或隐藏控制按钮。

<DemoBlock :source="controlsSrc">
  <Controls />
</DemoBlock>

## InputNumber Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `number \| null` | `null` |
| min / max | 最小值 / 最大值 | `number` | `-Infinity` / `Infinity` |
| step | 步长 | `number` | `1` |
| stepStrictly | 是否只能输入 step 的倍数 | `boolean` | `false` |
| precision | 精度（小数位数） | `number` | — |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | 继承 ConfigProvider |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| controls | 是否显示控制按钮 | `boolean` | `true` |
| controlsPosition | 控制按钮位置 | `'' \| 'right'` | `''` |
| placeholder | 占位文案 | `string` | `''` |

## InputNumber Events

| 事件 | 说明 | 参数 |
|------|------|------|
| change | 值变化时 | `(current, previous)` |
| blur / focus | 失焦 / 聚焦 | `(event)` |
