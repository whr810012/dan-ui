<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/chat-input/basic.vue'
import basicSrc from './demos/chat-input/basic.vue?raw'
</script>

# ChatInput 对话输入

支持附件选择 / 拖拽、斜杠指令（`commands`）。`send` 事件载荷为 `{ content, attachments }`。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 输入文本 | `string` | `''` |
| attachments / v-model:attachments | 附件列表 | `ChatAttachment[]` | `[]` |
| accept / maxCount / maxSize | 附件约束 | — | `8` / `10MB` |
| commands | 斜杠指令模板 | `PromptTemplate[]` | `[]` |
| submitOnEnter | Enter 发送 | `boolean` | `true` |

## Events

| 事件 | 说明 |
|------|------|
| send | `{ content, attachments }` |
| stop / attach | 停止生成 / 附件变化 |
