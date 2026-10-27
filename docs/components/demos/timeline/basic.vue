<script setup>
import { DanTimeline, DanTimelineItem } from '@dandan-ui/ui'
</script>
<template>
  <DanTimeline>
    <DanTimelineItem timestamp="2026-10-26 10:00" type="primary"
      >创建项目</DanTimelineItem
    >
    <DanTimelineItem timestamp="2026-10-26 14:00" type="success"
      >完成表单体系</DanTimelineItem
    >
    <DanTimelineItem timestamp="2026-10-26 16:00" type="warning" hollow
      >丰富数据展示</DanTimelineItem
    >
  </DanTimeline>
</template>
