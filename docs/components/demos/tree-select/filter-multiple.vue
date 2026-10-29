<script setup>
import { ref } from 'vue'
import { DanTreeSelect, DanSpace } from '@dandan-ui/ui'

const single = ref(null)
const multi = ref([])
const data = [
  {
    id: 1,
    label: '华东',
    children: [
      { id: 11, label: '上海' },
      { id: 12, label: '杭州' },
      { id: 13, label: '南京' },
    ],
  },
  {
    id: 2,
    label: '华南',
    children: [
      { id: 21, label: '广州' },
      { id: 22, label: '深圳' },
    ],
  },
]
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanTreeSelect
      v-model="single"
      :data="data"
      filterable
      clearable
      placeholder="可搜索单选"
      style="width: 280px"
    />
    <DanTreeSelect
      v-model="multi"
      :data="data"
      multiple
      filterable
      clearable
      :max-tag-count="2"
      placeholder="可搜索多选"
      style="width: 320px"
    />
  </DanSpace>
</template>
