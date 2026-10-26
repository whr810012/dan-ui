import type { Ref } from 'vue'
import { createContext } from '../utils/createContext'
import type { ChatMessageModel } from '../types/chat'

export type {
  ChatRole,
  ChatMessageStatus,
  ChatAttachment,
  ChatMessageModel,
} from '../types/chat'

export interface ChatContext {
  messages: Ref<ChatMessageModel[]>
  generating: Ref<boolean>
  send: (content: string) => void | Promise<void>
  stop: () => void
}

export const [provideChat, injectChat, chatContextKey] =
  createContext<ChatContext>('DanChat')
