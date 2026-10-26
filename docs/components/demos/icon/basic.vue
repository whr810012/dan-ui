<script setup lang="ts">
import { DanIcon } from '@dan-ui/ui'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center; font-size: 22px">
    <DanIcon name="search" />
    <DanIcon name="edit" />
    <DanIcon name="delete" color="var(--dan-color-danger)" />
    <DanIcon name="success" color="var(--dan-color-success)" />
    <DanIcon name="loading" spin />
  </div>
</template>
