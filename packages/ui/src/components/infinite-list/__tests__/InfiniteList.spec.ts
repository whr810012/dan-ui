import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanInfiniteList } from '../index'

describe('DanInfiniteList', () => {
  it('emits load near bottom', async () => {
    const wrapper = mount(DanInfiniteList, {
      props: { height: 100, threshold: 40 },
      slots: {
        default: '<div style="height: 400px">content</div>',
      },
      attachTo: document.body,
    })
    const el = wrapper.element as HTMLElement
    Object.defineProperty(el, 'scrollHeight', { value: 400, configurable: true })
    Object.defineProperty(el, 'clientHeight', { value: 100, configurable: true })
    Object.defineProperty(el, 'scrollTop', { value: 300, configurable: true })
    el.dispatchEvent(new Event('scroll'))
    expect(wrapper.emitted('load')).toBeTruthy()
    wrapper.unmount()
  })
})
