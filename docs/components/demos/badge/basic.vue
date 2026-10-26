<script setup>
import { DanBadge, DanButton, DanSpace } from '@dan-ui/ui'
</script>

<template>
  <DanSpace :size="24">
    <DanBadge :value="12">
      <DanButton>消息</DanButton>
    </DanBadge>
    <DanBadge :value="120" :max="99">
      <DanButton>消息</DanButton>
    </DanBadge>
    <DanBadge is-dot>
      <DanButton>提醒</DanButton>
    </DanBadge>
  </DanSpace>
</template>
