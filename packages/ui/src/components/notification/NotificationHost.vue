<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import NotificationItem from './NotificationItem.vue'
import type { NotificationOptions, NotificationPosition } from './types'
import './style.css'

defineOptions({ name: 'DanNotificationHost' })

const props = defineProps<{
  items: Array<
    NotificationOptions & { id: string; repeat: number; tick: number }
  >
  position: NotificationPosition
  offset?: number
}>()

const emit = defineEmits<{
  close: [id: string]
}>()

const ns = useNamespace('notification')

const list = computed(() =>
  props.items.filter(
    (item) => (item.position ?? 'top-right') === props.position,
  ),
)

const hostStyle = computed(() => {
  const offset = `${props.offset ?? 16}px`
  if (props.position.startsWith('top')) return { top: offset }
  return { bottom: offset }
})
</script>

<template>
  <div
    v-show="list.length"
    :class="[ns.b(), ns.m(position)]"
    aria-live="polite"
    :style="hostStyle"
  >
    <NotificationItem
      v-for="item in list"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :message="item.message"
      :type="item.type"
      :duration="item.duration"
      :show-close="item.showClose"
      :repeat="item.repeat"
      :tick="item.tick"
      @close="emit('close', $event)"
    />
  </div>
</template>
