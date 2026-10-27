<script setup lang="ts">
import { ref } from 'vue'
import { DanAttachment, type ChatAttachment } from '@dandan-ui/ui'

const file = ref<ChatAttachment | null>({
  name: 'design-spec.pdf',
  size: 248576,
  type: 'application/pdf',
})
</script>

<template>
  <DanAttachment v-if="file" :file="file" removable @remove="file = null" />
  <span v-else style="color: var(--dan-color-text-secondary)">附件已移除</span>
</template>
