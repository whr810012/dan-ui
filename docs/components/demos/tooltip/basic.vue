<script setup lang="ts">
import { DanButton, DanTooltip } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; padding: 24px 0">
    <DanTooltip content="上方提示" placement="top">
      <DanButton>Top</DanButton>
    </DanTooltip>
    <DanTooltip content="下方提示" placement="bottom">
      <DanButton>Bottom</DanButton>
    </DanTooltip>
    <DanTooltip content="左侧提示" placement="left">
      <DanButton>Left</DanButton>
    </DanTooltip>
    <DanTooltip content="右侧提示" placement="right">
      <DanButton>Right</DanButton>
    </DanTooltip>
  </div>
</template>
