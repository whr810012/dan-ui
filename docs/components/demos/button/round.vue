<script setup lang="ts">
import { DanButton, DanIcon } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <DanButton type="primary" round>圆角按钮</DanButton>
    <DanButton type="success" round plain>圆角描边</DanButton>
    <DanButton type="primary" circle>
      <template #icon><DanIcon name="search" /></template>
    </DanButton>
    <DanButton type="danger" circle>
      <template #icon><DanIcon name="delete" /></template>
    </DanButton>
    <DanButton text type="primary">文字按钮</DanButton>
    <DanButton link type="primary">链接按钮</DanButton>
  </div>
</template>
