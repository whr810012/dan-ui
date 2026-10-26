<script setup lang="ts">
import { DanChatMessage } from '@dan-ui/ui'

const message = {
  id: '1',
  role: 'assistant' as const,
  content: '你好，我是助手。可以用 **Markdown** 回答。',
  status: 'done' as const,
  reasoning: '识别问候，并给出简洁回复。',
  attachments: [{ name: 'notes.md', size: 1024 }],
}
</script>

<template>
  <DanChatMessage :message="message" />
</template>
