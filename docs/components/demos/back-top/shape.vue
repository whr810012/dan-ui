<script setup>
import { DanBackTop } from '@dandan-ui/ui'
</script>

<template>
  <div>
    <p style="margin: 0; color: var(--dan-color-text-secondary)">
      滚动后右下角可见圆形与方形回到顶部按钮。
    </p>
    <DanBackTop shape="circle" :visibility-height="120" :right="100" :bottom="80" />
    <DanBackTop shape="square" :visibility-height="120" :right="40" :bottom="80" />
  </div>
</template>
