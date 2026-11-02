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
    const leftPanel = wrapper.findAll('.dan-transfer__panel')[0]!
    const itemChecks = leftPanel
      .findAll('.dan-transfer__item input[type="checkbox"]')
    await itemChecks[0]!.setValue(true)
    await wrapper.findAll('.dan-transfer__button')[0]!.trigger('click')
    await nextTick()
    expect(value.value).toEqual([1])
    wrapper.unmount()
  })

  it('supports select-all and button texts', async () => {
    const value = ref<Array<string | number>>([])
    const Comp = defineComponent({
      components: { DanTransfer },
      setup: () => ({
        value,
        data: [
          { key: 1, label: 'A' },
          { key: 2, label: 'B' },
          { key: 3, label: 'C', disabled: true },
        ],
      }),
      template: `
        <DanTransfer
          v-model="value"
          :data="data"
          :button-texts="['加入', '移除']"
          filter-placeholder="找一找"
          filterable
        />
      `,
    })
    const wrapper = mount(Comp)
    expect(wrapper.text()).toContain('加入')
    expect(wrapper.find('.dan-transfer__filter').attributes('placeholder')).toBe(
      '找一找',
    )
    const leftPanel = wrapper.findAll('.dan-transfer__panel')[0]!
    await leftPanel.get('.dan-transfer__header-check input').setValue(true)
    await nextTick()
    expect(leftPanel.text()).toContain('2/3')
    await wrapper.findAll('.dan-transfer__button')[0]!.trigger('click')
    await nextTick()
    expect(value.value).toEqual([1, 2])
    wrapper.unmount()
  })
})
