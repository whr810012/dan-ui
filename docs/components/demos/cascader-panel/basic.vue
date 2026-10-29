<script setup>
import { ref } from 'vue'
import { DanCascaderPanel } from '@dandan-ui/ui'

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
    children: [{ value: 'nanjing', label: '南京' }],
  },
]
</script>

<template>
  <div>
    <DanCascaderPanel v-model="value" :options="options" />
    <div style="margin-top: 8px; color: var(--dan-color-text-secondary)">
      {{ value }}
    </div>
  </div>
</template>
