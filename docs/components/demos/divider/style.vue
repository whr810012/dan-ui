<script setup>
import { DanDivider } from '@dandan-ui/ui'
</script>

<template>
  <div>
    <p style="margin: 0">实线（默认）</p>
    <DanDivider border-style="solid" />
    <p style="margin: 0">虚线</p>
    <DanDivider border-style="dashed" />
    <p style="margin: 0">点线</p>
    <DanDivider border-style="dotted">点线文案</DanDivider>
  </div>
</template>
