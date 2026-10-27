<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/color-picker/basic.vue'
import basicSrc from './demos/color-picker/basic.vue?raw'
</script>

# ColorPicker 颜色选择器

预设色 + 原生取色。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
