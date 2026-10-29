import type { ChatMessageModel, ChatMessagePart } from '../types/chat'

export interface PatchChatToolPartInput {
  toolCallId: string
  name?: string
  input?: unknown
  output?: unknown
  status?: 'pending' | 'running' | 'done' | 'error'
  /** 追加到已有 output 字符串（适合流式文本） */
  appendOutput?: string
}

function isToolPart(
  part: ChatMessagePart,
): part is Extract<ChatMessagePart, { type: 'tool' }> {
  return part.type === 'tool'
}

/**
 * 按 toolCallId 就地更新消息中的 tool part；不存在则追加。
 * 返回新的 message（浅拷贝 parts），便于不可变更新。
 */
export function patchChatToolPart(
  message: ChatMessageModel,
  patch: PatchChatToolPartInput,
): ChatMessageModel {
  const parts = [...(message.parts ?? [])]
  const index = parts.findIndex(
    (part) => isToolPart(part) && part.toolCallId === patch.toolCallId,
  )

  if (index >= 0) {
    const current = parts[index] as Extract<ChatMessagePart, { type: 'tool' }>
    let output = patch.output !== undefined ? patch.output : current.output
    if (patch.appendOutput != null) {
      const base =
        typeof output === 'string'
          ? output
          : output == null
            ? ''
            : String(output)
      output = base + patch.appendOutput
    }
    parts[index] = {
      ...current,
      name: patch.name ?? current.name,
      input: patch.input !== undefined ? patch.input : current.input,
      output,
      status: patch.status ?? current.status,
    }
  } else {
    parts.push({
      type: 'tool',
      toolCallId: patch.toolCallId,
      name: patch.name ?? 'tool',
      input: patch.input,
      output:
        patch.appendOutput != null
          ? patch.appendOutput
          : patch.output,
      status: patch.status ?? 'running',
    })
  }

  return {
    ...message,
    parts,
  }
}
