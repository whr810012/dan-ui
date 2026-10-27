<script setup lang="ts">
import { ref } from 'vue'

const value = ref<[string, string] | null>(null)

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

const shortcuts = [
  {
    text: '最近 7 天',
    value: () => [daysAgo(6), new Date()] as [Date, Date],
  },
  {
    text: '最近 30 天',
    value: () => [daysAgo(29), new Date()] as [Date, Date],
  },
]
</script>

<template>
  <DanDatePicker
    v-model="value"
    type="daterange"
    clearable
    :shortcuts="shortcuts"
  />
</template>
