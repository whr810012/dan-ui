<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/message/basic.vue'
import basicSrc from './demos/message/basic.vue?raw'
import Grouping from './demos/message/grouping.vue'
import groupingSrc from './demos/message/grouping.vue?raw'
</script>

# Message 消息

全局轻提示，命令式调用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## 合并与偏移

默认 `grouping` 开启：相同文案 + 类型会合并并显示计数。`offset` 控制距顶部距离。

<DemoBlock :source="groupingSrc">
  <Grouping />
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
| offset | 距顶部偏移（px） | `number` | `20` |
| grouping | 相同消息合并计数 | `boolean` | `true` |
