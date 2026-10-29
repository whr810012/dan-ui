<script setup>
import { withBase } from 'vitepress'
import { DanImage, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap>
    <DanImage
      :src="withBase('/images/wall-sunset.png')"
      alt="城墙日落"
      style="width: 180px; height: 112px; border-radius: 8px"
      preview
    />
    <DanImage
      :src="withBase('/images/city-rainbow.png')"
      alt="城市彩虹"
      style="width: 180px; height: 112px; border-radius: 8px"
      preview
    />
    <DanImage
      :src="withBase('/images/blackhole.png')"
      alt="黑洞"
      style="width: 180px; height: 112px; border-radius: 8px"
      preview
    />
    <DanImage src="" style="width: 180px; height: 112px; border-radius: 8px" />
  </DanSpace>
</template>
