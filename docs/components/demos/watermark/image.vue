<script setup>
import { withBase } from 'vitepress'
import { DanWatermark } from '@dandan-ui/ui'
</script>

<template>
  <DanWatermark
    :image="withBase('/logo.svg')"
    :image-width="48"
    :image-height="48"
    :image-opacity="0.35"
    :gap="[120, 120]"
    :rotate="-15"
  >
    <div
      style="
        height: 180px;
        padding: 16px;
        border: 1px solid var(--dan-color-border);
      "
    >
      图片水印区域
    </div>
  </DanWatermark>
</template>
