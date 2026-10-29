<script setup>
import { ref } from 'vue'
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import { DanPromptTemplate, DanMessage } from '@dandan-ui/ui'

const values = ref({ product: 'dan-ui', audience: '中后台' })

function onApply({ text }) {
  DanMessage.success(text.slice(0, 40) + '…')
}
</script>

# PromptTemplate 提示词变量

解析 `{{var}}` 占位，填表后 `apply` 输出完整文案。也可直接使用工具函数 `extractPromptVariables` / `renderPromptTemplate`。

<DemoBlock>
  <DanPromptTemplate
    v-model="values"
    title="产品介绍"
    template="为 {{audience}} 介绍 {{product}} 的核心能力。"
    @apply="onApply"
  />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| template | 含 `{{name}}` 的模板 | `string` | `''` |
| modelValue / v-model | 变量表 | `Record<string, string>` | — |
| title | 标题 | `string` | `'提示词模板'` |
| applyText | 按钮文案 | `string` | `'填入'` |

## Events

| 事件 | 说明 |
|------|------|
| apply | `{ text, values }` |
| change / update:modelValue | 变量变化 |
