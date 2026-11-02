<script setup>
import { ref } from 'vue'
import { DanTransfer } from '@dandan-ui/ui'

const value = ref([2, 5])
const data = [
  { key: 1, label: '选项一' },
  { key: 2, label: '选项二' },
  { key: 3, label: '选项三' },
  { key: 4, label: '选项四', disabled: true },
  { key: 5, label: '选项五' },
  { key: 6, label: '选项六' },
]
</script>

<template>
  <DanTransfer
    v-model="value"
    :data="data"
    filterable
    filter-placeholder="输入关键字"
    :titles="['待选', '已选']"
    :button-texts="['加入', '移除']"
  />
</template>
