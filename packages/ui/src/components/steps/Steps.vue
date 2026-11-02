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
    /** 允许点击步骤切换（配合 v-model:active） */
    clickable?: boolean
  }>(),
  {
    active: 0,
    direction: 'horizontal',
    processStatus: 'process',
    finishStatus: 'finish',
    simple: false,
    clickable: false,
  },
)

const emit = defineEmits<{
  'update:active': [active: number]
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

function setActive(index: number) {
  if (index < 0 || index >= uids.value.length) return
  if (index === props.active) return
  emit('update:active', index)
  emit('change', index)
}

function select(index: number) {
  if (!props.clickable) return
  setActive(index)
}

provideSteps({
  active: computed(() => props.active),
  direction: computed(() => props.direction),
  processStatus: computed(() => props.processStatus),
  finishStatus: computed(() => props.finishStatus),
  simple: computed(() => props.simple),
  clickable: computed(() => props.clickable),
  uids,
  register,
  unregister,
  select,
})

defineExpose({
  next: () => setActive(props.active + 1),
  prev: () => setActive(props.active - 1),
  setActive,
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(direction),
      ns.is('simple', simple),
      ns.is('clickable', clickable),
    ]"
    role="list"
  >
    <slot />
  </div>
</template>
