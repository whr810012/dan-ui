import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanInput } from '../index'

describe('DanInput', () => {
  it('applies style/class to root wrapper so suffix stays at the end', () => {
    const wrapper = mount(DanInput, {
      props: { modelValue: 'abc', clearable: true },
      attrs: { style: 'max-width: 360px', class: 'demo-input' },
      slots: {
        suffix: '<span class="suffix-flag">S</span>',
      },
    })

    const root = wrapper.find('.dan-input')
    expect(root.classes()).toContain('demo-input')
    expect(root.attributes('style') || '').toContain('max-width')
    expect(wrapper.find('input').attributes('style') || '').not.toContain(
      'max-width',
    )
    expect(wrapper.find('.dan-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.dan-input__clear').exists()).toBe(true)
  })
})
