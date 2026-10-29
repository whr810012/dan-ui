<script setup>
import { DanEmpty, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap :size="24">
    <DanEmpty type="search" :image-size="72" style="width: 180px" />
    <DanEmpty type="network" :image-size="72" style="width: 180px" />
    <DanEmpty type="permission" :image-size="72" style="width: 180px" />
  </DanSpace>
</template>
