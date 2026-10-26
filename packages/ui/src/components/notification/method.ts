import { createApp, h, reactive } from 'vue'
import NotificationHost from './NotificationHost.vue'
import type {
  NotificationHandler,
  NotificationOptions,
  NotificationPosition,
  NotificationType,
} from './types'

interface NotificationRecord extends NotificationOptions {
  id: string
}

const state = reactive<{ items: NotificationRecord[] }>({
  items: [],
})

const positions: NotificationPosition[] = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
]

let seed = 1
let mounted = false

function ensureHost() {
  if (mounted || typeof document === 'undefined') return
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp({
    setup() {
      return () =>
        positions.map((position) =>
          h(NotificationHost, {
            key: position,
            items: state.items,
            position,
            onClose: close,
          }),
        )
    },
  }).mount(el)
  mounted = true
}

function close(id: string) {
  const index = state.items.findIndex((item) => item.id === id)
  if (index >= 0) state.items.splice(index, 1)
}

function open(options: NotificationOptions | string): NotificationHandler {
  ensureHost()
  const normalized: NotificationOptions =
    typeof options === 'string' ? { message: options } : options
  const id = normalized.id || `dan-notification-${seed++}`
  state.items.push({
    id,
    title: normalized.title ?? '',
    message: normalized.message ?? '',
    type: normalized.type || 'info',
    duration: normalized.duration ?? 4500,
    showClose: normalized.showClose ?? true,
    position: normalized.position ?? 'top-right',
  })
  return {
    close: () => close(id),
  }
}

function createTyped(type: NotificationType) {
  return (options: NotificationOptions | string, maybeTitle?: string) => {
    if (typeof options === 'string') {
      return open({
        message: options,
        title: maybeTitle,
        type,
      })
    }
    return open({ ...options, type })
  }
}

export const DanNotification = Object.assign(open, {
  success: createTyped('success'),
  warning: createTyped('warning'),
  info: createTyped('info'),
  error: createTyped('error'),
  closeAll: () => {
    state.items.splice(0, state.items.length)
  },
})
