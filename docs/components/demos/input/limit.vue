<script setup lang="ts">
import { ref } from 'vue'
import { DanInput } from '@dan-ui/ui'

const value = ref('')
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 360px">
    <DanInput
      v-model="value"
      maxlength="20"
      placeholder="最多 20 个字符"
      clearable
    />
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      {{ value.length }} / 20
    </div>
  </div>
</template>
