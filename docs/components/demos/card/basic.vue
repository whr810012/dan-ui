<script setup>
import { DanButton, DanCard, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace wrap :size="16">
    <DanCard header="基础卡片" style="width: 280px">
      用于承载标题、正文与操作区，适合中后台信息块。
      <template #footer>
        <DanButton type="primary" size="small">查看</DanButton>
      </template>
    </DanCard>

    <DanCard shadow="hover" style="width: 280px">
      <template #cover>
        <img
          src="/images/city-rainbow.png"
          alt="城市彩虹"
          style="height: 140px; object-fit: cover"
        />
      </template>
      <template #header>封面卡片</template>
      悬停时显示阴影，可搭配本地示例图。
    </DanCard>
  </DanSpace>
</template>
