export type ChatRole = 'user' | 'assistant' | 'system' | 'tool'

export type ChatMessageStatus =
  | 'pending'
  | 'streaming'
  | 'done'
  | 'error'
  | 'stopped'

export interface ChatAttachment {
  id?: string
  name: string
  size?: number
  type?: string
  url?: string
}

export type ChatMessagePart =
  | { type: 'text'; content: string }
  | { type: 'thinking'; content: string }
  | {
      type: 'tool'
      name: string
      /** 流式就地更新时的稳定 id */
      toolCallId?: string
      input?: unknown
      output?: unknown
      status?: 'pending' | 'running' | 'done' | 'error'
    }

export interface ChatMessageModel {
  id: string
  role: ChatRole
  content: string
  status?: ChatMessageStatus
  reasoning?: string
  attachments?: ChatAttachment[]
  /** 流式多段内容；有 parts 时优先渲染 parts */
  parts?: ChatMessagePart[]
}

export interface ChatConversationItem {
  id: string
  title: string
  updatedAt?: string | number
  preview?: string
}
