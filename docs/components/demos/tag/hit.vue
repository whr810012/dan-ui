<script setup>
import { DanSpace, DanTag } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap>
    <DanTag type="primary" hit>主要强调</DanTag>
    <DanTag type="success" hit effect="plain">成功描边</DanTag>
    <DanTag type="danger" hit closable>危险强调</DanTag>
  </DanSpace>
</template>
