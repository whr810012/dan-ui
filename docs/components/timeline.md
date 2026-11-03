<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/timeline/basic.vue'
import basicSrc from './demos/timeline/basic.vue?raw'
import Mode from './demos/timeline/mode.vue'
import modeSrc from './demos/timeline/mode.vue?raw'
</script>

# Timeline 时间轴

按时间顺序展示事件。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 交替排布

`mode="alternate"` 左右交错；单项可用 `placement` 控制时间戳位置。

<DemoBlock :source="modeSrc">
  <Mode />
</DemoBlock>

## Timeline Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| mode | 排布方式 | `'left' \| 'right' \| 'alternate'` | `'left'` |

## TimelineItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| timestamp | 时间戳 | `string` | `''` |
| type | 节点类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| hollow | 空心节点 | `boolean` | `false` |
| placement | 时间戳位置 | `'top' \| 'bottom'` | `'bottom'` |
