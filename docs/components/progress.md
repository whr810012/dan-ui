<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/progress/basic.vue'
import basicSrc from './demos/progress/basic.vue?raw'
</script>

# Progress 进度条

展示操作的当前进度。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percentage | 百分比 0–100 | `number` | `0` |
| type | 类型 | `'line' \| 'circle'` | `'line'` |
| status | 状态 | `'normal' \| 'success' \| 'warning' \| 'exception'` | `'normal'` |
| strokeWidth | 线宽 | `number` | `8` |
| showText | 显示文字 | `boolean` | `true` |
| color | 自定义颜色 | `string` | — |
| width | 环形画布边长 | `number` | `120` |
