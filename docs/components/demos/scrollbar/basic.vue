<script setup>
import { DanScrollbar } from '@dandan-ui/ui'
</script>

<template>
  <DanScrollbar height="160px" style="width: 280px; border: 1px solid var(--dan-color-border); border-radius: 8px">
    <div v-for="n in 20" :key="n" style="padding: 8px 12px">
      滚动行 {{ n }}
    </div>
  </DanScrollbar>
</template>
