<script setup>
import { DanBackTop } from '@dan-ui/ui'
</script>

<template>
  <div>
    <p style="margin: 0; color: var(--dan-color-text-secondary)">
      滚动页面超过 200px 后，右下角会出现回到顶部按钮。
    </p>
    <DanBackTop :visibility-height="200" :right="40" :bottom="80" />
  </div>
</template>
