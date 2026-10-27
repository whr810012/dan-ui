<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectSteps, type StepStatus } from './stepsContext'
import './style.css'

defineOptions({ name: 'DanStep' })

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: string
    status?: StepStatus
  }>(),
  {
    title: '',
    description: '',
    icon: '',
  },
)

const ns = useNamespace('step')
const steps = injectSteps()
const uid = getCurrentInstance()?.uid ?? Date.now() + Math.random()

onMounted(() => {
  steps.register(uid)
})

onBeforeUnmount(() => {
  steps.unregister(uid)
})

const index = computed(() => steps.uids.value.indexOf(uid))

const currentStatus = computed<StepStatus>(() => {
  if (props.status) return props.status
  if (index.value < 0) return 'wait'
  if (index.value < steps.active.value) return steps.finishStatus.value
  if (index.value === steps.active.value) return steps.processStatus.value
  return 'wait'
})

const isLast = computed(
  () => index.value >= 0 && index.value === steps.uids.value.length - 1,
)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(currentStatus),
      ns.is('simple', steps.simple.value),
      ns.is('vertical', steps.direction.value === 'vertical'),
      ns.is('horizontal', steps.direction.value === 'horizontal'),
      ns.is('last', isLast),
    ]"
    role="listitem"
  >
    <div :class="ns.e('head')">
      <div :class="ns.e('icon')">
        <slot name="icon">
          <span v-if="icon">{{ icon }}</span>
          <span
            v-else-if="
              currentStatus === 'finish' || currentStatus === 'success'
            "
            >✓</span
          >
          <span v-else-if="currentStatus === 'error'">!</span>
          <span v-else>{{ Math.max(index, 0) + 1 }}</span>
        </slot>
      </div>
      <div
        v-if="!isLast && !steps.simple.value"
        :class="ns.e('line')"
        aria-hidden="true"
      />
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="(description || $slots.description) && !steps.simple.value"
        :class="ns.e('description')"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
