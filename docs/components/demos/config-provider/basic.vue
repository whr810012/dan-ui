<script setup lang="ts">
import { DanButton, DanConfigProvider } from '@dan-ui/ui'
</script>

<template>
  <DanConfigProvider size="large" :theme="{ 'color-primary': '#0f766e' }">
    <DanButton type="primary">大型青绿主按钮</DanButton>
  </DanConfigProvider>
</template>
