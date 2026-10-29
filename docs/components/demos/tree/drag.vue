<script setup>
import { ref } from 'vue'
import { DanTree } from '@dandan-ui/ui'

const data = ref([
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
])

function onDragEnd({ data: next }) {
  data.value = next
}
</script>

<template>
  <DanTree
    :data="data"
    default-expand-all
    draggable
    @node-drag-end="onDragEnd"
  />
</template>
