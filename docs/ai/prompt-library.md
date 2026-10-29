<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/prompt-library/basic.vue'
import basicSrc from './demos/prompt-library/basic.vue?raw'
</script>

# PromptLibrary 提示词库

分组模板列表；点击抛出 `select`。也可作为 ChatInput 的 `commands` 斜杠指令源。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
