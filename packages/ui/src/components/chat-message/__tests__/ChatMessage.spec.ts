import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { ChatMessageModel } from '../../../types/chat'
import { DanThinking } from '../../thinking'
import { DanToolCallCard } from '../../tool-call-card'
import { DanChatMessage } from '../index'

function byText(wrapper: ReturnType<typeof mount>, text: string) {
  const button = wrapper.findAll('button').find((item) => item.text() === text)
  if (!button) throw new Error(`button not found: ${text}`)
  return button
}

describe('DanChatMessage', () => {
  it('renders the role label and keeps user content plain', () => {
    const message: ChatMessageModel = {
      id: 'u1',
      role: 'user',
      content: '**你好**',
    }
    const wrapper = mount(DanChatMessage, { props: { message } })

    expect(wrapper.get('.dan-chat-message__role').text()).toBe('用户')
    expect(wrapper.classes()).toContain('dan-chat-message--user')
    expect(wrapper.text()).toContain('**你好**')
    expect(wrapper.find('.dan-chat-message__actions').exists()).toBe(false)
  })

  it('renders reasoning and actions for assistant messages', () => {
    const message: ChatMessageModel = {
      id: 'a1',
      role: 'assistant',
      content: '答案正文',
      status: 'done',
      reasoning: '先拆解问题',
    }
    const wrapper = mount(DanChatMessage, { props: { message } })

    expect(wrapper.get('.dan-chat-message__role').text()).toBe('助手')
    expect(wrapper.findComponent(DanThinking).exists()).toBe(true)
    expect(wrapper.text()).toContain('先拆解问题')
    expect(wrapper.get('.dan-chat-message__actions').exists()).toBe(true)
    expect(wrapper.text()).toContain('重新生成')
  })

  it('renders structured parts and marks streaming state', () => {
    const message: ChatMessageModel = {
      id: 'a2',
      role: 'assistant',
      content: '',
      status: 'streaming',
      parts: [
        { type: 'thinking', content: '推理中' },
        { type: 'text', content: '片段' },
        {
          type: 'tool',
          name: 'search',
          toolCallId: 't1',
          status: 'running',
          input: { q: 'dan-ui' },
        },
      ],
    }
    const wrapper = mount(DanChatMessage, { props: { message } })

    expect(wrapper.classes()).toContain('is-streaming')
    expect(wrapper.findAllComponents(DanThinking)).toHaveLength(1)
    expect(wrapper.text()).toContain('片段')
    expect(wrapper.findComponent(DanToolCallCard).exists()).toBe(true)
  })

  it('hides actions when showActions is false', () => {
    const message: ChatMessageModel = {
      id: 'a3',
      role: 'assistant',
      content: '正文',
    }
    const wrapper = mount(DanChatMessage, {
      props: { message, showActions: false },
    })
    expect(wrapper.find('.dan-chat-message__actions').exists()).toBe(false)
  })

  it('emits copy, regenerate and feedback events', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })
    const message: ChatMessageModel = {
      id: 'a4',
      role: 'assistant',
      content: '可复制内容',
    }
    const wrapper = mount(DanChatMessage, { props: { message } })

    await byText(wrapper, '复制').trigger('click')
    expect(writeText).toHaveBeenCalledWith('可复制内容')
    expect(wrapper.emitted('copy')?.[0]?.[0]).toMatchObject({ id: 'a4' })

    await byText(wrapper, '重新生成').trigger('click')
    expect(wrapper.emitted('regenerate')?.[0]?.[0]).toMatchObject({ id: 'a4' })

    await byText(wrapper, '有用').trigger('click')
    await byText(wrapper, '无用').trigger('click')
    const feedback = wrapper.emitted('feedback')
    expect(feedback).toHaveLength(2)
    expect(feedback?.[0]?.[0]).toMatchObject({ type: 'up' })
    expect(feedback?.[1]?.[0]).toMatchObject({ type: 'down' })
  })

  it('renders non-done status text', () => {
    const message: ChatMessageModel = {
      id: 'a5',
      role: 'assistant',
      content: '进行中',
      status: 'pending',
    }
    const wrapper = mount(DanChatMessage, { props: { message } })
    expect(wrapper.get('.dan-chat-message__status').text()).toBe('pending')
  })
})
