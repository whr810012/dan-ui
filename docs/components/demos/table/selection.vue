<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色' },
  { prop: 'age', label: '年龄', sortable: true },
]

const data = [
  { id: 1, name: '张三', role: 'admin', age: 28 },
  { id: 2, name: '李四', role: 'member', age: 22 },
  { id: 3, name: '王五', role: 'member', age: 31 },
]

const selectedRowKeys = ref<(string | number)[]>([1])
</script>

<template>
  <div>
    <p style="margin-bottom: 8px">已选：{{ selectedRowKeys.join(', ') || '无' }}</p>
    <DanTable
      v-model:selected-row-keys="selectedRowKeys"
      selection
      :columns="columns"
      :data="data"
      border
    />
  </div>
</template>
