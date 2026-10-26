# Chat 对话

## 何时使用

构建 AI 对话主界面时使用，负责消息列表与上下文注入。

## 假 SSE 示例

<<< @/ai/demos/chat/fake-sse.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| messages | 消息列表 | `ChatMessageModel[]` | `[]` |
| generating | 是否生成中 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| send | 发送内容 | `(content: string)` |
| stop | 停止生成 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义消息列表 |
| footer | 底部输入区 |
