<script setup lang="ts">
import { DanIcon } from '@dan-ui/ui'
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center; font-size: 20px">
    <DanIcon name="plus" />
    <DanIcon name="check" color="var(--dan-color-success)" />
    <DanIcon name="close" color="var(--dan-color-danger)" />
    <DanIcon name="loading" spin />
  </div>
</template>
