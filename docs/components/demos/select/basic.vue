<script setup lang="ts">
import { ref } from 'vue'
import { DanSelect } from '@dan-ui/ui'

const value = ref('shanghai')
const options = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

<template>
  <DanSelect v-model="value" :options="options" style="max-width: 280px" />
</template>
