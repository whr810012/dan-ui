<script setup>
import { DanAlert, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanAlert title="成功提示" type="success" />
    <DanAlert title="警告提示" type="warning" description="请留意相关风险。" />
    <DanAlert title="错误提示" type="error" closable />
    <DanAlert title="信息提示" type="info" />
  </DanSpace>
</template>
