<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/qrcode/basic.vue'
import basicSrc from './demos/qrcode/basic.vue?raw'
</script>

# QRCode 二维码

基于 `qrcode` 绘制 Canvas。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
