<script setup>
import { DanButton, DanPageHeader } from '@dandan-ui/ui'

function onBack() {
  // 业务侧自行处理路由或历史返回
  console.log('back')
}
</script>

<template>
  <DanPageHeader title="订单详情" subtitle="SO-20261028" @back="onBack">
    <template #breadcrumb>首页 / 订单 / 详情</template>
    <template #extra>
      <DanButton size="small">编辑</DanButton>
      <DanButton type="primary" size="small">保存</DanButton>
    </template>
  </DanPageHeader>
</template>
