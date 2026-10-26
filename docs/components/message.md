<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/message/basic.vue'
import basicSrc from './demos/message/basic.vue?raw'
</script>

# Message 消息

全局轻提示，命令式调用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

```ts
DanMessage(options | string)
DanMessage.success / warning / info / error(message, options?)
DanMessage.closeAll()
```

| 选项 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 文案 | `string` | — |
| type | 类型 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
| duration | 自动关闭毫秒，`0` 不关闭 | `number` | `3000` |
| showClose | 显示关闭按钮 | `boolean` | `false` |
