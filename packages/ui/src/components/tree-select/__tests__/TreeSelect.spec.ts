import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTreeSelect } from '../index'

describe('DanTreeSelect', () => {
  it('selects a leaf node', async () => {
    const value = ref<string | number | null>(null)
    const Comp = defineComponent({
      components: { DanTreeSelect },
      setup: () => ({
        value,
        data: [
          {
            id: 1,
            label: 'Parent',
            children: [{ id: 11, label: 'Leaf' }],
          },
        ],
      }),
      template: `<DanTreeSelect v-model="value" :data="data" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-tree-select__trigger').trigger('click')
    await nextTick()
    const labels = document.querySelectorAll('.dan-tree-node__label')
    ;(labels[labels.length - 1] as HTMLElement).click()
    await nextTick()
    expect(value.value).toBe(11)
    wrapper.unmount()
  })
})
