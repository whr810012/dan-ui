<script setup>
import { ref } from 'vue'
import { DanButton, DanSkeleton, DanSpace } from '@dandan-ui/ui'

const loading = ref(false)

function flash() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 120)
}

function load() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 800)
}
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanSpace>
      <DanButton @click="flash">短加载（不闪）</DanButton>
      <DanButton type="primary" @click="load">正常加载</DanButton>
    </DanSpace>
    <DanSkeleton :loading="loading" :throttle="300" :rows="3" animated>
      <div>内容已就绪</div>
    </DanSkeleton>
  </DanSpace>
</template>
