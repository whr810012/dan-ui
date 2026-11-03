import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DanSkeleton } from '../index'

describe('DanSkeleton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders skeleton while loading', () => {
    const wrapper = mount(DanSkeleton, {
      props: { loading: true, rows: 2 },
      slots: { default: () => 'ready' },
    })
    expect(wrapper.find('.dan-skeleton').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('ready')
  })

  it('delays skeleton with throttle', async () => {
    const wrapper = mount(DanSkeleton, {
      props: { loading: true, throttle: 300 },
      slots: { default: () => 'ready' },
    })
    expect(wrapper.find('.dan-skeleton').exists()).toBe(false)
    expect(wrapper.text()).toContain('ready')

    await vi.advanceTimersByTimeAsync(300)
    expect(wrapper.find('.dan-skeleton').exists()).toBe(true)
  })

  it('cancels throttle when loading ends early', async () => {
    const wrapper = mount(DanSkeleton, {
      props: { loading: true, throttle: 300 },
      slots: { default: () => 'ready' },
    })
    await wrapper.setProps({ loading: false })
    await vi.advanceTimersByTimeAsync(300)
    expect(wrapper.find('.dan-skeleton').exists()).toBe(false)
    expect(wrapper.text()).toContain('ready')
  })
})
