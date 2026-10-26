<script setup>
import { ref } from 'vue'
import { DanPagination } from '@dan-ui/ui'

const page = ref(1)
</script>

<template>
  <DanPagination
    v-model:current-page="page"
    :total="100"
    :page-size="10"
    background
  />
</template>
