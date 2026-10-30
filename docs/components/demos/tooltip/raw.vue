<script setup>
import { DanButton, DanTooltip } from '@dandan-ui/ui'
</script>

<template>
  <DanTooltip
    content="<strong style='color: var(--dan-color-primary)'>加粗</strong> HTML 提示"
    raw-content
    placement="top"
  >
    <DanButton>HTML 内容</DanButton>
  </DanTooltip>
</template>
