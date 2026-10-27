<script setup>
import { DanTable } from '@dan-ui/ui'

const columns = [
  { prop: 'id', label: 'ID', width: 72 },
  { prop: 'name', label: '名称', minWidth: 140 },
  { prop: 'city', label: '城市', width: 100 },
]

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  city: ['上海', '杭州', '北京', '深圳'][i % 4],
}))
</script>

<template>
  <DanTable
    :columns="columns"
    :data="data"
    virtual
    :height="320"
    :row-height="44"
    border
    stripe
  />
</template>
