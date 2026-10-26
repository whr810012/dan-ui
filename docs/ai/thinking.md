<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/thinking/basic.vue'
import basicSrc from './demos/thinking/basic.vue?raw'
</script>

# Thinking 思考过程

用于折叠展示模型推理 / 思考文本。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| content | 思考文本；也可不用，改走默认插槽 | `string` | `''` | 否 |
| title | 折叠条标题 | `string` | `'思考过程'` | 否 |
| collapsed | 初始是否折叠 | `boolean` | `true` | 否 |

### Events

无公开事件；展开/收起为组件内部状态。

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义思考内容；默认渲染 `content` |
