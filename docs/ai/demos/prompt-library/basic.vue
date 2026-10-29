<script setup>
import { ref } from 'vue'
import { DanPromptLibrary } from '@dandan-ui/ui'

const picked = ref('')
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 360px">
    <DanPromptLibrary
      :items="[
        { id: 'sum', title: '总结', content: '请总结', group: '写作', description: '提炼要点' },
        { id: 'code', title: '解释代码', content: '解释代码', group: '开发' },
      ]"
      @select="picked = $event.content"
    />
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      已选：{{ picked || '无' }}
    </div>
  </div>
</template>
