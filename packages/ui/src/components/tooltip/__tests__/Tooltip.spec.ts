import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { DanTooltip } from '../index'

describe('DanTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('shows and hides on hover after delay', async () => {
    const wrapper = mount(DanTooltip, {
      attachTo: document.body,
      props: { content: '提示文案', showAfter: 100, hideAfter: 100 },
      slots: { default: '<button>触发</button>' },
    })

    await wrapper.find('.dan-tooltip').trigger('mouseenter')
    await vi.advanceTimersByTimeAsync(100)
    await nextTick()

    const popper = document.querySelector('.dan-tooltip__popper') as HTMLElement
    expect(popper).toBeTruthy()
    expect(popper.textContent).toContain('提示文案')
    expect(popper.style.display).not.toBe('none')

    await wrapper.find('.dan-tooltip').trigger('mouseleave')
    await vi.advanceTimersByTimeAsync(100)
    await nextTick()
    expect(popper.style.display).toBe('none')

    wrapper.unmount()
  })

  it('renders raw html content', async () => {
    const wrapper = mount(DanTooltip, {
      attachTo: document.body,
      props: {
        content: '<em>强调</em>',
        rawContent: true,
        showAfter: 0,
        visible: true,
      },
      slots: { default: '<button>触发</button>' },
    })
    await nextTick()
    const popper = document.querySelector('.dan-tooltip__popper') as HTMLElement
    expect(popper.querySelector('em')?.textContent).toBe('强调')
    wrapper.unmount()
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(DanTooltip, {
      attachTo: document.body,
      props: { content: '不可见', disabled: true, showAfter: 0 },
      slots: { default: '<button>触发</button>' },
    })

    await wrapper.find('.dan-tooltip').trigger('mouseenter')
    await vi.advanceTimersByTimeAsync(50)
    await nextTick()
    const popper = document.querySelector(
      '.dan-tooltip__popper',
    ) as HTMLElement | null
    expect(!popper || popper.style.display === 'none').toBe(true)
    wrapper.unmount()
  })
})
