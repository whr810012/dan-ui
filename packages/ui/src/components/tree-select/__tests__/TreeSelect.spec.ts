import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTreeSelect } from '../index'

const sampleData = [
  {
    id: 1,
    label: 'Parent',
    children: [
      { id: 11, label: 'Apple' },
      { id: 12, label: 'Banana' },
    ],
  },
  {
    id: 2,
    label: 'Other',
    children: [{ id: 21, label: 'Cherry' }],
  },
]

describe('DanTreeSelect', () => {
  it('selects a leaf node', async () => {
    const value = ref<string | number | null>(null)
    const Comp = defineComponent({
      components: { DanTreeSelect },
      setup: () => ({ value, data: sampleData }),
      template: `<DanTreeSelect v-model="value" :data="data" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-tree-select__trigger').trigger('click')
    await nextTick()
    const labels = document.querySelectorAll('.dan-tree-node__label')
    ;(labels[labels.length - 1] as HTMLElement).click()
    await nextTick()
    expect(value.value).toBe(21)
    wrapper.unmount()
  })

  it('filters nodes by query', async () => {
    const value = ref<string | number | null>(null)
    const Comp = defineComponent({
      components: { DanTreeSelect },
      setup: () => ({ value, data: sampleData }),
      template: `<DanTreeSelect v-model="value" :data="data" filterable />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-tree-select__trigger').trigger('click')
    await nextTick()
    const input = document.querySelector(
      '.dan-tree-select__filter-input',
    ) as HTMLInputElement
    input.value = 'ban'
    input.dispatchEvent(new Event('input'))
    await nextTick()
    const labels = Array.from(
      document.querySelectorAll('.dan-tree-node__label'),
    ).map((el) => el.textContent?.trim())
    expect(labels).toContain('Banana')
    expect(labels).toContain('Parent')
    expect(labels).not.toContain('Cherry')
    wrapper.unmount()
  })

  it('supports multiple selection', async () => {
    const value = ref<Array<string | number>>([])
    const Comp = defineComponent({
      components: { DanTreeSelect },
      setup: () => ({ value, data: sampleData }),
      template: `<DanTreeSelect v-model="value" :data="data" multiple />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-tree-select__trigger').trigger('click')
    await nextTick()
    const checkboxes = document.querySelectorAll(
      '.dan-tree-node__checkbox',
    ) as NodeListOf<HTMLElement>
    expect(checkboxes.length).toBeGreaterThan(0)
    checkboxes[checkboxes.length - 1]!.click()
    await nextTick()
    expect(value.value).toContain(21)
    expect(wrapper.text()).toContain('Cherry')
    wrapper.unmount()
  })
})
