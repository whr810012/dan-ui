<script setup>
import { ref } from 'vue'
import { DanTreeSelect } from '@dandan-ui/ui'

const value = ref(null)
const data = [
  {
    id: 1,
    label: '一级 1',
    children: [
      { id: 11, label: '二级 1-1' },
      { id: 12, label: '二级 1-2' },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [{ id: 21, label: '二级 2-1' }],
  },
]
</script>

<template>
  <DanTreeSelect v-model="value" :data="data" clearable />
</template>
