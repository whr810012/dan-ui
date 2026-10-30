import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTextarea } from '../index'

describe('DanTextarea', () => {
  it('updates model value', async () => {
    const wrapper = mount(DanTextarea, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) =>
          wrapper.setProps({ modelValue: value }),
      },
    })
    await wrapper.get('textarea').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('hello')
  })

  it('shows word limit and formats via formatter/parser', async () => {
    const wrapper = mount(DanTextarea, {
      props: {
        modelValue: 'hello world',
        maxlength: 20,
        showWordLimit: true,
        formatter: (v: string) => v.toUpperCase(),
        parser: (v: string) => v.toLowerCase(),
      },
    })
    expect(wrapper.find('.dan-textarea__count').text()).toBe('11 / 20')
    expect(
      (wrapper.find('textarea').element as HTMLTextAreaElement).value,
    ).toBe('HELLO WORLD')

    await wrapper.find('textarea').setValue('ABC')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('abc')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.dan-textarea__count').exists()).toBe(false)
  })

  it('applies autosize height style', async () => {
    const value = ref('a\nb\nc')
    const wrapper = mount(DanTextarea, {
      props: {
        modelValue: value.value,
        autosize: { minRows: 2, maxRows: 6 },
      },
      attachTo: document.body,
    })
    await nextTick()
    await nextTick()
    const el = wrapper.get('textarea').element as HTMLTextAreaElement
    expect(el.style.height).not.toBe('')
    expect(el.style.resize).toBe('none')
    wrapper.unmount()
  })
})
