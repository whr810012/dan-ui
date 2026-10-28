<script setup lang="ts">
import { computed } from 'vue'
import type { ChatMessageModel } from '../../types/chat'
import { useNamespace } from '../../hooks/useNamespace'
import { DanAttachment } from '../attachment'
import { DanButton } from '../button'
import { DanStreamText } from '../stream-text'
import { DanThinking } from '../thinking'
import './style.css'

defineOptions({ name: 'DanChatMessage' })

const props = withDefaults(
  defineProps<{
    message: ChatMessageModel
    showActions?: boolean
  }>(),
  {
    showActions: true,
  },
)

const emit = defineEmits<{
  copy: [message: ChatMessageModel]
  regenerate: [message: ChatMessageModel]
  feedback: [payload: { message: ChatMessageModel; type: 'up' | 'down' }]
}>()

const ns = useNamespace('chat-message')

const streaming = computed(() => props.message.status === 'streaming')
const roleLabel = computed(() => {
  const map = {
    user: '用户',
    assistant: '助手',
    system: '系统',
    tool: '工具',
  } as const
  return map[props.message.role]
})

const hasParts = computed(() => Boolean(props.message.parts?.length))

async function onCopy() {
  try {
    await navigator.clipboard.writeText(props.message.content || '')
  } catch {
    /* ignore */
  }
  emit('copy', props.message)
}
</script>

<template>
  <article
    :class="[
      ns.b(),
      ns.m(message.role),
      ns.is('streaming', streaming),
      ns.is(message.status || 'done', true),
    ]"
  >
    <header :class="ns.e('header')">
      <slot name="avatar">
        <span :class="ns.e('role')">{{ roleLabel }}</span>
      </slot>
      <span
        v-if="message.status && message.status !== 'done'"
        :class="ns.e('status')"
      >
        {{ message.status }}
      </span>
    </header>

    <DanThinking
      v-if="message.reasoning && !hasParts"
      :content="message.reasoning"
      :collapsed="message.status !== 'streaming'"
    />

    <div :class="ns.e('content')">
      <slot :message="message">
        <template v-if="hasParts">
          <template v-for="(part, index) in message.parts" :key="index">
            <DanThinking
              v-if="part.type === 'thinking'"
              :content="part.content"
              :collapsed="message.status !== 'streaming'"
            />
            <DanStreamText
              v-else-if="part.type === 'text'"
              :content="part.content"
              :streaming="streaming && index === (message.parts?.length ?? 0) - 1"
              :as-markdown="message.role !== 'user'"
            />
            <div v-else-if="part.type === 'tool'" :class="ns.e('tool')">
              <strong>{{ part.name }}</strong>
              <span v-if="part.status" :class="ns.e('tool-status')">
                {{ part.status }}
              </span>
              <pre v-if="part.input != null">{{ part.input }}</pre>
              <pre v-if="part.output != null">{{ part.output }}</pre>
            </div>
          </template>
        </template>
        <DanStreamText
          v-else
          :content="message.content"
          :streaming="streaming"
          :as-markdown="message.role !== 'user'"
        />
      </slot>
    </div>

    <div v-if="message.attachments?.length" :class="ns.e('attachments')">
      <DanAttachment
        v-for="(file, index) in message.attachments"
        :key="file.id || `${file.name}-${index}`"
        :file="file"
      />
    </div>

    <div
      v-if="showActions && message.role === 'assistant'"
      :class="ns.e('actions')"
    >
      <slot name="actions" :message="message">
        <DanButton size="small" text @click="onCopy">复制</DanButton>
        <DanButton size="small" text @click="emit('regenerate', message)">
          重新生成
        </DanButton>
        <DanButton
          size="small"
          text
          @click="emit('feedback', { message, type: 'up' })"
        >
          有用
        </DanButton>
        <DanButton
          size="small"
          text
          @click="emit('feedback', { message, type: 'down' })"
        >
          无用
        </DanButton>
      </slot>
    </div>
  </article>
</template>
