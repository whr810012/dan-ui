<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import MessageItem from './MessageItem.vue'
import type { MessageOptions } from './types'
import './style.css'

defineOptions({ name: 'DanMessageHost' })

defineProps<{
  items: Array<
    Required<Pick<MessageOptions, 'message'>> & MessageOptions & { id: string }
  >
}>()

const emit = defineEmits<{
  close: [id: string]
}>()

const ns = useNamespace('message')
</script>

<template>
  <div :class="ns.b()" aria-live="polite">
    <MessageItem
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :message="item.message"
      :type="item.type"
      :duration="item.duration"
      :show-close="item.showClose"
      @close="emit('close', $event)"
    />
  </div>
</template>
