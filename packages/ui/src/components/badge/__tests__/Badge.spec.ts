import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanBadge } from '../index'

describe('DanBadge', () => {
  it('hides zero by default and shows with showZero', async () => {
    const wrapper = mount(DanBadge, {
      props: { value: 0 },
      slots: { default: 'inbox' },
    })
    expect(wrapper.find('.dan-badge__content').exists()).toBe(false)
    await wrapper.setProps({ showZero: true })
    expect(wrapper.find('.dan-badge__content').text()).toBe('0')
  })

  it('applies offset transform', () => {
    const wrapper = mount(DanBadge, {
      props: { value: 3, offset: [8, -4] },
      slots: { default: 'inbox' },
    })
    const style = wrapper.find('.dan-badge__content').attributes('style') || ''
    expect(style).toContain('8px')
    expect(style).toContain('-4px')
  })
})
