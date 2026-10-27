<script setup>
import { ref } from 'vue'
import { DanMenu, DanMenuItem, DanSubMenu } from '@dandan-ui/ui'

const active = ref('1-1')
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: flex-start">
    <DanMenu v-model="active" style="width: 220px" :default-openeds="['1']">
      <DanSubMenu index="1" title="导航一">
        <DanMenuItem index="1-1">选项 1</DanMenuItem>
        <DanMenuItem index="1-2">选项 2</DanMenuItem>
      </DanSubMenu>
      <DanMenuItem index="2">导航二</DanMenuItem>
      <DanMenuItem index="3" disabled>导航三</DanMenuItem>
    </DanMenu>

    <DanMenu v-model="active" mode="horizontal" style="flex: 1">
      <DanMenuItem index="h-1">处理中心</DanMenuItem>
      <DanSubMenu index="h-2" title="我的工作台">
        <DanMenuItem index="h-2-1">选项一</DanMenuItem>
        <DanMenuItem index="h-2-2">选项二</DanMenuItem>
      </DanSubMenu>
      <DanMenuItem index="h-3">消息中心</DanMenuItem>
    </DanMenu>
  </div>
</template>
