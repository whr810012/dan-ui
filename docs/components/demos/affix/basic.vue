<script setup>
import { DanAffix, DanButton } from '@dan-ui/ui'
</script>

<template>
  <div style="padding: 8px 0">
    <p style="margin: 0 0 12px; color: var(--dan-color-text-secondary)">
      向下滚动页面，按钮会固定在顶部。
    </p>
    <DanAffix :offset="80">
      <DanButton type="primary">固钉按钮</DanButton>
    </DanAffix>
  </div>
</template>
