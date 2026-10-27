<script setup>
import { ref } from 'vue'
import { DanInputNumber } from '@dan-ui/ui'

const value = ref(1)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
    <DanInputNumber v-model="value" :min="1" :max="10" />
    <span style="color: var(--dan-color-text-secondary)"
      >当前值：{{ value }}</span
    >
  </div>
</template>
