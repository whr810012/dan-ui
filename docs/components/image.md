<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/image/basic.vue'
import basicSrc from './demos/image/basic.vue?raw'
</script>

# Image 图片

展示图片，支持失败占位与点击预览。

## 基础用法

点击缩略图可打开预览。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | `''` |
| alt | 替代文本 | `string` | `''` |
| fit | 填充模式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| lazy | 懒加载 | `boolean` | `false` |
| preview | 是否可预览 | `boolean` | `false` |
| previewSrc | 预览大图，默认用 src | `string` | `''` |
