import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanSwitch } from '../index'

describe('DanSwitch', () => {
  it('toggles model value', async () => {
    const value = ref(false)
    const Comp = defineComponent({
      components: { DanSwitch },
      setup: () => ({ value }),
      template: `<DanSwitch v-model="value" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.get('.dan-switch').trigger('click')
    expect(value.value).toBe(true)
  })

  it('blocks toggle while loading', async () => {
    const value = ref(false)
    const Comp = defineComponent({
      components: { DanSwitch },
      setup: () => ({ value }),
      template: `<DanSwitch v-model="value" loading />`,
    })
    const wrapper = mount(Comp)
    expect(wrapper.find('.dan-switch__loading').exists()).toBe(true)
    await wrapper.get('.dan-switch').trigger('click')
    expect(value.value).toBe(false)
  })

  it('respects beforeChange false and async resolve', async () => {
    const value = ref(false)
    const beforeChange = vi.fn(() => false)
    const Comp = defineComponent({
      components: { DanSwitch },
      setup: () => ({ value, beforeChange }),
      template: `<DanSwitch v-model="value" :before-change="beforeChange" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.get('.dan-switch').trigger('click')
    await nextTick()
    expect(value.value).toBe(false)

    beforeChange.mockImplementation(() => Promise.resolve(true))
    await wrapper.get('.dan-switch').trigger('click')
    await nextTick()
    await Promise.resolve()
    await nextTick()
    expect(value.value).toBe(true)
  })
})
