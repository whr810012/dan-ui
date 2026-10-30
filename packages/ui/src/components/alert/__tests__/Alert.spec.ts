import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanAlert } from '../index'

describe('DanAlert', () => {
  it('supports center and closeText', async () => {
    const wrapper = mount(DanAlert, {
      props: {
        title: '提示',
        center: true,
        closeText: '知道了',
      },
    })
    expect(wrapper.classes()).toContain('is-center')
    expect(wrapper.get('.dan-alert__close').text()).toBe('知道了')
    await wrapper.get('.dan-alert__close').trigger('click')
    expect(wrapper.find('.dan-alert').exists()).toBe(false)
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
