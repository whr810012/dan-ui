<script setup lang="ts">
import { ref } from 'vue'
import { DanButton, DanDrawer } from '@dandan-ui/ui'

const open = ref(false)
const size = ref('360px')
</script>

<template>
  <DanButton type="primary" @click="open = true">可调整宽度</DanButton>
  <DanDrawer
    v-model="open"
    v-model:size="size"
    title="可拖拽边缘调整"
    resizable
    destroy-on-close
  >
    拖拽左侧边缘调整宽度。关闭后内容会销毁（destroyOnClose）。
    <p style="margin-top: 12px; color: var(--dan-color-text-secondary)">
      当前 size：{{ size }}
    </p>
  </DanDrawer>
</template>
