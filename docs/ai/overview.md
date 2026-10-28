---
title: AI 组件概览
description: dan-ui AI 组件只做界面与事件，不内置大模型；含 Chat、流式文本、Markdown 等。
---

<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import FakeSse from './demos/chat/fake-sse.vue'
import fakeSseSrc from './demos/chat/fake-sse.vue?raw'
</script>

# AI 组件概览

dan-ui 的 AI 组件只负责界面、事件与插槽，不内置任何大模型接口。

## 快速体验

下面是完整假流式对话演示：

<DemoBlock :source="fakeSseSrc">
  <FakeSse />
</DemoBlock>

## 接入方式

1. 用 `DanChat` 展示消息列表  
2. 用 `DanChatInput` 收集输入并触发 `send`  
3. 业务侧请求 SSE / WebSocket，把增量写入消息 `content`  
4. 响应 `stop`，并把消息 `status` 设为 `stopped`

## 消息模型

```ts
interface ChatMessageModel {
  id: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  status?: 'pending' | 'streaming' | 'done' | 'error' | 'stopped'
  reasoning?: string
  attachments?: ChatAttachment[]
}
```
