<script setup lang="ts">
const columns = [
  { prop: 'name', label: '商品' },
  { prop: 'qty', label: '数量', align: 'right' as const },
  { prop: 'amount', label: '金额', align: 'right' as const },
]

const data = [
  { id: 1, name: '组件库订阅', qty: 2, amount: 199 },
  { id: 2, name: '设计资源包', qty: 1, amount: 89 },
  { id: 3, name: '咨询服务', qty: 3, amount: 450 },
]
</script>

<template>
  <DanTable show-summary :columns="columns" :data="data" border />
</template>
