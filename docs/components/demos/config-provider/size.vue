<script setup lang="ts">
import { ref } from 'vue'
import { DanButton, DanConfigProvider, DanInput } from '@dan-ui/ui'

const size = ref<'small' | 'default' | 'large'>('large')
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="display: flex; gap: 8px">
      <DanButton
        size="small"
        :type="size === 'small' ? 'primary' : 'default'"
        @click="size = 'small'"
      >
        small
      </DanButton>
      <DanButton
        size="small"
        :type="size === 'default' ? 'primary' : 'default'"
        @click="size = 'default'"
      >
        default
      </DanButton>
      <DanButton
        size="small"
        :type="size === 'large' ? 'primary' : 'default'"
        @click="size = 'large'"
      >
        large
      </DanButton>
    </div>
    <DanConfigProvider :size="size">
      <div
        style="display: flex; gap: 8px; align-items: center; max-width: 420px"
      >
        <DanInput placeholder="继承尺寸" style="flex: 1" />
        <DanButton type="primary">按钮</DanButton>
      </div>
    </DanConfigProvider>
  </div>
</template>
