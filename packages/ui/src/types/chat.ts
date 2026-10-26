export type ChatRole = 'user' | 'assistant' | 'system' | 'tool'

export type ChatMessageStatus =
  'pending' | 'streaming' | 'done' | 'error' | 'stopped'

export interface ChatAttachment {
  id?: string
  name: string
  size?: number
  type?: string
  url?: string
}

export interface ChatMessageModel {
  id: string
  role: ChatRole
  content: string
  status?: ChatMessageStatus
  reasoning?: string
  attachments?: ChatAttachment[]
}
