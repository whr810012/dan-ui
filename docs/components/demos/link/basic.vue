<script setup>
import { DanLink, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace>
    <DanLink href="https://dandanhub.vip/dan-ui/" target="_blank">默认</DanLink>
    <DanLink type="primary" href="#">主要</DanLink>
    <DanLink type="success" href="#">成功</DanLink>
    <DanLink type="warning" href="#">警告</DanLink>
    <DanLink type="danger" href="#">危险</DanLink>
    <DanLink disabled href="#">禁用</DanLink>
  </DanSpace>
</template>
