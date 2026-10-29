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
})
