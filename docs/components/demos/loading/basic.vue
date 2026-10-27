<script setup>
import { ref } from 'vue'
import { DanButton, DanLoading, DanSpace } from '@dandan-ui/ui'

const loading = ref(true)
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanButton @click="loading = !loading">
      {{ loading ? '结束加载' : '开始加载' }}
    </DanButton>
    <DanLoading :loading="loading" text="加载中…">
      <div style="padding: 24px; background: var(--dan-color-bg-muted)">
        这是被遮罩的内容区域。
      </div>
    </DanLoading>
  </DanSpace>
</template>
