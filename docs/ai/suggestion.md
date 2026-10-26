<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/suggestion/basic.vue'
import basicSrc from './demos/suggestion/basic.vue?raw'
</script>

# Suggestion 建议提示

展示可点击的快捷提问列表。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| items | 建议文案列表 | `string[]` | `[]` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 点击某条建议 | `(item: string) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 在内置 items 后追加自定义内容 |
