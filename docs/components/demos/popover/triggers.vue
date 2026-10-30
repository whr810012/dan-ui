<script setup>
import { DanButton, DanPopover, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap>
    <DanPopover
      title="点击"
      content="click 触发，可配置 showAfter / hideAfter"
      trigger="click"
      :show-after="0"
    >
      <DanButton>click</DanButton>
    </DanPopover>
    <DanPopover title="悬停" content="hover 延迟显示" trigger="hover" :show-after="200">
      <DanButton>hover</DanButton>
    </DanPopover>
    <DanPopover title="聚焦" content="focus 触发" trigger="focus" :show-after="0">
      <DanButton>focus</DanButton>
    </DanPopover>
    <DanPopover
      title="右键"
      content="contextmenu 触发"
      trigger="contextmenu"
      :show-after="0"
    >
      <DanButton>右键</DanButton>
    </DanPopover>
  </DanSpace>
</template>
