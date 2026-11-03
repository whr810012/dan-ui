import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCascader } from '../index'

describe('DanCascader', () => {
  it('selects leaf path', async () => {
    const value = ref<Array<string | number> | null>(null)
    const Comp = defineComponent({
      components: { DanCascader },
      setup: () => ({
        value,
        options: [
          {
            value: 'a',
            label: 'A',
            children: [{ value: 'a1', label: 'A1' }],
          },
        ],
      }),
      template: `<DanCascader v-model="value" :options="options" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-cascader__trigger').trigger('click')
    await nextTick()
    const nodes = document.querySelectorAll('.dan-cascader__node')
    ;(nodes[0] as HTMLElement).click()
    await nextTick()
    const leaf = document.querySelectorAll('.dan-cascader__node')
    ;(leaf[leaf.length - 1] as HTMLElement).click()
    await nextTick()
    expect(value.value).toEqual(['a', 'a1'])
    wrapper.unmount()
  })

  it('supports multiple path selection', async () => {
    const value = ref<Array<Array<string | number>>>([])
    const Comp = defineComponent({
      components: { DanCascader },
      setup: () => ({
        value,
        options: [
          {
            value: 'a',
            label: 'A',
            children: [
              { value: 'a1', label: 'A1' },
              { value: 'a2', label: 'A2' },
            ],
          },
        ],
      }),
      template: `<DanCascader v-model="value" :options="options" multiple />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-cascader__trigger').trigger('click')
    await nextTick()
    ;(
      document.querySelectorAll('.dan-cascader__node')[0] as HTMLElement
    ).click()
    await nextTick()
    const nodes = document.querySelectorAll('.dan-cascader__node')
    ;(nodes[nodes.length - 2] as HTMLElement).click()
    await nextTick()
    ;(nodes[nodes.length - 1] as HTMLElement).click()
    await nextTick()
    expect(value.value).toEqual([
      ['a', 'a1'],
      ['a', 'a2'],
    ])
    expect(wrapper.text()).toContain('A / A1')
    wrapper.unmount()
  })

  it('supports showAllLevels false and checkStrictly', async () => {
    const value = ref<Array<string | number> | null>(['a', 'a1'])
    const Comp = defineComponent({
      components: { DanCascader },
      setup: () => ({
        value,
        options: [
          {
            value: 'a',
            label: 'A',
            children: [{ value: 'a1', label: 'A1' }],
          },
        ],
      }),
      template: `
        <DanCascader
          v-model="value"
          :options="options"
          :show-all-levels="false"
          separator="-"
        />
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    expect(wrapper.text()).toContain('A1')
    expect(wrapper.text()).not.toContain('A / A1')
    wrapper.unmount()

    const strict = ref<Array<string | number> | null>(null)
    const StrictComp = defineComponent({
      components: { DanCascader },
      setup: () => ({
        value: strict,
        options: [
          {
            value: 'a',
            label: 'A',
            children: [{ value: 'a1', label: 'A1' }],
          },
        ],
      }),
      template: `<DanCascader v-model="value" :options="options" check-strictly />`,
    })
    const strictWrapper = mount(StrictComp, { attachTo: document.body })
    await strictWrapper.get('.dan-cascader__trigger').trigger('click')
    await nextTick()
    ;(
      document.querySelectorAll('.dan-cascader__node')[0] as HTMLElement
    ).click()
    await nextTick()
    expect(strict.value).toEqual(['a'])
    strictWrapper.unmount()
  })
})
