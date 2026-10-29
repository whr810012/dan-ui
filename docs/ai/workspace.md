---
title: AI 工作台配方
description: 用 ChatWorkspace 拼出侧栏会话 + 主对话 + Artifact 的完整 AI 聊天产品界面。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/workspace/basic.vue'
import basicSrc from './demos/workspace/basic.vue?raw'
</script>

# AI 工作台配方

1.8 起可用「整页配方」搭完整 AI 聊天产品壳：**不做**模型请求，只拼 UI 与状态更新。

## 布局结构

```text
┌────────────┬─────────────────────┬──────────────┐
│ Conversation│  AgentSteps         │ ArtifactPanel│
│ List        │  MediaPreview       │              │
│             │  Chat / Messages    │              │
│             │  ChatInput          │              │
└────────────┴─────────────────────┴──────────────┘
```

- `DanChatWorkspace`：三栏壳（`#sidebar` / 默认主区 / `#artifact` + `#footer`）
- `DanAgentSteps`：计划 / 步骤列表
- `DanMediaPreview`：图片 / PDF / 文件占位
- `patchChatToolPart`：按 `toolCallId` 流式就地更新 tool part

## 完整示例

发送一条消息后会演示工具输出流式追加。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 流式 tool 就地更新

```ts
import { patchChatToolPart } from '@dandan-ui/ui'

message = patchChatToolPart(message, {
  toolCallId: 'call_1',
  name: 'search',
  status: 'running',
  appendOutput: 'partial…',
})
```

`ChatMessage` 对带 `toolCallId` 的 part 使用稳定 key，`ToolCallCard` 在 `running` 时显示流式指示。

## 相关组件

- [ChatWorkspace](/ai/chat-workspace)
- [AgentSteps](/ai/agent-steps)
- [MediaPreview](/ai/media-preview)
- [PromptTemplate](/ai/prompt-template)
- [ToolCallCard](/ai/tool-call-card)
