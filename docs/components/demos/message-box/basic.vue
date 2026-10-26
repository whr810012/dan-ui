<script setup lang="ts">
import { DanButton, DanMessage, DanMessageBox } from '@dan-ui/ui'

async function onAlert() {
  await DanMessageBox.alert('这是一条提示', '提示')
  DanMessage.success('已关闭')
}

async function onConfirm() {
  try {
    await DanMessageBox.confirm('确定删除该记录吗？', '警告', {
      type: 'warning',
    })
    DanMessage.success('已确认')
  } catch {
    DanMessage.info('已取消')
  }
}
</script>

<template>
  <div style="display: flex; gap: 12px">
    <DanButton @click="onAlert">Alert</DanButton>
    <DanButton type="danger" @click="onConfirm">Confirm</DanButton>
  </div>
</template>
