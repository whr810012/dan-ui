import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { DanBackTop } from '../index'

describe('DanBackTop', () => {
  it('scrolls to top on click when visible', async () => {
    const scrollTo = vi.fn()
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 400,
    })
    window.scrollTo = scrollTo as typeof window.scrollTo

    const wrapper = mount(DanBackTop, {
      props: { visibilityHeight: 200 },
      attachTo: document.body,
    })
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    const btn = document.querySelector('.dan-back-top') as HTMLButtonElement
    expect(btn).toBeTruthy()
    btn.click()
    expect(scrollTo).toHaveBeenCalled()
    wrapper.unmount()
  })
})
