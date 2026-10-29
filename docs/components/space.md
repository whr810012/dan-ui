<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/space/basic.vue'
import basicSrc from './demos/space/basic.vue?raw'
</script>

# Space 间距

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

`compact` 可将子元素间距压为 0，适合按钮组贴合。
