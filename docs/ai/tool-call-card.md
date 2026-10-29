<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/tool-call-card/basic.vue'
import basicSrc from './demos/tool-call-card/basic.vue?raw'
</script>

# ToolCallCard 工具调用卡片

展示工具调用状态与可折叠 input/output；`ChatMessage` 的 `parts[].type === 'tool'` 已默认使用本组件。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
