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
  repeat: number
  tick: number
}

const state = reactive<{
  items: NotificationRecord[]
  offsets: Record<NotificationPosition, number>
}>({
  items: [],
  offsets: {
    'top-right': 16,
    'top-left': 16,
    'bottom-right': 16,
    'bottom-left': 16,
  },
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
            offset: state.offsets[position],
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
  const type = normalized.type || 'info'
  const position = normalized.position ?? 'top-right'
  const title = normalized.title ?? ''
  const message = normalized.message ?? ''
  const grouping = normalized.grouping !== false
  const offset = normalized.offset ?? 16
  state.offsets[position] = offset

  if (grouping) {
    const existing = state.items.find(
      (item) =>
        (item.title ?? '') === title &&
        (item.message ?? '') === message &&
        (item.type || 'info') === type &&
        (item.position ?? 'top-right') === position,
    )
    if (existing) {
      existing.repeat += 1
      existing.duration = normalized.duration ?? existing.duration ?? 4500
      existing.showClose = normalized.showClose ?? existing.showClose ?? true
      existing.tick += 1
      return { close: () => close(existing.id) }
    }
  }

  const id = normalized.id || `dan-notification-${seed++}`
  state.items.push({
    id,
    title,
    message,
    type,
    duration: normalized.duration ?? 4500,
    showClose: normalized.showClose ?? true,
    position,
    offset,
    grouping,
    repeat: 1,
    tick: 0,
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
