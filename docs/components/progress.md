<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/progress/basic.vue'
import basicSrc from './demos/progress/basic.vue?raw'
import Styles from './demos/progress/styles.vue'
import stylesSrc from './demos/progress/styles.vue?raw'
</script>

# Progress 进度条

展示操作的当前进度。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 条内文字 / 条纹 / 不确定

`textInside` 将百分比放进条内（建议加大 `strokeWidth`）。`striped` / `stripedFlow` 提供条纹与流动效果。`indeterminate` 用于未知总进度。

<DemoBlock :source="stylesSrc">
  <Styles />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percentage | 百分比 0–100 | `number` | `0` |
| type | 类型 | `'line' \| 'circle'` | `'line'` |
| status | 状态 | `'normal' \| 'success' \| 'warning' \| 'exception'` | `'normal'` |
| strokeWidth | 线宽 | `number` | `8` |
| showText | 显示文字 | `boolean` | `true` |
| textInside | 百分比显示在条内（仅 line） | `boolean` | `false` |
| striped | 条纹（仅 line） | `boolean` | `false` |
| stripedFlow | 条纹流动，需同时开启 `striped` | `boolean` | `false` |
| indeterminate | 不确定进度动画 | `boolean` | `false` |
| color | 自定义颜色 | `string` | — |
| width | 环形画布边长 | `number` | `120` |
