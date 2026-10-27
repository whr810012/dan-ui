<script setup>
import { ref } from 'vue'
import { DanTransfer } from '@dan-ui/ui'

const value = ref([2])
const data = [
  { key: 1, label: '选项一' },
  { key: 2, label: '选项二' },
  { key: 3, label: '选项三' },
  { key: 4, label: '选项四', disabled: true },
  { key: 5, label: '选项五' },
]
</script>

<template>
  <DanTransfer
    v-model="value"
    :data="data"
    filterable
    :titles="['待选', '已选']"
  />
</template>
