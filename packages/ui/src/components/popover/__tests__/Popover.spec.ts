import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanPopover } from '../index'

describe('DanPopover', () => {
  it('opens on click and shows content', async () => {
    const wrapper = mount(DanPopover, {
      attachTo: document.body,
      props: {
        title: '标题',
        content: '一段说明',
        trigger: 'click',
      },
      slots: { default: '<button>打开</button>' },
    })

    await wrapper.find('.dan-popover').trigger('click')
    await nextTick()
    const popper = document.querySelector('.dan-popover__popper') as HTMLElement
    expect(popper.style.display).not.toBe('none')
    expect(popper.textContent).toContain('标题')
    expect(popper.textContent).toContain('一段说明')

    document.body.click()
    await nextTick()
    expect(popper.style.display).toBe('none')

    wrapper.unmount()
  })
})
