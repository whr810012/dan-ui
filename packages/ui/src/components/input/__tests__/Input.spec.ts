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

  it('shows word limit and formats via formatter/parser', async () => {
    const wrapper = mount(DanInput, {
      props: {
        modelValue: '13800138000',
        maxlength: 11,
        showWordLimit: true,
        formatter: (v: string | number) =>
          String(v).replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3'),
        parser: (v: string) => v.replace(/\s/g, ''),
      },
    })
    expect(wrapper.find('.dan-input__count').text()).toBe('11 / 11')
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
      '138 0013 8000',
    )

    await wrapper.find('input').setValue('138 0013 8001')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('13800138001')
  })
})
