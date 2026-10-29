<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import type { AgentStepItem, AgentStepStatus } from './types'
import './style.css'

defineOptions({ name: 'DanAgentSteps' })

const props = withDefaults(
  defineProps<{
    steps?: AgentStepItem[]
    title?: string
  }>(),
  {
    steps: () => [],
  },
)

const emit = defineEmits<{
  select: [step: AgentStepItem]
}>()

const ns = useNamespace('agent-steps')
const { t } = useLocale()
const resolvedTitle = computed(() => props.title ?? t('agentSteps.title'))

const statusLabel = computed<Record<AgentStepStatus, string>>(() => ({
  pending: t('agentSteps.pending'),
  running: t('agentSteps.running'),
  done: t('agentSteps.done'),
  error: t('agentSteps.error'),
  skipped: t('agentSteps.skipped'),
}))
</script>

<template>
  <section :class="ns.b()" aria-label="agent steps">
    <header v-if="resolvedTitle || $slots.title" :class="ns.e('header')">
      <slot name="title">{{ resolvedTitle }}</slot>
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
    <div v-if="!steps.length" :class="ns.e('empty')">
      {{ t('agentSteps.empty') }}
    </div>
  </section>
</template>
