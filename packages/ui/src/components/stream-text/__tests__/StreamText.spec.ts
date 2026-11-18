import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanStreamText } from '../index'

describe('DanStreamText', () => {
  it('renders markdown by default', () => {
    const wrapper = mount(DanStreamText, { props: { content: '**高亮**' } })
    expect(wrapper.find('.dan-markdown').exists()).toBe(true)
    expect(wrapper.get('strong').text()).toBe('高亮')
  })

  it('renders plain text when asMarkdown is false', () => {
    const wrapper = mount(DanStreamText, {
      props: { content: '**高亮**', asMarkdown: false },
    })
    expect(wrapper.find('.dan-markdown').exists()).toBe(false)
    expect(wrapper.get('.dan-stream-text__plain').text()).toBe('**高亮**')
  })

  it('shows the caret only while streaming', async () => {
    const wrapper = mount(DanStreamText, {
      props: { content: '增量', streaming: true },
    })
    expect(wrapper.classes()).toContain('is-streaming')
    expect(wrapper.find('.dan-stream-text__cursor').exists()).toBe(true)

    await wrapper.setProps({ streaming: false })
    expect(wrapper.classes()).not.toContain('is-streaming')
    expect(wrapper.find('.dan-stream-text__cursor').exists()).toBe(false)
  })
})
