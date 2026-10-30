<script setup>
import { ref } from 'vue'
import { DanSlider } from '@dandan-ui/ui'

const value = ref(37)

const marks = {
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: { color: 'var(--dan-color-primary)' },
    label: '50%',
  },
  100: '100%',
}
</script>

<template>
  <div>
    <DanSlider v-model="value" :marks="marks" :step="1" />
    <p style="margin: 8px 0 0; color: var(--dan-color-text-secondary)">
      当前值：{{ value }}
    </p>
  </div>
</template>
