<script setup>
import { DanButton, DanCard, DanLink, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap :size="16">
    <DanCard header="带操作" style="width: 280px">
      <template #extra>
        <DanLink type="primary">更多</DanLink>
      </template>
      标题右侧可用 `#extra` 放置操作入口。
    </DanCard>

    <DanCard
      header="紧凑无边框"
      size="small"
      :bordered="false"
      shadow="hover"
      style="width: 280px"
    >
      `size="small"` 缩小内边距；`bordered=false` 去掉描边。
      <template #footer>
        <DanButton size="small">确定</DanButton>
      </template>
    </DanCard>
  </DanSpace>
</template>
