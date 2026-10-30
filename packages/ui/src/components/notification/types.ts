export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export interface NotificationOptions {
  id?: string
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  showClose?: boolean
  position?: NotificationPosition
  /** 距边缘偏移（px） */
  offset?: number
  /** 相同标题+文案+类型+位置合并计数 */
  grouping?: boolean
}

export interface NotificationHandler {
  close: () => void
}
