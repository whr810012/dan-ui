<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/token-usage/basic.vue'
import basicSrc from './demos/token-usage/basic.vue?raw'
</script>

# TokenUsage Token 用量

展示输入 / 输出 / 合计 Token。

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| promptTokens | 输入 Token 数 | `number` | `0` | 否 |
| completionTokens | 输出 Token 数 | `number` | `0` | 否 |
| totalTokens | 合计；不传则自动相加 | `number` | — | 否 |

### Events

无。

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 追加在统计文案后的自定义内容 |
