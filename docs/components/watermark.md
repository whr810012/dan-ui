<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/watermark/basic.vue'
import basicSrc from './demos/watermark/basic.vue?raw'
</script>

# Watermark 水印

为容器添加不影响交互的水印层。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 文案，支持多行数组 | `string \| string[]` | `dan-ui` |
| fontSize | 字号 | `number` | `14` |
| color | 颜色 | `string` | `rgba(0,0,0,.12)` |
| rotate | 旋转角度 | `number` | `-22` |
| gap | 间距 `[x, y]` | `[number, number]` | `[100, 100]` |
| zIndex | 层级 | `number` | `9` |
