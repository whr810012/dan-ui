<script setup lang="ts">
import { ref } from 'vue'
import { DanSwitch } from '@dan-ui/ui'

const value = ref('on')
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <DanSwitch v-model="value" active-value="on" inactive-value="off" />
    <span style="font-size: 13px; color: var(--dan-color-text-secondary)">
      当前值：{{ value }}
    </span>
  </div>
</template>
