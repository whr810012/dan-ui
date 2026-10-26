<script setup lang="ts">
import { DanButton, DanNotification } from '@dan-ui/ui'

function open(type: 'success' | 'warning' | 'info' | 'error') {
  DanNotification[type]({
    title: type,
    message: '这是一条通知消息',
  })
}
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <DanButton type="primary" @click="open('success')">成功</DanButton>
    <DanButton @click="open('info')">信息</DanButton>
    <DanButton type="warning" @click="open('warning')">警告</DanButton>
    <DanButton type="danger" @click="open('error')">错误</DanButton>
  </div>
</template>
