<script setup>
import { ref } from 'vue'
import { DanInputNumber, DanSpace } from '@dandan-ui/ui'

const value = ref(1)
</script>

<template>
  <DanSpace :size="16">
    <DanInputNumber
      v-model="value"
      :step="0.2"
      :precision="2"
      controls-position="right"
    />
    <DanInputNumber
      v-model="value"
      :step="0.5"
      :precision="1"
      step-strictly
    />
  </DanSpace>
</template>
