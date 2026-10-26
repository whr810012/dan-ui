<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import FakeSse from './demos/chat/fake-sse.vue'
import fakeSseSrc from './demos/chat/fake-sse.vue?raw'
</script>

# Chat 对话

## 何时使用

构建 AI 对话主界面时使用，负责消息列表与上下文注入。

## 假 SSE 演示

可直接发送消息、点建议词，观察流式输出与停止。

<DemoBlock :source="fakeSseSrc">
  <FakeSse />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| messages | 消息列表，由业务侧维护 | `ChatMessageModel[]` | `[]` | 否 |
| generating | 是否处于生成中；会注入给 ChatInput 等子组件 | `boolean` | `false` | 否 |

### ChatMessageModel

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| id | 唯一标识 | `string` | 是 |
| role | 角色 | `'user' \| 'assistant' \| 'system' \| 'tool'` | 是 |
| content | 正文，可含 Markdown | `string` | 是 |
| status | 消息状态 | `'pending' \| 'streaming' \| 'done' \| 'error' \| 'stopped'` | 否 |
| reasoning | 思考过程文本 | `string` | 否 |
| attachments | 附件列表 | `ChatAttachment[]` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| send | 子级 ChatInput 发送时触发（上下文 `send`） | `(content: string) => void` |
| stop | 停止生成 | `() => void` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 自定义消息列表；不传则默认渲染 `DanChatMessage` | — |
| footer | 底部区域，通常放 `DanChatInput` | — |

### 上下文

`DanChat` 会 provide：

| 字段 | 说明 |
|------|------|
| messages | 消息列表 Ref |
| generating | 生成中 Ref |
| send | 触发发送 |
| stop | 触发停止 |

子组件可通过 `injectChat()` 读取（需在 Chat 子树内）。
