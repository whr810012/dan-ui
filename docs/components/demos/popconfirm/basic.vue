<script setup>
import { DanButton, DanPopconfirm, DanMessage } from '@dandan-ui/ui'

function onConfirm() {
  DanMessage.success('已确认')
}
</script>

<template>
  <DanPopconfirm title="确定删除这条记录？" confirm-type="danger" @confirm="onConfirm">
    <DanButton type="danger" plain>删除</DanButton>
  </DanPopconfirm>
</template>
