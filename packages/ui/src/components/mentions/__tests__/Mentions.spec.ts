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
})
