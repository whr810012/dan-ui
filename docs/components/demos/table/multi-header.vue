<script setup>
import { DanTable } from '@dandan-ui/ui'

const columns = [
  { prop: 'id', label: 'ID', width: 64 },
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名', minWidth: 100, filterable: true },
      { prop: 'age', label: '年龄', width: 88, sortable: true, align: 'right' },
    ],
  },
  {
    label: '任职',
    children: [
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
      { prop: 'city', label: '城市', minWidth: 100 },
    ],
  },
]

const data = [
  { id: 1, name: '张三', role: 'admin', age: 28, city: '上海' },
  { id: 2, name: '李四', role: 'member', age: 22, city: '杭州' },
  { id: 3, name: '王五', role: 'member', age: 31, city: '北京' },
]
</script>

<template>
  <DanTable :columns="columns" :data="data" border stripe />
</template>
