<script setup>
import { ref } from 'vue'
import { DanSegmented } from '@dandan-ui/ui'

const value = ref('day')
const options = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
]
</script>

<template>
  <DanSegmented v-model="value" :options="options" />
</template>
