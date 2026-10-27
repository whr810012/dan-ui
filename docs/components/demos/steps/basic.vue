<script setup>
import { ref } from 'vue'
import { DanButton, DanSteps, DanStep } from '@dan-ui/ui'

const active = ref(1)

function next() {
  active.value = Math.min(active.value + 1, 3)
}

function prev() {
  active.value = Math.max(active.value - 1, 0)
}
</script>

<template>
  <div>
    <DanSteps :active="active">
      <DanStep title="提交申请" description="填写基础信息" />
      <DanStep title="部门审核" description="主管确认" />
      <DanStep title="财务复核" description="预算核对" />
      <DanStep title="完成" description="流程结束" />
    </DanSteps>
    <div style="margin-top: 16px; display: flex; gap: 8px">
      <DanButton @click="prev">上一步</DanButton>
      <DanButton type="primary" @click="next">下一步</DanButton>
    </div>
  </div>
</template>
