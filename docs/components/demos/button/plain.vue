<script setup lang="ts">
import { DanButton } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <DanButton type="primary" plain>主要</DanButton>
    <DanButton type="success" plain>成功</DanButton>
    <DanButton type="warning" plain>警告</DanButton>
    <DanButton type="danger" plain>危险</DanButton>
  </div>
</template>
