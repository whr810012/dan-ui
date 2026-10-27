<script setup lang="ts">
import { ref } from 'vue'
import { DanSelect } from '@dandan-ui/ui'

const value = ref('a')
const options = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
]
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 280px">
    <DanSelect v-model="value" :options="options" size="small" />
    <DanSelect v-model="value" :options="options" size="default" />
    <DanSelect v-model="value" :options="options" size="large" />
  </div>
</template>
