import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanLink } from '../index'

describe('DanLink', () => {
  it('renders href and type', () => {
    const wrapper = mount(DanLink, {
      props: { href: 'https://example.com', type: 'primary' },
      slots: { default: '文档' },
    })
    const el = wrapper.find('a')
    expect(el.text()).toBe('文档')
    expect(el.attributes('href')).toBe('https://example.com')
    expect(el.classes()).toContain('dan-link--primary')
  })

  it('blocks click when disabled', async () => {
    const wrapper = mount(DanLink, {
      props: { href: '#', disabled: true },
      slots: { default: '不可点' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.find('a').attributes('href')).toBeUndefined()
  })
})
