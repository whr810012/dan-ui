<script setup lang="ts">
import { ref } from 'vue'
import { DanRichText } from '@dan-ui/ui'

const value = ref({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: '这是 JSON 输出模式' }],
    },
  ],
})
</script>

<template>
  <div style="display: grid; gap: 12px">
    <DanRichText v-model="value" output="json" />
    <pre
      style="
        margin: 0;
        padding: 12px;
        overflow: auto;
        border-radius: 8px;
        background: #0b1220;
        color: #e2e8f0;
        font-size: 12px;
      "
      >{{ JSON.stringify(value, null, 2) }}</pre>
  </div>
</template>
