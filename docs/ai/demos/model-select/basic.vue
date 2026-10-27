<script setup lang="ts">
import { ref } from 'vue'
import { DanModelSelect } from '@dandan-ui/ui'

const model = ref('demo-mini')
const options = [
  { label: 'demo-mini', value: 'demo-mini' },
  { label: 'demo-pro', value: 'demo-pro' },
]
</script>

<template>
  <DanModelSelect v-model="model" :options="options" />
</template>
