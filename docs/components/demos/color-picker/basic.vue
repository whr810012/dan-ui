<script setup>
import { ref } from 'vue'
import { DanColorPicker } from '@dandan-ui/ui'

const color = ref('#2563eb')
</script>

<template>
  <DanColorPicker v-model="color" />
</template>
