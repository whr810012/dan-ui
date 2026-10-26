import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanSelect } from '../index'

const options = [
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
  { label: '深圳', value: 'sz', disabled: true },
]

describe('DanSelect', () => {
  it('opens themed dropdown and selects option', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: {
        modelValue: 'sh',
        options,
        'onUpdate:modelValue': (value: string | number | boolean | null) =>
          wrapper.setProps({ modelValue: value }),
      },
    })

    expect(wrapper.text()).toContain('上海')
    await wrapper.find('.dan-select').trigger('click')
    await nextTick()

    const dropdown = document.querySelector(
      '.dan-select__dropdown',
    ) as HTMLElement
    expect(dropdown).toBeTruthy()
    expect(dropdown.style.display).not.toBe('none')
    expect(dropdown.textContent).toContain('北京')

    const option = Array.from(
      dropdown.querySelectorAll('.dan-select__option'),
    ).find((el) => el.textContent?.includes('北京')) as HTMLElement
    option.click()
    await nextTick()
    expect(wrapper.props('modelValue')).toBe('bj')
    expect(dropdown.style.display).toBe('none')

    wrapper.unmount()
  })
})
