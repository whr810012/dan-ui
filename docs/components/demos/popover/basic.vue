<script setup lang="ts">
import { DanButton, DanPopover } from '@dandan-ui/ui'
</script>

<template>
  <div style="display: flex; gap: 16px; padding: 24px 0">
    <DanPopover
      title="标题"
      content="这是一段 Popover 内容，可放说明或轻量操作。"
      trigger="click"
    >
      <DanButton>点击触发</DanButton>
    </DanPopover>
    <DanPopover title="悬停" content="hover 时出现" trigger="hover">
      <DanButton>悬停触发</DanButton>
    </DanPopover>
  </div>
</template>
