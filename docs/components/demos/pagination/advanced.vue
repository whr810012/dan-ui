<script setup>
import { ref } from 'vue'
import { DanPagination } from '@dandan-ui/ui'

const page = ref(1)
const size = ref(10)
</script>

<template>
  <DanPagination
    v-model:current-page="page"
    v-model:page-size="size"
    :total="240"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    background
  />
</template>
