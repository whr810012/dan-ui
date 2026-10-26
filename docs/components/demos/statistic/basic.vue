<script setup>
import { DanSpace, DanStatistic } from '@dan-ui/ui'
</script>
<template>
  <DanSpace :size="32">
    <DanStatistic title="日活用户" :value="12890" />
    <DanStatistic title="转化率" :value="36.8" :precision="1" suffix="%" />
  </DanSpace>
</template>
