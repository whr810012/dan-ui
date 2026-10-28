<script setup>
import { DanFloatButton, DanMessage } from '@dandan-ui/ui'
</script>

<template>
  <div style="height: 120px; position: relative">
    <p>右下角悬浮按钮（文档区内演示用相对容器时仍为 fixed，请看页面角落）</p>
    <DanFloatButton type="primary" :bottom="24" :right="24" @click="DanMessage.info('clicked')" />
  </div>
</template>
