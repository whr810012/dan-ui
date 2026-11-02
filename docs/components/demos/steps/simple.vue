<script setup>
import { ref } from 'vue'
import { DanSteps, DanStep } from '@dandan-ui/ui'

const active = ref(1)
</script>

<template>
  <DanSteps v-model:active="active" simple clickable>
    <DanStep title="提交" />
    <DanStep title="审核" />
    <DanStep title="复核" />
    <DanStep title="完成" />
  </DanSteps>
</template>
