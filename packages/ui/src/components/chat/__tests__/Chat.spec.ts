import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanChat } from '../index'
import { DanChatInput } from '../../chat-input'
import type { ChatMessageModel } from '../../../types/chat'

describe('DanChat', () => {
  it('renders messages and emits send/stop through ChatInput', async () => {
    const messages = ref<ChatMessageModel[]>([
      {
        id: '1',
        role: 'assistant',
        content: '你好',
        status: 'done',
      },
    ])
    const generating = ref(false)
    const onSend = vi.fn()
    const onStop = vi.fn()

    const Comp = defineComponent({
      components: { DanChat, DanChatInput },
      setup() {
        return { messages, generating, onSend, onStop }
      },
      template: `
        <DanChat
          :messages="messages"
          :generating="generating"
          @send="onSend"
          @stop="onStop"
        >
          <template #footer>
            <DanChatInput />
          </template>
        </DanChat>
      `,
    })

    const wrapper = mount(Comp)
    expect(wrapper.text()).toContain('你好')

    const textarea = wrapper.find('textarea')
    await textarea.setValue('帮我写个按钮')
    await wrapper.find('button').trigger('click')
    expect(onSend).toHaveBeenCalledWith('帮我写个按钮')

    generating.value = true
    await nextTick()
    const stopBtn = wrapper.findAll('button').find((btn) => btn.text() === '停止')
    expect(stopBtn).toBeTruthy()
    await stopBtn!.trigger('click')
    expect(onStop).toHaveBeenCalled()
  })
})
