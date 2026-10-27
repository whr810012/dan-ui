<script setup>
import { ref } from 'vue'
import { DanDatePicker } from '@dandan-ui/ui'

const value = ref(null)
</script>

<template>
  <DanDatePicker v-model="value" type="daterange" clearable />
</template>
