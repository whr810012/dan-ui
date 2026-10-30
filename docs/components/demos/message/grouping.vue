<script setup>
import { DanButton, DanMessage, DanSpace } from '@dandan-ui/ui'

function spam() {
  DanMessage.success('保存成功', { offset: 80 })
}

function unique() {
  DanMessage.info(`随机 ${Date.now() % 1000}`, { grouping: false, offset: 80 })
}
</script>

<template>
  <DanSpace>
    <DanButton type="primary" @click="spam">合并相同消息</DanButton>
    <DanButton @click="unique">不合并</DanButton>
  </DanSpace>
</template>
