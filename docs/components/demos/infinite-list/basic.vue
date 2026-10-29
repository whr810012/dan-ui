<script setup>
import { ref } from 'vue'
import { DanInfiniteList } from '@dandan-ui/ui'

const items = ref(Array.from({ length: 20 }, (_, i) => i + 1))
const loading = ref(false)
const finished = ref(false)

async function onLoad() {
  if (loading.value || finished.value) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 400))
  const start = items.value.length
  items.value.push(...Array.from({ length: 10 }, (_, i) => start + i + 1))
  loading.value = false
  if (items.value.length >= 60) finished.value = true
}
</script>

<template>
  <DanInfiniteList
    :loading="loading"
    :finished="finished"
    :height="240"
    @load="onLoad"
  >
    <div
      v-for="item in items"
      :key="item"
      style="padding: 10px 14px; border-bottom: 1px solid var(--dan-color-border-light)"
    >
      行 {{ item }}
    </div>
  </DanInfiniteList>
</template>
