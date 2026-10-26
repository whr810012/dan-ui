<script setup lang="ts">
import { ref } from 'vue'
import {
  DanChat,
  DanChatInput,
  DanGenerationControl,
  DanModelSelect,
  DanSuggestion,
  DanTokenUsage,
  type ChatMessageModel,
} from '@dan-ui/ui'

const messages = ref<ChatMessageModel[]>([
  {
    id: 'welcome',
    role: 'assistant',
    content: '你好，我是 dan-ui 演示助手。发送一条消息试试假流式输出。',
    status: 'done',
  },
])
const generating = ref(false)
const model = ref('demo-mini')
const timer = ref<number | null>(null)
const tokens = ref({ prompt: 0, completion: 0 })

const modelOptions = [
  { label: 'demo-mini', value: 'demo-mini' },
  { label: 'demo-pro', value: 'demo-pro' },
]

function clearTimer() {
  if (timer.value != null) {
    window.clearInterval(timer.value)
    timer.value = null
  }
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

async function fakeStream(prompt: string) {
  clearTimer()
  generating.value = true
  tokens.value.prompt += prompt.length

  messages.value.push({
    id: uid(),
    role: 'user',
    content: prompt,
    status: 'done',
  })

  const assistantId = uid()
  messages.value.push({
    id: assistantId,
    role: 'assistant',
    content: '',
    status: 'streaming',
    reasoning: '正在组织回答…',
  })

  const full =
    `收到：「${prompt}」\n\n` +
    '这是 **假 SSE** 演示：\n\n' +
    '- 由定时器逐字追加 `content`\n' +
    '- 业务侧可替换为真实模型流\n\n' +
    '```ts\nmessage.content += chunk\n```'

  let index = 0
  timer.value = window.setInterval(() => {
    const target = messages.value.find((item) => item.id === assistantId)
    if (!target) return
    if (index >= full.length) {
      target.status = 'done'
      generating.value = false
      clearTimer()
      return
    }
    const chunk = full.slice(index, index + 2)
    target.content += chunk
    tokens.value.completion += chunk.length
    index += 2
  }, 40)
}

function onStop() {
  clearTimer()
  generating.value = false
  const last = [...messages.value]
    .reverse()
    .find((item) => item.role === 'assistant')
  if (last && last.status === 'streaming') last.status = 'stopped'
}

function onSuggestion(text: string) {
  fakeStream(text)
}
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
      <DanModelSelect v-model="model" :options="modelOptions" />
      <DanTokenUsage
        :prompt-tokens="tokens.prompt"
        :completion-tokens="tokens.completion"
      />
      <DanGenerationControl
        :generating="generating"
        @stop="onStop"
        @regenerate="fakeStream('请再回答一次')"
      />
    </div>

    <DanSuggestion
      :items="['写一个按钮示例', '解释 Form 校验', '给 Chat 加停止按钮']"
      @select="onSuggestion"
    />

    <DanChat
      :messages="messages"
      :generating="generating"
      @send="fakeStream"
      @stop="onStop"
    >
      <template #footer>
        <DanChatInput />
      </template>
    </DanChat>
  </div>
</template>
