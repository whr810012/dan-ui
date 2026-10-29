import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanToolCallCard } from '../index'

describe('DanToolCallCard', () => {
  it('toggles details and shows status', async () => {
    const wrapper = mount(DanToolCallCard, {
      props: {
        name: 'search',
        status: 'running',
        input: { q: 'dan-ui' },
        output: { hits: 1 },
      },
    })
    expect(wrapper.text()).toContain('search')
    expect(wrapper.text()).toContain('运行中')
    // running 默认展开
    expect(wrapper.find('.dan-tool-call-card__body').exists()).toBe(true)
    expect(wrapper.text()).toContain('dan-ui')
    await wrapper.find('.dan-tool-call-card__header').trigger('click')
    expect(wrapper.find('.dan-tool-call-card__body').exists()).toBe(false)
  })
})
