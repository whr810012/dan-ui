<script setup>
import { ref } from 'vue'
import { DanTree } from '@dandan-ui/ui'

const checkedKeys = ref([])
const data = [
  {
    id: 1,
    label: '一级 1',
    children: [
      { id: 11, label: '二级 1-1' },
      {
        id: 12,
        label: '二级 1-2',
        children: [{ id: 121, label: '三级 1-2-1' }],
      },
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
  <DanTree
    v-model:checked-keys="checkedKeys"
    :data="data"
    show-checkbox
    default-expand-all
  />
</template>
