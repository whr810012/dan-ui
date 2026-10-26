<script setup>
import { DanDescriptions, DanDescriptionsItem } from '@dan-ui/ui'
</script>
<template>
  <DanDescriptions title="用户信息" :column="2" border>
    <DanDescriptionsItem label="姓名">张三</DanDescriptionsItem>
    <DanDescriptionsItem label="城市">上海</DanDescriptionsItem>
    <DanDescriptionsItem label="手机">138****0000</DanDescriptionsItem>
    <DanDescriptionsItem label="备注" :span="2"
      >一期数据展示组件</DanDescriptionsItem
    >
  </DanDescriptions>
</template>
