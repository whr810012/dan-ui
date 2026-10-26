<script setup lang="ts">
import { computed } from 'vue'
import type { ChatMessageModel } from '../../types/chat'
import { useNamespace } from '../../hooks/useNamespace'
import { DanAttachment } from '../attachment'
import { DanStreamText } from '../stream-text'
import { DanThinking } from '../thinking'
import './style.css'

defineOptions({ name: 'DanChatMessage' })

const props = defineProps<{
  message: ChatMessageModel
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
      <span v-if="message.status && message.status !== 'done'" :class="ns.e('status')">
        {{ message.status }}
      </span>
    </header>

    <DanThinking
      v-if="message.reasoning"
      :content="message.reasoning"
      :collapsed="message.status !== 'streaming'"
    />

    <div :class="ns.e('content')">
      <slot :message="message">
        <DanStreamText
          :content="message.content"
          :streaming="streaming"
          :as-markdown="message.role !== 'user'"
        />
      </slot>
    </div>

    <div
      v-if="message.attachments?.length"
      :class="ns.e('attachments')"
    >
      <DanAttachment
        v-for="(file, index) in message.attachments"
        :key="file.id || `${file.name}-${index}`"
        :file="file"
      />
    </div>
  </article>
</template>
