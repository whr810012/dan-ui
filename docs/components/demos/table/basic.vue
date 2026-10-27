<script setup lang="ts">
import { DanTable } from '@dandan-ui/ui'
import type { TableColumn } from '@dandan-ui/ui'

const columns: TableColumn[] = [
  { prop: 'name', label: '姓名', minWidth: 100, filterable: true },
  {
    prop: 'role',
    label: '角色',
    width: 120,
    filterable: {
      type: 'select',
      options: [
        { label: '管理', value: 'admin' },
        { label: '成员', value: 'member' },
      ],
    },
  },
  { prop: 'age', label: '年龄', width: 100, sortable: true, align: 'right' },
  { prop: 'city', label: '城市', minWidth: 120 },
]

const data = [
  { id: 1, name: '张三', role: 'admin', age: 28, city: '上海' },
  { id: 2, name: '李四', role: 'member', age: 22, city: '杭州' },
  { id: 3, name: '王五', role: 'member', age: 31, city: '北京' },
  { id: 4, name: '赵六', role: 'admin', age: 26, city: '深圳' },
]
</script>

<template>
  <DanTable :columns="columns" :data="data" border stripe />
</template>
