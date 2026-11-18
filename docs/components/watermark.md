<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/watermark/basic.vue'
import Image from './demos/watermark/image.vue'
import basicSrc from './demos/watermark/basic.vue?raw'
import imageSrc from './demos/watermark/image.vue?raw'
</script>

# Watermark 水印

为容器添加不影响交互的水印层。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 图片水印

设置 `image` 后以图片替代文字；图片按 `image-width` / `image-height` 的盒子等比缩放并居中绘制，超出单个平铺单元时会继续缩小，避免被裁切。

<DemoBlock :source="imageSrc">
  <Image />
</DemoBlock>

> 跨域图片需要服务端返回 CORS 响应头，并同时声明 `cross-origin="anonymous"`；否则 `canvas.toDataURL` 会因画布被污染而失败。图片加载失败时自动退回文字水印。

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 文案，支持多行数组 | `string \| string[]` | `dan-ui` |
| fontSize | 字号 | `number` | `14` |
| color | 颜色 | `string` | `rgba(0,0,0,.12)` |
| rotate | 旋转角度 | `number` | `-22` |
| gap | 间距 `[x, y]` | `[number, number]` | `[100, 100]` |
| zIndex | 层级 | `number` | `9` |
| image | 图片水印地址，设置后替代文字 | `string` | `''` |
| imageWidth | 图片渲染宽度上限 | `number` | `60` |
| imageHeight | 图片渲染高度上限 | `number` | `60` |
| imageOpacity | 图片透明度 | `number` | `1` |
| crossOrigin | 跨域图片的 CORS 模式 | `'' \| 'anonymous' \| 'use-credentials'` | `''` |
