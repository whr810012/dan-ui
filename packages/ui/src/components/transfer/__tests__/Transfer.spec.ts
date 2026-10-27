import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTransfer } from '../index'

describe('DanTransfer', () => {
  it('moves checked items to the right', async () => {
    const value = ref<Array<string | number>>([])
    const Comp = defineComponent({
      components: { DanTransfer },
      setup: () => ({
        value,
        data: [
          { key: 1, label: 'A' },
          { key: 2, label: 'B' },
        ],
      }),
      template: `<DanTransfer v-model="value" :data="data" />`,
    })
    const wrapper = mount(Comp)
    const leftChecks = wrapper
      .findAll('.dan-transfer__panel')[0]
      .findAll('input[type="checkbox"]')
    await leftChecks[0].setValue(true)
    await wrapper.findAll('.dan-transfer__button')[0].trigger('click')
    await nextTick()
    expect(value.value).toEqual([1])
    wrapper.unmount()
  })
})
