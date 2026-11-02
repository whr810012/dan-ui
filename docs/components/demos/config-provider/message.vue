<script setup>
import { DanButton, DanConfigProvider, DanMessage, DanSpace } from '@dandan-ui/ui'

function notify() {
  DanMessage.success('配置了 duration / max 的全局 Message')
  DanMessage.info('第 2 条')
  DanMessage.warning('第 3 条会顶掉最早的（max=2）')
}
</script>

<template>
  <DanConfigProvider :message="{ duration: 2500, max: 2, offset: 48 }">
    <DanSpace>
      <DanButton type="primary" @click="notify">触发 Message</DanButton>
      <DanButton @click="DanMessage.closeAll()">全部关闭</DanButton>
    </DanSpace>
  </DanConfigProvider>
</template>
