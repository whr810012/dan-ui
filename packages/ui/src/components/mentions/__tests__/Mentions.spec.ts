import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanMentions } from '../index'

describe('DanMentions', () => {
  it('inserts selected mention', async () => {
    const value = ref('')
    const Comp = defineComponent({
      components: { DanMentions },
      setup: () => ({
        value,
        options: [{ value: 'alice', label: 'Alice' }],
      }),
      template: `<DanMentions v-model="value" :options="options" />`,
    })
    const wrapper = mount(Comp)
    const textarea = wrapper.get('textarea')
    await textarea.setValue('@a')
    await textarea.trigger('input')
    await nextTick()
    await wrapper.get('.dan-mentions__item').trigger('mousedown')
    await nextTick()
    expect(value.value).toBe('@alice ')
    wrapper.unmount()
  })

  it('supports keyboard selection', async () => {
    const value = ref('')
    const Comp = defineComponent({
      components: { DanMentions },
      setup: () => ({
        value,
        options: [
          { value: 'alice', label: 'Alice' },
          { value: 'bob', label: 'Bob' },
        ],
      }),
      template: `<DanMentions v-model="value" :options="options" />`,
    })
    const wrapper = mount(Comp)
    const textarea = wrapper.get('textarea')
    await textarea.setValue('@')
    await textarea.trigger('input')
    await nextTick()
    await textarea.trigger('keydown', { key: 'ArrowDown' })
    await textarea.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(value.value).toBe('@bob ')
    wrapper.unmount()
  })

  it('emits search and shows loading status', async () => {
    const value = ref('')
    const Comp = defineComponent({
      components: { DanMentions },
      setup: () => ({
        value,
        options: [{ value: 'alice', label: 'Alice' }],
      }),
      template: `<DanMentions v-model="value" :options="options" loading />`,
    })
    const wrapper = mount(Comp)
    const textarea = wrapper.get('textarea')
    await textarea.setValue('@a')
    await textarea.trigger('input')
    await nextTick()
    expect(wrapper.find('.dan-mentions__status').exists()).toBe(true)
    expect(wrapper.findComponent(DanMentions).emitted('search')?.[0]).toEqual([
      'a',
    ])
    wrapper.unmount()
  })
})
