<script setup>
import { DanSpace, DanStatistic } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace :size="32">
    <DanStatistic title="成交额" :value="1289600.5" :precision="2" prefix="¥" />
    <DanStatistic
      title="欧洲格式"
      :value="1289600.5"
      :precision="2"
      group-separator="."
      decimal-separator=","
      suffix="€"
    />
    <DanStatistic title="自定义" :value="42" :formatter="(v) => `No.${v}`" />
  </DanSpace>
</template>
