import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanCountdown } from '../index'

describe('DanCountdown', () => {
  it('emits finish when target passed', async () => {
    vi.useFakeTimers()
    const wrapper = mount(DanCountdown, {
      props: { value: Date.now() - 1000, format: 'HH:mm:ss' },
    })
    await vi.advanceTimersByTimeAsync(300)
    expect(wrapper.emitted('finish')).toBeTruthy()
    vi.useRealTimers()
  })
})
