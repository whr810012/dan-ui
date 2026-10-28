<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/conversation-list/basic.vue'
import basicSrc from './demos/conversation-list/basic.vue?raw'
</script>

# ConversationList 会话列表

AI 对话侧栏骨架：选择 / 新建 / 删除事件由业务处理，组件不内置存储。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
