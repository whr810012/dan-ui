<script setup>
import { computed, ref } from 'vue'
import {
  DanAgentSteps,
  DanArtifactPanel,
  DanChat,
  DanChatInput,
  DanChatWorkspace,
  DanConversationList,
  DanMediaPreview,
  patchChatToolPart,
} from '@dandan-ui/ui'

const active = ref('1')
const conversations = ref([
  { id: '1', title: '工作台示例', preview: '检索 + 生成' },
  { id: '2', title: '另一会话', preview: '…' },
])

const showArtifact = ref(true)
const artifact = ref({
  title: '检索摘要',
  type: 'markdown',
  content: '## 结果\n\n- dan-ui 1.8 新增 ChatWorkspace\n- 支持流式 tool 就地更新',
})

const messages = ref([
  {
    id: 'm1',
    role: 'user',
    content: '帮我查 dan-ui 1.8 有什么',
    status: 'done',
  },
  {
    id: 'm2',
    role: 'assistant',
    content: '',
    status: 'done',
    parts: [
      { type: 'text', content: '先规划再调用工具：' },
      {
        type: 'tool',
        toolCallId: 'call_1',
        name: 'search_docs',
        status: 'done',
        input: { q: '1.8' },
        output: 'ChatWorkspace / AgentSteps / MediaPreview / PromptTemplate',
      },
      {
        type: 'text',
        content: '\n\n已整理到右侧 Artifact。',
      },
    ],
  },
])

const steps = ref([
  { id: 's1', title: '理解问题', status: 'done' },
  { id: 's2', title: '检索文档', status: 'done' },
  { id: 's3', title: '汇总回答', status: 'done' },
])

const streaming = ref(false)

async function demoStreamTool() {
  if (streaming.value) return
  streaming.value = true
  const id = `m-${Date.now()}`
  messages.value = [
    ...messages.value,
    {
      id,
      role: 'assistant',
      content: '',
      status: 'streaming',
      parts: [{ type: 'text', content: '再次检索中…\n' }],
    },
  ]
  let msg = messages.value[messages.value.length - 1]
  msg = patchChatToolPart(msg, {
    toolCallId: 'call_stream',
    name: 'search_docs',
    status: 'running',
    input: { q: 'workspace' },
  })
  messages.value = [...messages.value.slice(0, -1), msg]

  for (const chunk of ['Chat', 'Workspace', ' ok']) {
    await new Promise((r) => setTimeout(r, 280))
    msg = patchChatToolPart(messages.value[messages.value.length - 1], {
      toolCallId: 'call_stream',
      appendOutput: chunk,
      status: 'running',
    })
    messages.value = [...messages.value.slice(0, -1), msg]
  }

  msg = patchChatToolPart(messages.value[messages.value.length - 1], {
    toolCallId: 'call_stream',
    status: 'done',
  })
  messages.value = [
    ...messages.value.slice(0, -1),
    { ...msg, status: 'done' },
  ]
  streaming.value = false
}

function onSend({ content }) {
  if (!content?.trim()) return
  messages.value = [
    ...messages.value,
    { id: `u-${Date.now()}`, role: 'user', content, status: 'done' },
  ]
  void demoStreamTool()
}

const height = computed(() => '480px')
</script>

<template>
  <div :style="{ height }">
    <DanChatWorkspace :show-artifact="showArtifact">
      <template #sidebar>
        <DanConversationList v-model="active" :items="conversations" />
      </template>

      <DanAgentSteps :steps="steps" style="margin-bottom: 12px" />
      <DanMediaPreview
        type="pdf"
        name="release-notes.pdf"
        style="margin-bottom: 12px"
        @open="artifact.content = '（示例）已打开 PDF 占位'"
      />
      <DanChat :messages="messages" />

      <template #footer>
        <DanChatInput placeholder="发送后演示流式 tool…" @send="onSend" />
      </template>

      <template #artifact>
        <DanArtifactPanel
          :title="artifact.title"
          :type="artifact.type"
          :content="artifact.content"
          @close="showArtifact = false"
        />
      </template>
    </DanChatWorkspace>
  </div>
</template>
