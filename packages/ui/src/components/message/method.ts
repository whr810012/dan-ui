import { createApp, h, reactive } from 'vue'
import MessageHost from './MessageHost.vue'
import type { MessageHandler, MessageOptions, MessageType } from './types'

interface MessageRecord extends MessageOptions {
  id: string
  repeat: number
  tick: number
}

const state = reactive<{ items: MessageRecord[]; offset: number }>({
  items: [],
  offset: 20,
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
          offset: state.offset,
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
  const type = normalized.type || 'info'
  const message = normalized.message
  const grouping = normalized.grouping !== false
  const offset = normalized.offset ?? 20
  state.offset = offset

  if (grouping) {
    const existing = state.items.find(
      (item) => item.message === message && (item.type || 'info') === type,
    )
    if (existing) {
      existing.repeat += 1
      existing.duration = normalized.duration ?? existing.duration ?? 3000
      existing.showClose = normalized.showClose ?? existing.showClose ?? false
      existing.tick += 1
      return { close: () => close(existing.id) }
    }
  }

  const id = normalized.id || `dan-message-${seed++}`
  state.items.push({
    id,
    message,
    type,
    duration: normalized.duration ?? 3000,
    showClose: normalized.showClose ?? false,
    offset,
    grouping,
    repeat: 1,
    tick: 0,
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
