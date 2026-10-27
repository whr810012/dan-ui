<script setup lang="ts">
import { ref } from 'vue'

const single = ref<string | null>(null)
const range = ref<[string, string] | null>(null)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <DanDatePicker v-model="single" type="datetime" clearable />
    <DanDatePicker v-model="range" type="datetimerange" clearable />
  </div>
</template>