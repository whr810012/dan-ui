import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { DanCascaderPanel } from '../index'

describe('DanCascaderPanel', () => {
  it('selects leaf path', async () => {
    const value = ref<Array<string | number> | null>(null)
    const Comp = defineComponent({
      components: { DanCascaderPanel },
      setup: () => ({
        value,
        options: [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [{ value: 'hangzhou', label: '杭州' }],
          },
        ],
      }),
      template: `<DanCascaderPanel v-model="value" :options="options" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.findAll('.dan-cascader__node')[0]!.trigger('click')
    await wrapper.findAll('.dan-cascader__node')[1]!.trigger('click')
    expect(value.value).toEqual(['zhejiang', 'hangzhou'])
  })

  it('filters options by label when filterable', async () => {
    const value = ref<Array<string | number> | null>(null)
    const Comp = defineComponent({
      components: { DanCascaderPanel },
      setup: () => ({
        value,
        options: [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              { value: 'hangzhou', label: '杭州' },
              { value: 'ningbo', label: '宁波' },
            ],
          },
          {
            value: 'jiangsu',
            label: '江苏',
            children: [{ value: 'nanjing', label: '南京' }],
          },
        ],
      }),
      template: `<DanCascaderPanel v-model="value" :options="options" filterable />`,
    })
    const wrapper = mount(Comp)
    await wrapper.find('.dan-cascader-panel__filter-input').setValue('杭州')
    const nodes = wrapper.findAll('.dan-cascader__node')
    expect(nodes.some((n) => n.text().includes('浙江'))).toBe(true)
    expect(nodes.some((n) => n.text().includes('江苏'))).toBe(false)
  })
})
