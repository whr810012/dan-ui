<script setup lang="ts">
import { DanInput } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 360px">
    <DanInput model-value="禁用状态" disabled />
    <DanInput model-value="只读状态" readonly />
  </div>
</template>
