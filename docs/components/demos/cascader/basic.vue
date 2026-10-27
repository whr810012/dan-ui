<script setup>
import { ref } from 'vue'
import { DanCascader } from '@dan-ui/ui'

const value = ref(null)
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波' },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
    ],
  },
]
</script>

<template>
  <DanCascader v-model="value" :options="options" clearable />
</template>
