<script setup>
import { DanButton, DanMessage, DanSpace } from '@dan-ui/ui'
</script>

<template>
  <DanSpace wrap>
    <DanButton @click="DanMessage('普通消息')">消息</DanButton>
    <DanButton type="success" @click="DanMessage.success('操作成功')">
      成功
    </DanButton>
    <DanButton type="warning" @click="DanMessage.warning('请注意')">
      警告
    </DanButton>
    <DanButton type="danger" @click="DanMessage.error('出错了')">
      错误
    </DanButton>
  </DanSpace>
</template>
