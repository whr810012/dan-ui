<script setup>
import { ref } from 'vue'
import { DanTimePicker } from '@dan-ui/ui'

const value = ref('09:30')
</script>

<template>
  <DanTimePicker v-model="value" clearable />
</template>
