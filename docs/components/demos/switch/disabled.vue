<script setup lang="ts">
import { DanSwitch } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; gap: 16px">
    <DanSwitch :model-value="true" disabled />
    <DanSwitch :model-value="false" disabled />
  </div>
</template>
