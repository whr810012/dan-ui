import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCalendar } from '../index'

describe('DanCalendar', () => {
  it('selects a day', async () => {
    const value = ref('2026-10-01')
    const Comp = defineComponent({
      components: { DanCalendar },
      setup: () => ({ value }),
      template: `<DanCalendar v-model="value" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.get('.dan-calendar__day:not(.is-other)').trigger('click')
    await nextTick()
    expect(value.value).toMatch(/^2026-10-/)
  })
})
