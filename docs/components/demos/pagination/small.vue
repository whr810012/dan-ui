<script setup>
import { ref } from 'vue'
import { DanPagination } from '@dandan-ui/ui'

const page = ref(1)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <DanPagination
      v-model:current-page="page"
      :total="50"
      :page-size="10"
      size="small"
      background
    />
    <DanPagination :total="8" :page-size="10" hide-on-single-page />
    <p
      style="margin: 0; color: var(--dan-color-text-secondary); font-size: 13px"
    >
      上方第二行因仅一页且开启 `hide-on-single-page`，整块分页已隐藏。
    </p>
  </div>
</template>
