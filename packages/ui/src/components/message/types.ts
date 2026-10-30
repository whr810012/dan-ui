export type MessageType = 'success' | 'warning' | 'info' | 'error'

export interface MessageOptions {
  message: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  id?: string
  /** 距顶部偏移（px） */
  offset?: number
  /** 相同文案+类型合并计数 */
  grouping?: boolean
}

export interface MessageHandler {
  close: () => void
}
