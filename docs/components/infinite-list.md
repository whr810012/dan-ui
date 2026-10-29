<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/infinite-list/basic.vue'
import basicSrc from './demos/infinite-list/basic.vue?raw'
</script>

# InfiniteList 无限列表

滚动近底触发 `load`；由业务控制 `loading` / `finished`。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
