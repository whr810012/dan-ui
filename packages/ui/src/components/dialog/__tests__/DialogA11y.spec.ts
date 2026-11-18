import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanDialog } from '../index'

function focusables() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '.dan-dialog__panel button:not([disabled])',
    ),
  )
}

describe('DanDialog a11y', () => {
  it('labels the panel by its title and exposes a close label', async () => {
    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '无障碍标题',
        showClose: true,
      },
      slots: { default: '内容' },
    })
    await nextTick()

    const panel = document.querySelector('.dan-dialog__panel') as HTMLElement
    const labelledBy = panel.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    expect(document.getElementById(labelledBy!)?.textContent).toBe('无障碍标题')

    const close = document.querySelector('.dan-dialog__close') as HTMLElement
    expect(close.getAttribute('aria-label')).toBe('关闭')

    wrapper.unmount()
  })

  it('moves focus into the panel on open', async () => {
    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: { modelValue: true, title: '聚焦', showClose: true },
      slots: { default: '内容' },
    })
    await flushPromises()

    expect(document.activeElement).toBe(focusables()[0])
    wrapper.unmount()
  })

  it('traps Tab and Shift+Tab inside the panel', async () => {
    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '焦点陷阱',
        showClose: true,
        showCancel: true,
        showConfirm: true,
      },
      slots: { default: '内容' },
    })
    await flushPromises()

    const nodes = focusables()
    expect(nodes.length).toBeGreaterThanOrEqual(3)
    const first = nodes[0]!
    const last = nodes[nodes.length - 1]!

    last.focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    expect(document.activeElement).toBe(first)

    first.focus()
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }),
    )
    expect(document.activeElement).toBe(last)

    wrapper.unmount()
  })

  it('restores focus to the trigger after closing', async () => {
    const trigger = document.createElement('button')
    trigger.textContent = '打开'
    document.body.appendChild(trigger)
    trigger.focus()

    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: { modelValue: false, title: '还原焦点', showClose: true },
      slots: { default: '内容' },
    })
    await nextTick()

    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    expect(document.activeElement).not.toBe(trigger)

    await wrapper.setProps({ modelValue: false })
    await flushPromises()
    expect(document.activeElement).toBe(trigger)

    wrapper.unmount()
    trigger.remove()
  })
})
