<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/image-preview/basic.vue'
import basicSrc from './demos/image-preview/basic.vue?raw'
</script>

# ImagePreview 图片预览

独立的大图预览层（Image 组件内置预览也可继续使用）。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
