<script setup lang="ts">
import { ref } from 'vue'
import { DanInput } from '@dandan-ui/ui'

const value = ref('')
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 360px">
    <DanInput v-model="value" placeholder="请输入内容" />
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      当前值：{{ value || '空' }}
    </div>
  </div>
</template>
