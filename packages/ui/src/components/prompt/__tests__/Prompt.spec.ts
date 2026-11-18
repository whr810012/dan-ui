import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanPrompt } from '../index'

describe('DanPrompt', () => {
  it('renders title and description and emits click', async () => {
    const wrapper = mount(DanPrompt, {
      props: { title: '总结要点', description: '提炼这段对话的核心结论' },
    })
    expect(wrapper.get('.dan-prompt__title').text()).toBe('总结要点')
    expect(wrapper.get('.dan-prompt__desc').text()).toBe(
      '提炼这段对话的核心结论',
    )

    await wrapper.get('.dan-prompt').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('hides description when absent', () => {
    const wrapper = mount(DanPrompt, { props: { title: '仅标题' } })
    expect(wrapper.find('.dan-prompt__desc').exists()).toBe(false)
  })

  it('supports title and description slots', () => {
    const wrapper = mount(DanPrompt, {
      slots: {
        title: '<b>自定义标题</b>',
        description: '<i>自定义描述</i>',
      },
    })
    expect(wrapper.get('.dan-prompt__title b').text()).toBe('自定义标题')
    expect(wrapper.get('.dan-prompt__desc i').text()).toBe('自定义描述')
  })

  it('exposes a native button for keyboard activation', () => {
    const wrapper = mount(DanPrompt, { props: { title: '可聚焦' } })
    expect(wrapper.get('.dan-prompt').element.tagName).toBe('BUTTON')
    expect(wrapper.get('.dan-prompt').attributes('type')).toBe('button')
  })
})
