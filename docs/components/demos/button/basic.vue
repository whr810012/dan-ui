<script setup lang="ts">
import { DanButton } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <DanButton>默认</DanButton>
    <DanButton type="primary">主要</DanButton>
    <DanButton type="success">成功</DanButton>
    <DanButton type="warning">警告</DanButton>
    <DanButton type="danger">危险</DanButton>
  </div>
</template>
