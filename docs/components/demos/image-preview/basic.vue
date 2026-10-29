<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { DanButton, DanImagePreview } from '@dandan-ui/ui'

const visible = ref(false)
</script>

<template>
  <div>
    <DanButton type="primary" @click="visible = true">预览图片</DanButton>
    <DanImagePreview
      v-model="visible"
      :url="withBase('/images/wall-sunset.png')"
      alt="demo"
    />
  </div>
</template>
