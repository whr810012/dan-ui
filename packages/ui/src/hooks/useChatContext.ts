import type { Ref } from 'vue'
import { createContext } from '../utils/createContext'

export type ChatRole = 'user' | 'assistant' | 'system' | 'tool'

export type ChatMessageStatus =
  | 'pending'
  | 'streaming'
  | 'done'
  | 'error'
  | 'stopped'

export interface ChatMessageModel {
  id: string
  role: ChatRole
  content: string
  status?: ChatMessageStatus
  reasoning?: string
  attachments?: unknown[]
}

export interface ChatContext {
  messages: Ref<ChatMessageModel[]>
  generating: Ref<boolean>
  send: (content: string) => void | Promise<void>
  stop: () => void
}

export const [provideChat, injectChat, chatContextKey] =
  createContext<ChatContext>('DanChat')
