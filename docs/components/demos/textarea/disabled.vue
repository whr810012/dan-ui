<script setup lang="ts">
import { DanTextarea } from '@dan-ui/ui'
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 480px">
    <DanTextarea model-value="禁用文本域" :rows="3" disabled />
    <DanTextarea model-value="只读文本域" :rows="3" readonly />
  </div>
</template>
