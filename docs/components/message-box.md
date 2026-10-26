<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/message-box/basic.vue'
import basicSrc from './demos/message-box/basic.vue?raw'
</script>

# MessageBox 弹框

命令式确认 / 提示框，返回 Promise。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

```ts
import { DanMessageBox } from '@dan-ui/ui'

await DanMessageBox.alert(message, title?, options?)
await DanMessageBox.confirm(message, title?, options?)
```

确认时 resolve `'confirm'`；取消或关闭时 reject `'cancel' | 'close'`。

## Options

| 字段 | 说明 | 默认值 |
|------|------|--------|
| type | `info / success / warning / error` | `info` |
| confirmText / cancelText | 按钮文案 | `确定` / `取消` |
| showCancel / showConfirm | 按钮显隐 | confirm 默认显示取消 |
| closeOnClickModal | 点击遮罩关闭 | `false` |
