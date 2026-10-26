export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export type NotificationPosition =
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface NotificationOptions {
  id?: string
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  showClose?: boolean
  position?: NotificationPosition
}

export interface NotificationHandler {
  close: () => void
}
