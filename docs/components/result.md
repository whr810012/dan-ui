<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/result/basic.vue'
import basicSrc from './demos/result/basic.vue?raw'
</script>

# Result 结果

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
