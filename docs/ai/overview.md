# AI 组件概览

dan-ui 的 AI 组件只负责界面、事件与插槽，不内置任何大模型接口。

常见接入方式：

1. 用 `DanChat` 展示消息列表
2. 用 `DanChatInput` 收集用户输入并触发 `send`
3. 业务侧请求 SSE / WebSocket，把增量内容写回消息的 `content`
4. 需要停止时响应 `stop`，并把消息 `status` 设为 `stopped`

消息模型：

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
