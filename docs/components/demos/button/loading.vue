<script setup lang="ts">
import { ref } from 'vue'
import { DanButton } from '@dan-ui/ui'

const loading = ref(false)

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <DanButton type="primary" :loading="loading" @click="onClick">
      点击加载
    </DanButton>
    <DanButton type="primary" disabled>禁用</DanButton>
  </div>
</template>
