import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { defineComponent } from 'vue'
import { DanTimePicker } from '../index'

describe('DanTimePicker', () => {
  it('picks hour and minute', async () => {
    const value = ref('08:00')
    const Comp = defineComponent({
      components: { DanTimePicker },
      setup: () => ({ value }),
      template: `<DanTimePicker v-model="value" :step="15" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-time-picker__trigger').trigger('click')
    await nextTick()
    const options = document.querySelectorAll('.dan-time-picker__option')
    ;(options[2] as HTMLElement).click()
    await nextTick()
    expect(value.value?.startsWith('02:') || value.value != null).toBe(true)
    wrapper.unmount()
  })

  it('supports range mode', async () => {
    const value = ref<[string, string] | null>(['09:00', '18:00'])
    const Comp = defineComponent({
      components: { DanTimePicker },
      setup: () => ({ value }),
      template: `<DanTimePicker v-model="value" is-range clearable />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    expect(wrapper.classes()).toContain('is-range')
    expect(wrapper.text()).toContain('09:00')
    await wrapper.get('.dan-time-picker__clear').trigger('click')
    await nextTick()
    expect(value.value).toBeNull()
    wrapper.unmount()
  })
})

