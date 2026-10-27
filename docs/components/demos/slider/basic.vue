<script setup>
import { ref } from 'vue'
import { DanSlider } from '@dan-ui/ui'

const value = ref(36)
</script>

<template>
  <div>
    <DanSlider v-model="value" :show-stops="true" />
    <p style="margin: 8px 0 0; color: var(--dan-color-text-secondary)">
      当前值：{{ value }}
    </p>
  </div>
</template>
