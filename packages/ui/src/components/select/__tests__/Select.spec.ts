import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
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
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('bj')
    expect(dropdown.style.display).toBe('none')

    wrapper.unmount()
  })

  it('supports arrow keys and enter to select', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: {
        modelValue: 'sh',
        options,
      },
    })

    const trigger = wrapper.find('.dan-select__trigger')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(
      document.querySelector('.dan-select__dropdown') as HTMLElement,
    ).toBeTruthy()

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Enter' })
    await nextTick()
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.[emitted.length - 1]?.[0]).toBe('bj')

    wrapper.unmount()
  })

  it('supports multiple selection and filter', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: {
        modelValue: [],
        multiple: true,
        filterable: true,
        options,
      },
    })

    await wrapper.find('.dan-select').trigger('click')
    await nextTick()
    const dropdown = document.querySelector('.dan-select__dropdown')!
    const option = Array.from(
      dropdown.querySelectorAll('.dan-select__option'),
    ).find((el) => el.textContent?.includes('上海')) as HTMLElement
    option.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['sh'])

    const input = dropdown.querySelector(
      '.dan-select__filter-input',
    ) as HTMLInputElement
    input.value = '北'
    input.dispatchEvent(new Event('input'))
    await nextTick()
    expect(dropdown.textContent).toContain('北京')
    expect(dropdown.textContent).not.toContain('深圳')

    wrapper.unmount()
  })

  it('calls remoteMethod when remote searching', async () => {
    vi.useFakeTimers()
    const remoteMethod = vi.fn()
    const optionsRef = ref([
      { label: '上海', value: 'sh' },
      { label: '北京', value: 'bj' },
    ])
    const Comp = defineComponent({
      components: { DanSelect },
      setup: () => ({
        value: ref(null),
        options: optionsRef,
        remoteMethod,
      }),
      template: `<DanSelect
        v-model="value"
        :options="options"
        remote
        :remote-method="remoteMethod"
        :remote-debounce="0"
      />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.find('.dan-select').trigger('click')
    await nextTick()
    expect(remoteMethod).toHaveBeenCalledWith('')

    const input = document.querySelector(
      '.dan-select__filter-input',
    ) as HTMLInputElement
    input.value = '北'
    input.dispatchEvent(new Event('input'))
    await nextTick()
    vi.runAllTimers()
    expect(remoteMethod).toHaveBeenCalledWith('北')

    vi.useRealTimers()
    wrapper.unmount()
  })

  it('keeps selected label after remote options change', async () => {
    const value = ref('sh')
    const optionsRef = ref([{ label: '上海', value: 'sh' }])
    const Comp = defineComponent({
      components: { DanSelect },
      setup: () => ({ value, options: optionsRef }),
      template: `<DanSelect v-model="value" :options="options" remote />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    expect(wrapper.text()).toContain('上海')
    optionsRef.value = [{ label: '北京', value: 'bj' }]
    await nextTick()
    expect(wrapper.text()).toContain('上海')
    wrapper.unmount()
  })
})
