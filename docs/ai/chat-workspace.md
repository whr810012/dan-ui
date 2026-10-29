<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/workspace/basic.vue'
import basicSrc from './demos/workspace/basic.vue?raw'
</script>

# ChatWorkspace 对话工作台

侧栏 + 主对话 + Artifact 的布局壳。

完整用法见 [AI 工作台配方](/ai/workspace)。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| showSidebar | 显示左侧栏 | `boolean` | `true` |
| showArtifact | 显示右侧栏 | `boolean` | `false` |
| sidebarWidth | 左侧宽度 | `string` | `'260px'` |
| artifactWidth | 右侧宽度 | `string` | `'360px'` |

## Slots

| 插槽 | 说明 |
|------|------|
| sidebar | 左侧（常用 ConversationList） |
| default | 主内容（消息区） |
| footer | 底部输入区 |
| artifact | 右侧产物面板 |
