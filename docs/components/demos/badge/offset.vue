<script setup>
import { DanBadge, DanButton, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace :size="24">
    <DanBadge :value="8" :offset="[10, -2]">
      <DanButton>偏移</DanButton>
    </DanBadge>
    <DanBadge :value="0" show-zero>
      <DanButton>显示 0</DanButton>
    </DanBadge>
  </DanSpace>
</template>
