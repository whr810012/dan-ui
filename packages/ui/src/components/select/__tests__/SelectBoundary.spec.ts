import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanSelect } from '../index'

const options = [
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
  { label: '深圳', value: 'sz', disabled: true },
]

function dropdown() {
  return document.querySelector('.dan-select__dropdown') as HTMLElement | null
}

function optionByText(text: string) {
  const node = Array.from(
    document.querySelectorAll('.dan-select__option'),
  ).find((el) => el.textContent?.includes(text)) as HTMLElement | undefined
  if (!node) throw new Error(`option not found: ${text}`)
  return node
}

describe('DanSelect boundary cases', () => {
  it('ignores clicks on disabled options', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: 'sh', options },
    })
    await wrapper.find('.dan-select').trigger('click')
    await nextTick()

    const disabled = optionByText('深圳')
    expect(disabled.className).toContain('is-disabled')
    disabled.click()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('clears a single value through the clear icon', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: 'sh', options, clearable: true },
    })

    const clear = wrapper.get('.dan-select__clear')
    await clear.trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBeNull()
    expect(wrapper.emitted('clear')).toHaveLength(1)
    wrapper.unmount()
  })

  it('clears multiple values to an empty array', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: {
        modelValue: ['sh', 'bj'],
        options,
        multiple: true,
        clearable: true,
      },
    })

    await wrapper.get('.dan-select__clear').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([])
    wrapper.unmount()
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: 'sh', options, disabled: true },
    })

    expect(wrapper.get('.dan-select').classes()).toContain('is-disabled')
    expect(
      wrapper.get('.dan-select__trigger').attributes('disabled'),
    ).toBeDefined()

    await wrapper.get('.dan-select').trigger('click')
    await nextTick()
    expect(dropdown()?.style.display).toBe('none')
    wrapper.unmount()
  })

  it('toggles a selected option off in multiple mode', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: ['sh'], options, multiple: true },
    })
    await wrapper.find('.dan-select').trigger('click')
    await nextTick()

    optionByText('上海').click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([])
    wrapper.unmount()
  })

  it('removes a tag through the tag close icon', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: ['sh', 'bj'], options, multiple: true },
    })

    await wrapper.get('.dan-select__tag-close').trigger('click')
    await nextTick()
    // 第一个标签是「上海」，移除后只剩「北京」
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['bj'])
    wrapper.unmount()
  })

  it('shows the empty state and keeps aria-expanded in sync', async () => {
    const wrapper = mount(DanSelect, {
      attachTo: document.body,
      props: { modelValue: null, options: [] },
    })
    const trigger = wrapper.get('.dan-select__trigger')
    expect(trigger.attributes('aria-expanded')).toBe('false')

    await wrapper.find('.dan-select').trigger('click')
    await nextTick()

    expect(trigger.attributes('aria-expanded')).toBe('true')
    const list = document.querySelector('.dan-select__list') as HTMLElement
    expect(list.textContent).toContain('暂无数据')
    wrapper.unmount()
  })
})
