<script setup>
import { ref } from 'vue'
import { DanDatePicker } from '@dandan-ui/ui'

const value = ref(null)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <DanDatePicker v-model="value" clearable placeholder="请选择日期" />
    <span style="color: var(--dan-color-text-secondary)">
      当前：{{ value || '未选择' }}
    </span>
  </div>
</template>
