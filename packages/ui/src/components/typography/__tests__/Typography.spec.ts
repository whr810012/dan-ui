import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanParagraph, DanText, DanTitle } from '../index'

describe('Typography', () => {
  it('renders text variants', () => {
    const wrapper = mount(DanText, {
      props: { type: 'primary', strong: true },
      slots: { default: 'Hello' },
    })
    expect(wrapper.classes()).toContain('dan-text--primary')
    expect(wrapper.classes()).toContain('is-strong')
    expect(wrapper.text()).toBe('Hello')
  })

  it('renders title level tag', () => {
    const wrapper = mount(DanTitle, {
      props: { level: 3 },
      slots: { default: '标题' },
    })
    expect(wrapper.element.tagName).toBe('H3')
    expect(wrapper.classes()).toContain('dan-title--h3')
  })

  it('renders paragraph', () => {
    const wrapper = mount(DanParagraph, {
      slots: { default: '段落' },
    })
    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.text()).toBe('段落')
  })
})
