<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/carousel/basic.vue'
import basicSrc from './demos/carousel/basic.vue?raw'
</script>

# Carousel 走马灯

轮播展示一组内容，适合头图与宣传位。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Carousel Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前索引 | `number` | `0` |
| height | 高度 | `string` | `'220px'` |
| autoplay | 自动播放 | `boolean` | `true` |
| interval | 间隔毫秒 | `number` | `3000` |
| loop | 循环 | `boolean` | `true` |
| arrow | 箭头显示 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| indicator | 指示器 | `boolean` | `true` |

## Events

`update:modelValue` / `change`
