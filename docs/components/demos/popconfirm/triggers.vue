<script setup>
import { DanButton, DanMessage, DanPopconfirm, DanSpace } from '@dandan-ui/ui'

function onConfirm(label) {
  DanMessage.success(`已确认：${label}`)
}
</script>

<template>
  <DanSpace wrap>
    <DanPopconfirm
      title="悬停后确认？"
      trigger="hover"
      :show-after="200"
      :hide-after="150"
      @confirm="onConfirm('hover')"
    >
      <DanButton>悬停触发</DanButton>
    </DanPopconfirm>
    <DanPopconfirm
      title="聚焦后确认？"
      trigger="focus"
      :show-after="0"
      @confirm="onConfirm('focus')"
    >
      <DanButton>聚焦触发</DanButton>
    </DanPopconfirm>
    <DanPopconfirm
      title="右键后确认？"
      trigger="contextmenu"
      confirm-type="danger"
      @confirm="onConfirm('contextmenu')"
    >
      <DanButton>右键触发</DanButton>
    </DanPopconfirm>
  </DanSpace>
</template>
