<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import type { AgentStepItem, AgentStepStatus } from './types'
import './style.css'

defineOptions({ name: 'DanAgentSteps' })

withDefaults(
  defineProps<{
    steps?: AgentStepItem[]
    title?: string
  }>(),
  {
    steps: () => [],
    title: '执行计划',
  },
)

const emit = defineEmits<{
  select: [step: AgentStepItem]
}>()

const ns = useNamespace('agent-steps')

const statusLabel: Record<AgentStepStatus, string> = {
  pending: '待执行',
  running: '进行中',
  done: '完成',
  error: '失败',
  skipped: '跳过',
}
</script>

<template>
  <section :class="ns.b()" aria-label="agent steps">
    <header v-if="title || $slots.title" :class="ns.e('header')">
      <slot name="title">{{ title }}</slot>
    </header>
    <ol :class="ns.e('list')">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        :class="[
          ns.e('item'),
          ns.is(step.status || 'pending', true),
        ]"
      >
        <button
          type="button"
          :class="ns.e('button')"
          @click="emit('select', step)"
        >
          <span :class="ns.e('index')">{{ index + 1 }}</span>
          <span :class="ns.e('main')">
            <span :class="ns.e('title')">{{ step.title }}</span>
            <span
              v-if="step.description"
              :class="ns.e('desc')"
            >{{ step.description }}</span>
          </span>
          <span
            :class="[
              ns.e('badge'),
              ns.em('badge', step.status || 'pending'),
            ]"
          >
            {{ statusLabel[step.status || 'pending'] }}
          </span>
        </button>
      </li>
    </ol>
    <div v-if="!steps.length" :class="ns.e('empty')">暂无步骤</div>
  </section>
</template>
