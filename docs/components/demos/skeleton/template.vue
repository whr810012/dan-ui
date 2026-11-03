<script setup>
import { DanSkeleton, DanSkeletonItem, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanSkeleton :count="2" animated>
      <template #template>
        <DanSpace>
          <DanSkeletonItem variant="circle" />
          <DanSpace direction="vertical" style="flex: 1">
            <DanSkeletonItem variant="caption" />
            <DanSkeletonItem variant="text" />
            <DanSkeletonItem variant="button" />
          </DanSpace>
        </DanSpace>
      </template>
    </DanSkeleton>
  </DanSpace>
</template>
