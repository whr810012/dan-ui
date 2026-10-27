<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | null>(null)
const disabledDate = (date: Date) => date.getDay() === 0 || date.getDay() === 6
</script>

<template>
  <DanDatePicker v-model="value" clearable :disabled-date="disabledDate" />
</template>
