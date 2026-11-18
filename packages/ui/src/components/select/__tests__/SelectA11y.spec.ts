import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanSelect } from '../index'

const options = [
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
  { label: '深圳', value: 'sz', disabled: true },
]

function optionList() {
  return Array.from(
    document.querySelectorAll<HTMLElement>('.dan-select__option'),
  )
}

describe('DanSelect a11y', () => {
  it('exposes combobox semantics on the trigger', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: 'sh', options },
    })
    const trigger = wrapper.get('.dan-select__trigger')
    expect(trigger.attributes('aria-haspopup')).toBe('listbox')
    expect(trigger.attributes('aria-expanded')).toBe('false')

    await wrapper.get('.dan-select').trigger('click')
    await nextTick()
    expect(trigger.attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  it('renders a single-select listbox with aria-selected options', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: 'sh', options },
    })
    await wrapper.get('.dan-select').trigger('click')
    await nextTick()

    const list = document.querySelector('.dan-select__dropdown') as HTMLElement
    expect(list.getAttribute('role')).toBe('listbox')
    expect(list.getAttribute('aria-multiselectable')).toBeNull()

    const selected = optionList().filter(
      (item) => item.getAttribute('aria-selected') === 'true',
    )
    expect(selected).toHaveLength(1)
    expect(selected[0]!.textContent).toContain('上海')
    wrapper.unmount()
  })

  it('marks the listbox as multi-selectable in multiple mode', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: ['sh', 'bj'], options, multiple: true },
    })
    await wrapper.get('.dan-select').trigger('click')
    await nextTick()

    const list = document.querySelector('.dan-select__dropdown') as HTMLElement
    expect(list.getAttribute('aria-multiselectable')).toBe('true')
    expect(
      optionList().filter(
        (item) => item.getAttribute('aria-selected') === 'true',
      ),
    ).toHaveLength(2)
    wrapper.unmount()
  })

  it('exposes disabled options to assistive technology', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: 'sh', options },
    })
    await wrapper.get('.dan-select').trigger('click')
    await nextTick()

    const disabled = optionList().find((item) =>
      item.textContent?.includes('深圳'),
    )
    expect(disabled?.getAttribute('aria-disabled')).toBe('true')
    wrapper.unmount()
  })
})
