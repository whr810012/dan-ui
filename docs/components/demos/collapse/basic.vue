<script setup>
import { ref } from 'vue'
import { DanCollapse, DanCollapseItem } from '@dan-ui/ui'
const active = ref(['1'])
</script>
<template>
  <DanCollapse v-model="active">
    <DanCollapseItem title="一致性 Consistency" name="1"
      >与真实产品保持一致的交互与视觉。</DanCollapseItem
    >
    <DanCollapseItem title="反馈 Feedback" name="2"
      >及时反馈用户操作结果。</DanCollapseItem
    >
    <DanCollapseItem title="效率 Efficiency" name="3"
      >用清晰信息减少决策成本。</DanCollapseItem
    >
  </DanCollapse>
</template>
