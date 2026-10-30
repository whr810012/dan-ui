<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import type { IconName } from '../icon'
import type { MessageType } from './types'
import './style.css'

defineOptions({ name: 'DanMessageItem' })

const props = withDefaults(
  defineProps<{
    id: string
    message: string
    type?: MessageType
    duration?: number
    showClose?: boolean
    repeat?: number
    tick?: number
  }>(),
  {
    type: 'info',
    duration: 3000,
    showClose: false,
    repeat: 1,
    tick: 0,
  },
)

const emit = defineEmits<{
  close: [id: string]
}>()

const ns = useNamespace('message')
const timer = ref<number | null>(null)

const iconMap: Record<MessageType, IconName> = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error',
}

function clearTimer() {
  if (timer.value != null) {
    window.clearTimeout(timer.value)
    timer.value = null
  }
}

function startTimer() {
  clearTimer()
  if (props.duration <= 0) return
  timer.value = window.setTimeout(() => emit('close', props.id), props.duration)
}

watch(
  () => [props.tick, props.duration] as const,
  () => startTimer(),
)

onMounted(startTimer)
onBeforeUnmount(clearTimer)
</script>

<template>
  <div
    :class="[ns.e('item'), ns.m(type)]"
    role="alert"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <DanIcon :name="iconMap[type]" :class="ns.e('icon')" />
    <span :class="ns.e('content')">{{ message }}</span>
    <span v-if="repeat > 1" :class="ns.e('badge')">{{ repeat }}</span>
    <button
      v-if="showClose"
      type="button"
      :class="ns.e('close')"
      aria-label="关闭"
      @click="emit('close', id)"
    >
      <DanIcon name="close" :size="14" />
    </button>
  </div>
</template>
