<script setup>
import { DanTable } from '@dan-ui/ui'

const columns = [
  { prop: 'name', label: '部门', minWidth: 180 },
  { prop: 'owner', label: '负责人', width: 100 },
  { prop: 'count', label: '人数', width: 88, align: 'right' },
]

const data = [
  {
    id: 1,
    name: '总部',
    owner: '张三',
    count: 120,
    children: [
      {
        id: 11,
        name: '研发中心',
        owner: '李四',
        count: 68,
        children: [
          { id: 111, name: '前端组', owner: '王五', count: 18 },
          { id: 112, name: '后端组', owner: '赵六', count: 26 },
        ],
      },
      { id: 12, name: '市场部', owner: '钱七', count: 32 },
    ],
  },
  { id: 2, name: '华东分公司', owner: '孙八', count: 45 },
]
</script>

<template>
  <DanTable :columns="columns" :data="data" tree default-expand-all border />
</template>
