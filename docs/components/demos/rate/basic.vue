<script setup>
import { ref } from 'vue'
import { DanRate } from '@dandan-ui/ui'

const value = ref(3.5)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <DanRate v-model="value" allow-half />
    <DanRate :model-value="4" disabled />
  </div>
</template>
