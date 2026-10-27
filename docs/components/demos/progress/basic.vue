<script setup>
import { DanProgress, DanSpace } from '@dandan-ui/ui'
</script>
<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanProgress :percentage="36" />
    <DanProgress :percentage="72" status="success" />
    <DanProgress type="circle" :percentage="64" />
  </DanSpace>
</template>
