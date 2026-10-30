<script setup>
import { withBase } from 'vitepress'
import { DanImage, DanSpace } from '@dandan-ui/ui'

const list = [
  withBase('/images/wall-sunset.png'),
  withBase('/images/city-rainbow.png'),
  withBase('/images/blackhole.png'),
]
</script>

<template>
  <DanSpace wrap>
    <DanImage
      v-for="(src, index) in list"
      :key="src"
      :src="src"
      :alt="`图 ${index + 1}`"
      style="width: 180px; height: 112px; border-radius: 8px"
      preview
      :preview-src-list="list"
      :initial-index="index"
    />
  </DanSpace>
</template>
