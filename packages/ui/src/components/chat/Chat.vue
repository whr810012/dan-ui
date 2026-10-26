<script setup lang="ts">
import { computed, toRef } from 'vue'
import { provideChat, type ChatContext } from '../../hooks/useChatContext'
import type { ChatMessageModel } from '../../types/chat'
import { useNamespace } from '../../hooks/useNamespace'
import { DanChatMessage } from '../chat-message'
import './style.css'

defineOptions({ name: 'DanChat' })

const props = withDefaults(
  defineProps<{
    messages?: ChatMessageModel[]
    generating?: boolean
  }>(),
  {
    messages: () => [],
    generating: false,
  },
)

const emit = defineEmits<{
  send: [content: string]
  stop: []
}>()

const ns = useNamespace('chat')

const context: ChatContext = {
  messages: toRef(props, 'messages'),
  generating: toRef(props, 'generating'),
  send(content: string) {
    emit('send', content)
  },
  stop() {
    emit('stop')
  },
}

provideChat(context)

const hasMessages = computed(() => props.messages.length > 0)
</script>

<template>
  <div :class="[ns.b(), ns.is('generating', generating)]">
    <div :class="ns.e('list')" role="log" aria-live="polite">
      <slot>
        <div v-if="!hasMessages" :class="ns.e('empty')">开始一段对话吧</div>
        <DanChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </slot>
    </div>
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>
