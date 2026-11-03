import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { DanSkeleton, DanSkeletonItem } from '../index'

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

  it('delays skeleton with throttle number', async () => {
    const wrapper = mount(DanSkeleton, {
      props: { loading: true, throttle: 300 },
      slots: { default: () => 'ready' },
    })
    expect(wrapper.find('.dan-skeleton').exists()).toBe(false)
    expect(wrapper.text()).toContain('ready')

    await vi.advanceTimersByTimeAsync(300)
    expect(wrapper.find('.dan-skeleton').exists()).toBe(true)
  })

  it('supports throttle object leading and trailing', async () => {
    const wrapper = mount(DanSkeleton, {
      props: {
        loading: true,
        throttle: { leading: 200, trailing: 150 },
      },
      slots: { default: () => 'ready' },
    })
    expect(wrapper.find('.dan-skeleton').exists()).toBe(false)
    await vi.advanceTimersByTimeAsync(200)
    expect(wrapper.find('.dan-skeleton').exists()).toBe(true)

    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.dan-skeleton').exists()).toBe(true)
    await vi.advanceTimersByTimeAsync(150)
    expect(wrapper.find('.dan-skeleton').exists()).toBe(false)
  })

  it('initVal shows skeleton immediately', () => {
    const wrapper = mount(DanSkeleton, {
      props: {
        loading: true,
        throttle: { leading: 300, initVal: true },
      },
    })
    expect(wrapper.find('.dan-skeleton').exists()).toBe(true)
  })

  it('renders count copies and template slot', () => {
    const wrapper = mount(DanSkeleton, {
      props: { loading: true, count: 2 },
      slots: {
        template: () => h(DanSkeletonItem, { variant: 'circle' }),
      },
    })
    expect(wrapper.findAll('.dan-skeleton').length).toBe(2)
    expect(wrapper.findAll('.dan-skeleton-item--circle').length).toBe(2)
  })
})
