<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideSteps, type StepStatus } from './stepsContext'
import './style.css'

defineOptions({ name: 'DanSteps' })

const props = withDefaults(
  defineProps<{
    active?: number
    direction?: 'horizontal' | 'vertical'
    processStatus?: StepStatus
    finishStatus?: StepStatus
    simple?: boolean
  }>(),
  {
    active: 0,
    direction: 'horizontal',
    processStatus: 'process',
    finishStatus: 'finish',
    simple: false,
  },
)

const emit = defineEmits<{
  change: [active: number]
}>()

const ns = useNamespace('steps')
const uids = ref<number[]>([])

function register(uid: number) {
  if (!uids.value.includes(uid)) {
    uids.value = [...uids.value, uid]
  }
}

function unregister(uid: number) {
  uids.value = uids.value.filter((id) => id !== uid)
}

provideSteps({
  active: computed(() => props.active),
  direction: computed(() => props.direction),
  processStatus: computed(() => props.processStatus),
  finishStatus: computed(() => props.finishStatus),
  simple: computed(() => props.simple),
  uids,
  register,
  unregister,
})

defineExpose({
  change: (index: number) => emit('change', index),
})
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.is('simple', simple)]" role="list">
    <slot />
  </div>
</template>
