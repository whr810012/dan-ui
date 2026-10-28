<script setup>
import { DanSplitter, DanSplitterPanel } from '@dandan-ui/ui'
</script>

<template>
  <DanSplitter style="height: 160px">
    <DanSplitterPanel :size="35">
      <div style="padding: 12px">左侧</div>
    </DanSplitterPanel>
    <DanSplitterPanel :size="65">
      <div style="padding: 12px">右侧（拖拽中间分隔条）</div>
    </DanSplitterPanel>
  </DanSplitter>
</template>
