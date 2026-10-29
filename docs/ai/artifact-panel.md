<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/artifact-panel/basic.vue'
import basicSrc from './demos/artifact-panel/basic.vue?raw'
</script>

# ArtifactPanel 结果侧栏

对话结果侧栏壳：支持 code / markdown / html（沙箱 iframe）/ text。不执行代码。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
