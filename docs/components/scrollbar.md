<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/scrollbar/basic.vue'
import basicSrc from './demos/scrollbar/basic.vue?raw'
</script>

# Scrollbar 滚动条

统一的可定制滚动容器；默认隐藏原生滚动条并绘制细轨滑块。

## 基础用法

设置 `height` / `maxHeight` 后，内容超出即可滚动。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | 容器高度 | `string \| number` | — |
| maxHeight | 最大高度 | `string \| number` | — |
| native | 使用原生滚动条 | `boolean` | `false` |
| always | 始终显示滑块 | `boolean` | `false` |
| minSize | 滑块最小尺寸 px | `number` | `20` |
| tag | 视口包裹标签 | `string` | `'div'` |
| wrapClass / viewClass | 包裹 / 视口 class | — | — |

## Events

| 事件 | 说明 | 参数 |
|------|------|------|
| scroll | 滚动时 | `{ scrollTop, scrollLeft }` |

## Methods

| 方法 | 说明 |
|------|------|
| setScrollTop / setScrollLeft | 设置滚动位置 |
| update | 重新计算滑块 |
