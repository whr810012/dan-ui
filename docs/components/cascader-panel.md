<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/cascader-panel/basic.vue'
import basicSrc from './demos/cascader-panel/basic.vue?raw'
</script>

# CascaderPanel 级联面板

无弹层的级联选择面板，选项结构与 Cascader 相同。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
