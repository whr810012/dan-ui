<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/notification/basic.vue'
import basicSrc from './demos/notification/basic.vue?raw'
</script>

# Notification 通知

角落弹出的通知条，命令式调用。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

```ts
import { DanNotification } from '@dandan-ui/ui'

DanNotification({ title, message, type, duration, position })
DanNotification.success / warning / info / error
DanNotification.closeAll()
```

| 字段 | 说明 | 默认值 |
|------|------|--------|
| title / message | 标题与正文 | — |
| type | 类型 | `info` |
| duration | 自动关闭毫秒，`0` 不关闭 | `4500` |
| position | `top-right` 等四角 | `top-right` |
| showClose | 关闭按钮 | `true` |
