<script setup lang="ts">
import { ref } from 'vue'
import { DanChatInput } from '@dandan-ui/ui'

const last = ref('')
const attachments = ref([])

function onSend(payload) {
  last.value = payload.content
  if (payload.attachments?.length) {
    last.value += ` (+${payload.attachments.length} 附件)`
  }
}
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 640px">
    <DanChatInput
      v-model:attachments="attachments"
      :commands="[
        { id: 'sum', title: '总结', content: '请帮我总结以下内容：\n' },
        { id: 'fix', title: '润色', content: '请润色以下文案：\n' },
      ]"
      @send="onSend"
    />
    <div style="font-size: 13px; color: var(--dan-color-text-secondary)">
      最近发送：{{ last || '无' }}（输入 / 可触发指令）
    </div>
  </div>
</template>
