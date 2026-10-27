import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanDatePicker } from '../index'
import { formatDate } from '../dateUtils'

describe('DanDatePicker', () => {
  it('opens panel and selects a day', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" />`,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    expect(document.querySelector('.dan-date-picker__panel')).toBeTruthy()

    const day = document.querySelector(
      '.dan-date-picker__day:not(.is-other)',
    ) as HTMLButtonElement
    day.click()
    await nextTick()
    expect(value.value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(document.querySelector('.dan-date-picker__panel')).toBeFalsy()
    wrapper.unmount()
  })

  it('clears value', async () => {
    const value = ref<string | null>(formatDate(new Date()))
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" clearable />`,
    })

    const wrapper = mount(Comp)
    await wrapper.get('.dan-date-picker__clear').trigger('click')
    await nextTick()
    expect(value.value).toBeNull()
  })
})
