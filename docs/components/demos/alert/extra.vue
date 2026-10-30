<script setup>
import { DanAlert, DanSpace } from '@dandan-ui/ui'
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%" :size="12">
    <DanAlert
      title="居中提示"
      type="success"
      description="适合短文案公告。"
      center
      show-icon
    />
    <DanAlert title="可关闭" type="warning" close-text="知道了" />
  </DanSpace>
</template>
