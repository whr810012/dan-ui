<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/prompt/basic.vue'
import basicSrc from './demos/prompt/basic.vue?raw'
</script>

# Prompt 提示卡片

用于空态或欢迎区的提示词入口。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 标题文案 | `string` | — | 否 |
| description | 描述文案 | `string` | — | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击卡片 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题；优先于 `title` prop |
| description | 自定义描述；优先于 `description` prop |
