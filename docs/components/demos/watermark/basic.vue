<script setup>
import { DanWatermark } from '@dandan-ui/ui'
</script>

<template>
  <DanWatermark content="dan-ui" :gap="[120, 80]">
    <div style="height: 180px; padding: 16px; border: 1px solid var(--dan-color-border)">
      页面内容区域
    </div>
  </DanWatermark>
</template>
