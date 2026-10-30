<script setup>
import { DanProgress, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%" :size="16">
    <DanProgress :percentage="48" text-inside :stroke-width="20" />
    <DanProgress :percentage="62" striped striped-flow />
    <DanProgress indeterminate />
  </DanSpace>
</template>
