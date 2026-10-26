<script setup lang="ts">
import { computed } from 'vue'
import type { ChatAttachment } from '../../types/chat'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanAttachment' })

const props = defineProps<{
  file: ChatAttachment
  removable?: boolean
}>()

const emit = defineEmits<{
  remove: [file: ChatAttachment]
}>()

const ns = useNamespace('attachment')

const sizeLabel = computed(() => {
  const size = props.file.size
  if (size == null) return ''
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
})
</script>

<template>
  <div :class="ns.b()" :title="file.name">
    <div :class="ns.e('meta')">
      <span :class="ns.e('name')">{{ file.name }}</span>
      <span v-if="sizeLabel" :class="ns.e('size')">{{ sizeLabel }}</span>
    </div>
    <button
      v-if="removable"
      type="button"
      :class="ns.e('remove')"
      aria-label="移除附件"
      @click="emit('remove', file)"
    >
      ×
    </button>
  </div>
</template>
