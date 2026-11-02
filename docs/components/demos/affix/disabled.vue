<script setup>
import { ref } from 'vue'
import { DanAffix, DanButton, DanSpace, DanSwitch } from '@dandan-ui/ui'

const disabled = ref(false)
</script>

<template>
  <div style="padding: 8px 0">
    <DanSpace align="center" style="margin-bottom: 12px">
      <span style="color: var(--dan-color-text-secondary)">禁用固钉</span>
      <DanSwitch v-model="disabled" />
    </DanSpace>
    <DanAffix :offset="80" :disabled="disabled">
      <DanButton type="primary">{{ disabled ? '已禁用' : '可固定' }}</DanButton>
    </DanAffix>
  </div>
</template>
