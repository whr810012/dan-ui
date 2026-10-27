<script setup>
import { ref } from 'vue'
import { DanInputNumber } from '@dan-ui/ui'

const value = ref(3)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <DanInputNumber v-model="value" controls-position="right" />
    <DanInputNumber v-model="value" :controls="false" />
  </div>
</template>
