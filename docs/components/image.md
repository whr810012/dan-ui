<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/image/basic.vue'
import basicSrc from './demos/image/basic.vue?raw'
import Gallery from './demos/image/gallery.vue'
import gallerySrc from './demos/image/gallery.vue?raw'
</script>

# Image 图片

展示图片，支持失败占位与点击预览。

## 基础用法

点击缩略图可打开预览。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 多图预览

传入 `previewSrcList` 后可左右切换；支持方向键与 Esc。

<DemoBlock :source="gallerySrc">
  <Gallery />
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
| previewSrcList | 多图预览列表 | `string[]` | `[]` |
| initialIndex | 打开预览时的初始下标 | `number` | `0` |

## Events

| 事件 | 说明 | 参数 |
|------|------|------|
| load / error | 图片加载成功 / 失败 | `(event)` |
| close | 关闭预览 | — |
| switch | 多图切换 | `(index)` |
