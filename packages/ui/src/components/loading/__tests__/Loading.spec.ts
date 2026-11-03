import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanLoading } from '../index'

describe('DanLoading', () => {
  it('shows mask and text while loading', () => {
    const wrapper = mount(DanLoading, {
      props: { loading: true, text: '加载中' },
      slots: { default: () => 'content' },
    })
    expect(wrapper.find('.dan-loading__mask').exists()).toBe(true)
    expect(wrapper.find('.dan-loading__text').text()).toBe('加载中')
    expect(wrapper.text()).toContain('content')
  })

  it('hides mask when loading is false', async () => {
    const wrapper = mount(DanLoading, {
      props: { loading: true },
      slots: { default: () => 'content' },
    })
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.dan-loading__mask').exists()).toBe(false)
  })

  it('supports fullscreen class and custom background', () => {
    const wrapper = mount(DanLoading, {
      props: {
        fullscreen: true,
        background: 'rgba(0,0,0,.2)',
      },
    })
    expect(wrapper.classes()).toContain('is-fullscreen')
    expect(wrapper.find('.dan-loading__mask').attributes('style')).toContain(
      'rgba(0, 0, 0, 0.2)',
    )
  })
})
