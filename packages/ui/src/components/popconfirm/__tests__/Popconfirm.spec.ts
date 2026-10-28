import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
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
})
