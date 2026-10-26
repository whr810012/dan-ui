<script setup lang="ts">
import { DanButton, DanIcon } from '@dan-ui/ui'
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <DanButton type="primary">
      <template #icon><DanIcon name="search" /></template>
      搜索
    </DanButton>
    <DanButton type="success">
      <template #icon><DanIcon name="check" /></template>
      完成
    </DanButton>
    <DanButton type="danger" plain>
      <template #icon><DanIcon name="delete" /></template>
      删除
    </DanButton>
    <DanButton circle>
      <template #icon><DanIcon name="plus" /></template>
    </DanButton>
  </div>
</template>
