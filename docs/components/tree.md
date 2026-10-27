<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tree/basic.vue'
import basicSrc from './demos/tree/basic.vue?raw'
</script>

# Tree 树形控件

展示层级数据，支持展开与勾选。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
