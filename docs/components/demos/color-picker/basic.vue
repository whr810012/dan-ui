<script setup>
import { ref } from 'vue'
import { DanColorPicker } from '@dan-ui/ui'

const color = ref('#2563eb')
</script>

<template>
  <DanColorPicker v-model="color" />
</template>
