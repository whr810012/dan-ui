<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/chat-message/basic.vue'
import basicSrc from './demos/chat-message/basic.vue?raw'
</script>

# ChatMessage 消息

展示单条对话消息，内置角色样式、思考过程、流式文本与附件。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| message | 单条消息数据 | `ChatMessageModel` | — | 是 |

### Events

无组件级事件；交互由上层 Chat / 业务处理。

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| avatar | 自定义头像 / 角色区 | — |
| default | 自定义正文；默认用 `DanStreamText` | `{ message }` |

### 渲染规则

| 条件 | 行为 |
|------|------|
| `message.reasoning` 有值 | 显示 `DanThinking` |
| `status === 'streaming'` | 流式光标，思考区默认展开 |
| `role === 'user'` | 正文按纯文本；助手侧按 Markdown |
| `attachments` 非空 | 渲染 `DanAttachment` 列表 |
