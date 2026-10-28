import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { DanConversationList } from '../index'

describe('DanConversationList', () => {
  it('selects conversation', async () => {
    const active = ref('')
    const Comp = defineComponent({
      components: { DanConversationList },
      setup: () => ({
        active,
        items: [{ id: '1', title: '会话一' }],
      }),
      template: `<DanConversationList v-model="active" :items="items" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.get('.dan-conversation-list__item').trigger('click')
    expect(active.value).toBe('1')
  })
})
