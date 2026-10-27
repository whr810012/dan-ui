<script setup>
import { DanSpace, DanTag } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap>
    <DanTag>默认</DanTag>
    <DanTag type="primary">主要</DanTag>
    <DanTag type="success">成功</DanTag>
    <DanTag type="warning">警告</DanTag>
    <DanTag type="danger">危险</DanTag>
    <DanTag type="info" closable>可关闭</DanTag>
  </DanSpace>
</template>
