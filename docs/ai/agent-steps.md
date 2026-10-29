<script setup>
import { ref } from 'vue'
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import { DanAgentSteps } from '@dandan-ui/ui'

const steps = ref([
  { id: '1', title: '分析意图', description: '解析用户问题', status: 'done' },
  { id: '2', title: '调用工具', description: 'search_docs', status: 'running' },
  { id: '3', title: '汇总', status: 'pending' },
])
</script>

# AgentSteps Agent 步骤

Agent 计划 / 步骤列表壳，状态由业务驱动。

<DemoBlock>
  <DanAgentSteps :steps="steps" />
</DemoBlock>

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| steps | 步骤列表 | `AgentStepItem[]` | `[]` |
| title | 标题 | `string` | `'执行计划'` |

## AgentStepItem

`id` / `title` / `description?` / `status?: pending | running | done | error | skipped`

## Events

| 事件 | 说明 |
|------|------|
| select | 点击某步 `(step)` |
