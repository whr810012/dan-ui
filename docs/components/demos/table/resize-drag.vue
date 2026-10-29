<script setup>
import { ref } from 'vue'
import { DanTable } from '@dandan-ui/ui'

const columns = [
  { prop: 'name', label: '姓名', width: 140 },
  { prop: 'role', label: '角色', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
]

const data = ref([
  { id: 1, name: '张三', role: '管理', age: 28 },
  { id: 2, name: '李四', role: '成员', age: 22 },
  { id: 3, name: '王五', role: '成员', age: 31 },
])

function onRowDragEnd({ keys }) {
  const map = new Map(data.value.map((row) => [String(row.id), row]))
  data.value = keys.map((key) => map.get(String(key))).filter(Boolean)
}
</script>

<template>
  <DanTable
    :columns="columns"
    :data="data"
    border
    row-draggable
    @column-resize-end="() => {}"
    @row-drag-end="onRowDragEnd"
  />
</template>
