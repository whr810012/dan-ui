<script setup lang="ts">
import { ref } from 'vue'
import { DanChatInput } from '@dandan-ui/ui'

const last = ref('')
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 640px">
    <DanChatInput @send="last = $event" />
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      最近发送：{{ last || '无' }}
    </div>
  </div>
</template>
