import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanDialog } from '../index'

describe('DanDialog', () => {
  it('supports alignCenter and draggable classes', async () => {
    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '居中拖拽',
        alignCenter: true,
        draggable: true,
      },
      slots: { default: '内容' },
    })
    await nextTick()
    const root = document.querySelector('.dan-dialog')
    const header = document.querySelector('.dan-dialog__header')
    expect(root?.classList.contains('is-align-center')).toBe(true)
    expect(header?.classList.contains('is-draggable')).toBe(true)
    wrapper.unmount()
  })

  it('destroys content when destroyOnClose', async () => {
    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        destroyOnClose: true,
        title: '销毁',
        'onUpdate:modelValue': (value: boolean) =>
          wrapper.setProps({ modelValue: value }),
      },
      slots: { default: '仅打开时存在' },
    })
    await nextTick()
    expect(document.body.textContent).toContain('仅打开时存在')
    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(document.body.textContent).not.toContain('仅打开时存在')
    wrapper.unmount()
  })

  it('closes on Escape and exposes labelled dialog role', async () => {
    const wrapper = mount(DanDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '可关闭',
        'onUpdate:modelValue': (value: boolean) =>
          wrapper.setProps({ modelValue: value }),
      },
      slots: { default: '面板内容' },
    })
    await nextTick()
    const panel = document.querySelector('.dan-dialog__panel')
    expect(panel?.getAttribute('role')).toBe('dialog')
    expect(panel?.getAttribute('aria-modal')).toBe('true')
    expect(panel?.getAttribute('aria-labelledby')).toBeTruthy()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.props('modelValue')).toBe(false)
    wrapper.unmount()
  })
})
