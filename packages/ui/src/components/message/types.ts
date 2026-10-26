export type MessageType = 'success' | 'warning' | 'info' | 'error'

export interface MessageOptions {
  message: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  id?: string
}

export interface MessageHandler {
  close: () => void
}
