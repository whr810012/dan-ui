<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/autocomplete/basic.vue'
import basicSrc from './demos/autocomplete/basic.vue?raw'
</script>

# Autocomplete 自动完成

输入建议列表。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
