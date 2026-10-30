<script setup>
import { ref, watch } from 'vue'
import { DanInput, DanTree } from '@dandan-ui/ui'

const query = ref('')
const treeRef = ref()
const data = [
  {
    id: 1,
    label: '文档',
    children: [
      { id: 11, label: '指南' },
      { id: 12, label: '组件' },
    ],
  },
  {
    id: 2,
    label: '资源',
    children: [
      { id: 21, label: '设计稿' },
      { id: 22, label: '图标' },
    ],
  },
]

watch(query, (value) => {
  treeRef.value?.filter(value)
})
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 360px">
    <DanInput v-model="query" clearable placeholder="过滤节点" />
    <DanTree ref="treeRef" :data="data" default-expand-all />
  </div>
</template>
