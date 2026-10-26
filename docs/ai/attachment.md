<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/attachment/basic.vue'
import basicSrc from './demos/attachment/basic.vue?raw'
</script>

# Attachment 附件

以文件芯片形式展示附件名称与大小。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| file | 附件信息 | `ChatAttachment` | — | 是 |
| removable | 是否显示移除按钮 | `boolean` | `false` | 否 |

### ChatAttachment

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| name | 文件名 | `string` | 是 |
| id | 可选唯一 id | `string` | 否 |
| size | 字节大小，用于展示 KB/MB | `number` | 否 |
| type | MIME 类型 | `string` | 否 |
| url | 预览/下载地址（展示用，组件本身不跳转） | `string` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| remove | 点击移除 | `(file: ChatAttachment) => void` |

### Slots

无。
