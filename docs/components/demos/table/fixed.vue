<script setup lang="ts">
const columns = [
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: '部门', width: 140 },
  { prop: 'city', label: '城市', width: 140 },
  { prop: 'email', label: '邮箱', width: 220 },
  { prop: 'phone', label: '电话', width: 160 },
  { prop: 'action', label: '操作', width: 100, fixed: 'right' as const },
]

const data = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  dept: i % 2 ? '设计' : '研发',
  city: i % 2 ? '上海' : '北京',
  email: `user${i + 1}@example.com`,
  phone: `1380000${String(i).padStart(4, '0')}`,
  action: '编辑',
}))
</script>

<template>
  <DanTable :columns="columns" :data="data" border />
</template>
