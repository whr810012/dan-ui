import { createApp, h, reactive } from 'vue'
import MessageHost from './MessageHost.vue'
import type { MessageHandler, MessageOptions, MessageType } from './types'

interface MessageRecord extends MessageOptions {
  id: string
}

const state = reactive<{ items: MessageRecord[] }>({
  items: [],
})

let seed = 1
let mounted = false

function ensureHost() {
  if (mounted || typeof document === 'undefined') return
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp({
    setup() {
      return () =>
        h(MessageHost, {
          items: state.items,
          onClose: close,
        })
    },
  }).mount(el)
  mounted = true
}

function close(id: string) {
  const index = state.items.findIndex((item) => item.id === id)
  if (index >= 0) state.items.splice(index, 1)
}

function open(options: MessageOptions | string): MessageHandler {
  ensureHost()
  const normalized: MessageOptions =
    typeof options === 'string' ? { message: options } : options
  const id = normalized.id || `dan-message-${seed++}`
  state.items.push({
    id,
    message: normalized.message,
    type: normalized.type || 'info',
    duration: normalized.duration ?? 3000,
    showClose: normalized.showClose ?? false,
  })
  return {
    close: () => close(id),
  }
}

function createTyped(type: MessageType) {
  return (
    message: string,
    options: Omit<MessageOptions, 'message' | 'type'> = {},
  ) => open({ ...options, message, type })
}

export const DanMessage = Object.assign(open, {
  success: createTyped('success'),
  warning: createTyped('warning'),
  info: createTyped('info'),
  error: createTyped('error'),
  closeAll: () => {
    state.items.splice(0, state.items.length)
  },
})
