<script setup>
import { DanButton, DanDescriptions, DanDescriptionsItem } from '@dandan-ui/ui'
</script>

<template>
  <DanDescriptions title="订单信息" :column="2" label-width="96px" border>
    <template #extra>
      <DanButton size="small" type="primary">编辑</DanButton>
    </template>
    <DanDescriptionsItem label="单号">DN-20261103</DanDescriptionsItem>
    <DanDescriptionsItem label="状态">已发货</DanDescriptionsItem>
    <DanDescriptionsItem label="收件人">王丹丹</DanDescriptionsItem>
    <DanDescriptionsItem label="地址">杭州市西湖区</DanDescriptionsItem>
  </DanDescriptions>
</template>
