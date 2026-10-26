<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/grid/basic.vue'
import basicSrc from './demos/grid/basic.vue?raw'
</script>

# Grid 栅格

24 分栏布局，由 `DanRow` / `DanCol` 组成。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Row Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | 列间距（px） | `number` | `0` |
| justify | 水平排列 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 垂直对齐 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |

## Col Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 栅格占据份数（0–24） | `number` | `24` |
| offset | 左侧间隔份数 | `number` | `0` |
