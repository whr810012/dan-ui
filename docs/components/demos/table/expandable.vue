<script setup lang="ts">
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色' },
]

const data = [
  { id: 1, name: '张三', role: 'admin', detail: '负责权限与账号体系' },
  { id: 2, name: '李四', role: 'member', detail: '参与业务功能开发' },
]
</script>

<template>
  <DanTable expandable :columns="columns" :data="data" border>
    <template #expand="{ row }">
      <div>详情：{{ row.detail }}</div>
    </template>
  </DanTable>
</template>
