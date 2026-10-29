import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTimeSelect } from '../index'

describe('DanTimeSelect', () => {
  it('selects a stepped time option', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanTimeSelect },
      setup: () => ({ value }),
      template: `<DanTimeSelect v-model="value" start="09:00" end="10:00" step="00:30" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-time-select__trigger').trigger('click')
    await nextTick()
    const options = document.querySelectorAll('.dan-time-select__option')
    expect(Array.from(options).map((el) => el.textContent?.trim())).toEqual([
      '09:00',
      '09:30',
      '10:00',
    ])
    ;(options[1] as HTMLElement).click()
    await nextTick()
    expect(value.value).toBe('09:30')
    wrapper.unmount()
  })

  it('respects minTime and maxTime', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanTimeSelect },
      setup: () => ({ value }),
      template: `<DanTimeSelect
        v-model="value"
        start="08:00"
        end="12:00"
        :step="60"
        min-time="09:00"
        max-time="11:00"
      />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-time-select__trigger').trigger('click')
    await nextTick()
    const labels = Array.from(
      document.querySelectorAll('.dan-time-select__option'),
    ).map((el) => el.textContent?.trim())
    expect(labels).toEqual(['09:00', '10:00', '11:00'])
    wrapper.unmount()
  })
})
