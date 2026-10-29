import { describe, expect, it } from 'vitest'
import type { ChatMessageModel } from '../../types/chat'
import { patchChatToolPart } from '../patchChatToolPart'

describe('patchChatToolPart', () => {
  it('appends a new tool part when missing', () => {
    const message: ChatMessageModel = {
      id: '1',
      role: 'assistant',
      content: '',
      status: 'streaming',
      parts: [{ type: 'text', content: 'hi' }],
    }
    const next = patchChatToolPart(message, {
      toolCallId: 't1',
      name: 'search',
      status: 'running',
      input: { q: 'dan-ui' },
    })
    expect(next.parts).toHaveLength(2)
    expect(next.parts?.[1]).toMatchObject({
      type: 'tool',
      toolCallId: 't1',
      name: 'search',
      status: 'running',
    })
  })

  it('updates existing tool part in place and appends output', () => {
    const message: ChatMessageModel = {
      id: '1',
      role: 'assistant',
      content: '',
      parts: [
        {
          type: 'tool',
          toolCallId: 't1',
          name: 'search',
          status: 'running',
          output: 'hel',
        },
      ],
    }
    const next = patchChatToolPart(message, {
      toolCallId: 't1',
      appendOutput: 'lo',
      status: 'done',
    })
    expect(next.parts?.[0]).toMatchObject({
      output: 'hello',
      status: 'done',
    })
  })
})
