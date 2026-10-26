<script setup lang="ts">
import { ref } from 'vue'
import { DanSuggestion } from '@dan-ui/ui'

const selected = ref('')
</script>

<template>
  <div style="display: grid; gap: 12px">
    <DanSuggestion
      :items="['写一个按钮', '解释 Form 校验', '给 Chat 加停止']"
      @select="selected = $event"
    />
    <div style="color: var(--dan-color-text-secondary); font-size: 13px">
      当前选择：{{ selected || '无' }}
    </div>
  </div>
</template>
