<script setup>
import { DanEmpty, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap :size="24" style="width: 100%; justify-content: space-around">
    <DanEmpty size="small" description="小尺寸" />
    <DanEmpty size="default" description="默认" />
    <DanEmpty size="large" description="大尺寸" />
  </DanSpace>
</template>
