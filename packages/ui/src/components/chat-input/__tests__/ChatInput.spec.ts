import { defineComponent, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { ChatAttachment } from '../../../types/chat'
import { chatContextKey } from '../../../hooks/useChatContext'
import type { PromptTemplate } from '../../prompt-library'
import { DanChatInput } from '../index'

function byText(wrapper: ReturnType<typeof mount>, text: string) {
  const button = wrapper.findAll('button').find((item) => item.text() === text)
  if (!button) throw new Error(`button not found: ${text}`)
  return button
}

describe('DanChatInput', () => {
  it('syncs the value and enables send once there is input', async () => {
    const wrapper = mount(DanChatInput)

    expect(byText(wrapper, '发送').attributes('disabled')).toBeDefined()

    await wrapper.get('textarea').setValue('你好')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['你好'])
    expect(byText(wrapper, '发送').attributes('disabled')).toBeUndefined()
  })

  it('sends trimmed content with attachments on Enter and resets', async () => {
    const attachments: ChatAttachment[] = [{ id: 'f1', name: 'a.txt' }]
    const wrapper = mount(DanChatInput, {
      props: { modelValue: '  你好  ', attachments },
    })

    await wrapper.get('textarea').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('send')?.[0]?.[0]).toEqual({
      content: '你好',
      attachments,
    })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('update:attachments')?.at(-1)).toEqual([[]])
  })

  it('does not send on Shift+Enter', async () => {
    const wrapper = mount(DanChatInput, { props: { modelValue: '你好' } })
    await wrapper.get('textarea').trigger('keydown', {
      key: 'Enter',
      shiftKey: true,
    })
    expect(wrapper.emitted('send')).toBeUndefined()
  })

  it('does not send when submitOnEnter is false', async () => {
    const wrapper = mount(DanChatInput, {
      props: { modelValue: '你好', submitOnEnter: false },
    })
    await wrapper.get('textarea').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('send')).toBeUndefined()
  })

  it('adds dropped files as attachments and skips oversized ones', async () => {
    const createObjectURL = vi.fn(() => 'blob:mock')
    Object.defineProperty(URL, 'createObjectURL', {
      value: createObjectURL,
      writable: true,
      configurable: true,
    })
    const Host = defineComponent({
      components: { DanChatInput },
      setup() {
        const attachments = ref<ChatAttachment[]>([])
        return { attachments }
      },
      template:
        '<DanChatInput v-model:attachments="attachments" :max-size="8" />',
    })
    const wrapper = mount(Host)

    const ok = new File(['hi'], 'ok.txt', { type: 'text/plain' })
    const tooBig = new File(['0123456789'], 'big.txt', { type: 'text/plain' })
    await wrapper.get('.dan-chat-input').trigger('drop', {
      dataTransfer: { files: [ok, tooBig] },
    })

    const input = wrapper.findComponent(DanChatInput)
    expect(input.emitted('update:attachments')?.[0]?.[0]).toHaveLength(1)
    expect(wrapper.find('.dan-chat-input__attachments').exists()).toBe(true)
    expect(wrapper.text()).toContain('ok.txt')
    expect(wrapper.text()).not.toContain('big.txt')
  })

  it('opens the slash command library and fills the selected template', async () => {
    const commands: PromptTemplate[] = [
      { id: 'summarize', title: '总结', content: '请总结以上对话' },
      { id: 'translate', title: '翻译', content: '请翻译成英文' },
    ]
    const wrapper = mount(DanChatInput, {
      props: { modelValue: '/', commands },
    })

    expect(wrapper.find('.dan-prompt-library').exists()).toBe(true)
    await wrapper.get('.dan-prompt-library__button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
      '请总结以上对话',
    ])
  })

  it('switches to the stop action and disables the textarea while generating', () => {
    const generating = ref(true)
    const stop = vi.fn()
    const Host = defineComponent({
      components: { DanChatInput },
      setup() {
        provide(chatContextKey, {
          messages: ref([]),
          generating,
          send: () => {},
          stop,
        })
        return {}
      },
      template: '<DanChatInput model-value="正在输出" />',
    })
    const wrapper = mount(Host)

    expect(wrapper.find('.dan-button--danger').exists()).toBe(true)
    expect(wrapper.get('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('停止')
  })
})
