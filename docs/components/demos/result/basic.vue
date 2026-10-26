<script setup>
import { DanButton, DanResult, DanSpace } from '@dan-ui/ui'
</script>
<template>
  <DanResult
    status="success"
    title="提交成功"
    sub-title="我们会尽快处理你的申请。"
  >
    <DanSpace>
      <DanButton type="primary">返回列表</DanButton>
      <DanButton>查看详情</DanButton>
    </DanSpace>
  </DanResult>
</template>
