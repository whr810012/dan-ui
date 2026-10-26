<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/chat-input/basic.vue'
import basicSrc from './demos/chat-input/basic.vue?raw'
</script>

# ChatInput 对话输入

支持 Enter 发送、Shift+Enter 换行；放在 `DanChat` footer 时可自动接入上下文。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue / v-model | 输入内容 | `string` | `''` | 否 |
| disabled | 禁用输入与发送 | `boolean` | `false` | 否 |
| placeholder | 占位文案 | `string` | `'输入消息，Enter 发送，Shift+Enter 换行'` | 否 |
| submitOnEnter | 是否 Enter 发送（Shift+Enter 换行） | `boolean` | `true` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 输入变化 | `(value: string) => void` |
| send | 点击发送或 Enter；会清空输入 | `(content: string) => void` |
| stop | 生成中点击停止 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| actions | 发送按钮左侧的额外操作区 |

### 行为说明

- 若处于 `DanChat` 内且 `generating=true`，显示「停止」按钮，发送按钮隐藏。
- 调用 `send` 时同时 `emit('send')` 与上下文 `chat.send()`。
- 空内容或禁用/生成中时不会发送。
