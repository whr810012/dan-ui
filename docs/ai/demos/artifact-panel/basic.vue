<script setup>
import { ref } from 'vue'
import { DanArtifactPanel } from '@dandan-ui/ui'

const open = ref(true)
</script>

<template>
  <DanArtifactPanel
    v-if="open"
    title="生成结果"
    type="markdown"
    content="## Hello\n\n这是 Artifact 预览。"
    style="height: 280px; max-width: 420px"
    @close="open = false"
  />
  <button v-else type="button" @click="open = true">重新打开</button>
</template>
