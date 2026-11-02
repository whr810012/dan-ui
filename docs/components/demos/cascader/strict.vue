<script setup>
import { ref } from 'vue'
import { DanCascader, DanSpace } from '@dandan-ui/ui'

const full = ref(['zhejiang', 'hangzhou'])
const leafOnly = ref(['zhejiang', 'hangzhou'])
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
  <DanSpace direction="vertical" :size="16" style="width: 100%">
    <DanCascader
      v-model="full"
      :options="options"
      :show-all-levels="false"
      separator="-"
      clearable
      placeholder="仅显示末级"
    />
    <DanCascader
      v-model="leafOnly"
      :options="options"
      check-strictly
      clearable
      placeholder="可选任意一级"
    />
  </DanSpace>
</template>
