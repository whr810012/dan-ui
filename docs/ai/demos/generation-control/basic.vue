<script setup lang="ts">
import { ref } from 'vue'
import { DanGenerationControl } from '@dandan-ui/ui'

const generating = ref(false)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <DanGenerationControl
      :generating="generating"
      @stop="generating = false"
      @regenerate="generating = true"
    />
    <span style="font-size: 13px; color: var(--dan-color-text-secondary)">
      {{ generating ? '生成中…' : '空闲' }}
    </span>
  </div>
</template>
