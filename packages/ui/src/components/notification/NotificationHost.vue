<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import NotificationItem from './NotificationItem.vue'
import type { NotificationOptions, NotificationPosition } from './types'
import './style.css'

defineOptions({ name: 'DanNotificationHost' })

const props = defineProps<{
  items: Array<NotificationOptions & { id: string }>
  position: NotificationPosition
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
</script>

<template>
  <div
    v-show="list.length"
    :class="[ns.b(), ns.m(position)]"
    aria-live="polite"
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
      @close="emit('close', $event)"
    />
  </div>
</template>
