<script setup>
import { DanTimeline, DanTimelineItem } from '@dandan-ui/ui'
</script>

<template>
  <DanTimeline mode="alternate">
    <DanTimelineItem timestamp="2026-11-01" placement="top">
      立项评审
    </DanTimelineItem>
    <DanTimelineItem timestamp="2026-11-02" type="success">
      需求确认
    </DanTimelineItem>
    <DanTimelineItem timestamp="2026-11-03" type="warning" hollow>
      开发中
    </DanTimelineItem>
    <DanTimelineItem timestamp="预计 2026-11-10" type="info">
      发布上线
    </DanTimelineItem>
  </DanTimeline>
</template>
