<script setup lang="ts">
import { DanMarkdown } from '@dan-ui/ui'

const content = `## Hello

支持 **加粗**、代码与列表：

- 表单
- Chat
- 富文本

\`\`\`ts
const ok = true
\`\`\`
`
</script>

<template>
  <DanMarkdown :content="content" />
</template>
