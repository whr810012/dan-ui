import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanPopconfirm } from '../index'

describe('DanPopconfirm', () => {
  it('opens and emits confirm', async () => {
    const wrapper = mount(DanPopconfirm, {
      props: { title: '删除？' },
      slots: {
        default: '<button class="trig">删</button>',
      },
      attachTo: document.body,
    })
    await wrapper.get('.trig').trigger('click')
    await nextTick()
    const popper = document.querySelector(
      '.dan-popconfirm__popper',
    ) as HTMLElement
    expect(popper).toBeTruthy()
    expect(popper.style.display).not.toBe('none')
    const confirmBtn = Array.from(popper.querySelectorAll('button')).find(
      (btn) => btn.textContent?.includes('确定'),
    )
    confirmBtn?.click()
    await nextTick()
    expect(wrapper.emitted('confirm')).toBeTruthy()
    wrapper.unmount()
  })

  it('opens on contextmenu trigger', async () => {
    const wrapper = mount(DanPopconfirm, {
      props: { title: '删除？', trigger: 'contextmenu' },
      slots: {
        default: '<button class="trig">删</button>',
      },
      attachTo: document.body,
    })
    await wrapper.get('.dan-popconfirm').trigger('contextmenu')
    await nextTick()
    const popper = document.querySelector(
      '.dan-popconfirm__popper',
    ) as HTMLElement
    expect(popper.style.display).not.toBe('none')
    wrapper.unmount()
  })

  it('supports showAfter delay for hover', async () => {
    vi.useFakeTimers()
    const wrapper = mount(DanPopconfirm, {
      props: { title: '删除？', trigger: 'hover', showAfter: 200 },
      slots: {
        default: '<button class="trig">删</button>',
      },
      attachTo: document.body,
    })
    await wrapper.get('.dan-popconfirm').trigger('mouseenter')
    await nextTick()
    let popper = document.querySelector(
      '.dan-popconfirm__popper',
    ) as HTMLElement
    expect(popper.style.display).toBe('none')

    await vi.advanceTimersByTimeAsync(200)
    await nextTick()
    popper = document.querySelector('.dan-popconfirm__popper') as HTMLElement
    expect(popper.style.display).not.toBe('none')

    vi.useRealTimers()
    wrapper.unmount()
  })
})
