import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanDrawer } from '../index'

describe('DanDrawer', () => {
  it('opens and closes with v-model', async () => {
    const wrapper = mount(DanDrawer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '抽屉标题',
        'onUpdate:modelValue': (value: boolean) =>
          wrapper.setProps({ modelValue: value }),
      },
      slots: { default: '抽屉内容' },
    })

    await nextTick()
    expect(document.body.textContent).toContain('抽屉标题')
    expect(document.body.textContent).toContain('抽屉内容')

    const closeBtn = document.querySelector(
      '.dan-drawer__close',
    ) as HTMLButtonElement
    closeBtn.click()
    await nextTick()
    expect(wrapper.props('modelValue')).toBe(false)

    wrapper.unmount()
  })

  it('shows resizer and destroys on close', async () => {
    const wrapper = mount(DanDrawer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        resizable: true,
        destroyOnClose: true,
        title: '可调整',
        'onUpdate:modelValue': (value: boolean) =>
          wrapper.setProps({ modelValue: value }),
      },
      slots: { default: '临时内容' },
    })
    await nextTick()
    expect(document.querySelector('.dan-drawer__resizer')).toBeTruthy()

    ;(document.querySelector('.dan-drawer__close') as HTMLButtonElement).click()
    await nextTick()
    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(document.body.textContent).not.toContain('临时内容')
    wrapper.unmount()
  })
})

