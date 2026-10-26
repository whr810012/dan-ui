<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/avatar/basic.vue'
import basicSrc from './demos/avatar/basic.vue?raw'
</script>

# Avatar 头像

用于展示用户头像，支持图片与文字回退。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | — |
| alt | 替代文本 / 失败时取首字 | `string` | `''` |
| size | 尺寸 | `number \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| fit | 图片适应 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
