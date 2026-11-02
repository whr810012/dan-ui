import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCard } from '../index'

describe('DanCard', () => {
  it('renders header extra and body', () => {
    const wrapper = mount(DanCard, {
      props: { header: '标题' },
      slots: {
        extra: '<button class="extra-btn">更多</button>',
        default: '正文',
      },
    })
    expect(wrapper.text()).toContain('标题')
    expect(wrapper.text()).toContain('正文')
    expect(wrapper.find('.extra-btn').exists()).toBe(true)
    expect(wrapper.classes()).toContain('is-bordered')
  })

  it('supports small size and bordered=false', () => {
    const wrapper = mount(DanCard, {
      props: {
        size: 'small',
        bordered: false,
        bodyClass: 'custom-body',
      },
      slots: { default: 'content' },
    })
    expect(wrapper.classes()).toContain('dan-card--small')
    expect(wrapper.classes()).not.toContain('is-bordered')
    expect(wrapper.find('.dan-card__body').classes()).toContain('custom-body')
  })
})
