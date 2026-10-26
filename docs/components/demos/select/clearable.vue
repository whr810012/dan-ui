<script setup lang="ts">
import { ref } from 'vue'
import { DanSelect } from '@dan-ui/ui'

const value = ref('beijing')
const options = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州（禁用）', value: 'hangzhou', disabled: true },
]
</script>

<template>
  <DanSelect
    v-model="value"
    :options="options"
    clearable
    placeholder="请选择城市"
    style="max-width: 280px"
  />
</template>
