<script setup>
import { ref } from 'vue'
import { DanTimePicker } from '@dandan-ui/ui'

const value = ref(['09:00', '18:00'])
</script>

<template>
  <DanTimePicker v-model="value" is-range clearable />
</template>
