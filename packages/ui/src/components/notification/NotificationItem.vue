<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import type { IconName } from '../icon'
import type { NotificationType } from './types'
import './style.css'

defineOptions({ name: 'DanNotificationItem' })

const props = withDefaults(
  defineProps<{
    id: string
    title?: string
    message?: string
    type?: NotificationType
    duration?: number
    showClose?: boolean
  }>(),
  {
    title: '',
    message: '',
    type: 'info',
    duration: 4500,
    showClose: true,
  },
)

const emit = defineEmits<{
  close: [id: string]
}>()

const ns = useNamespace('notification')
const timer = ref<number | null>(null)

const iconMap: Record<NotificationType, IconName> = {
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

onMounted(startTimer)
onBeforeUnmount(clearTimer)
</script>

<template>
  <div
    :class="[ns.e('item'), ns.m(type)]"
    role="alert"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
    aria-atomic="true"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <DanIcon :name="iconMap[type]" :class="ns.e('icon')" />
    <div :class="ns.e('main')">
      <div v-if="title" :class="ns.e('title')">{{ title }}</div>
      <div v-if="message" :class="ns.e('content')">{{ message }}</div>
    </div>
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
