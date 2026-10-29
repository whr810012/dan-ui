import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanPromptLibrary } from '../index'

describe('DanPromptLibrary', () => {
  it('filters and emits select', async () => {
    const wrapper = mount(DanPromptLibrary, {
      props: {
        items: [
          {
            id: 'sum',
            title: '总结',
            content: '请总结',
            group: '写作',
          },
          {
            id: 'code',
            title: '解释代码',
            content: '解释这段代码',
            group: '开发',
          },
        ],
        filter: '总结',
      },
    })
    expect(wrapper.text()).toContain('总结')
    expect(wrapper.text()).not.toContain('解释代码')
    await wrapper.find('.dan-prompt-library__button').trigger('click')
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ id: 'sum' })
  })
})
