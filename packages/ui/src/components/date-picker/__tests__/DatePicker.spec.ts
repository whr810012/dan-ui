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

  it('respects disabledDate', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        const disabledDate = (date: Date) => date.getDate() === 1
        return { value, disabledDate }
      },
      template: `<DanDatePicker v-model="value" :disabled-date="disabledDate" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    const disabled = document.querySelector(
      '.dan-date-picker__day.is-disabled',
    ) as HTMLButtonElement | null
    expect(disabled).toBeTruthy()
    disabled?.click()
    await nextTick()
    expect(value.value).toBeNull()
    wrapper.unmount()
  })

  it('applies shortcuts', async () => {
    const value = ref<string | null>(null)
    const today = new Date()
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        const shortcuts = [{ text: '今天', value: today }]
        return { value, shortcuts }
      },
      template: `<DanDatePicker v-model="value" :shortcuts="shortcuts" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    const btn = document.querySelector(
      '.dan-date-picker__shortcut',
    ) as HTMLButtonElement
    btn.click()
    await nextTick()
    expect(value.value).toBe(formatDate(today))
    wrapper.unmount()
  })

  it('confirms datetime value', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" type="datetime" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    const day = document.querySelector(
      '.dan-date-picker__day:not(.is-other):not(.is-disabled)',
    ) as HTMLButtonElement
    day.click()
    await nextTick()
    const confirm = document.querySelector(
      '.dan-date-picker__confirm',
    ) as HTMLButtonElement
    confirm.click()
    await nextTick()
    expect(value.value).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
    wrapper.unmount()
  })

  it('selects month value as YYYY-MM', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" type="month" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    const cell = document.querySelector(
      '.dan-date-picker__month-cell',
    ) as HTMLButtonElement
    cell.click()
    await nextTick()
    expect(value.value).toMatch(/^\d{4}-\d{2}$/)
    wrapper.unmount()
  })

  it('selects year value as YYYY', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" type="year" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    const cells = Array.from(
      document.querySelectorAll('.dan-date-picker__month-cell'),
    ) as HTMLButtonElement[]
    cells[1].click()
    await nextTick()
    expect(value.value).toMatch(/^\d{4}$/)
    wrapper.unmount()
  })

  it('selects week as Monday YYYY-MM-DD', async () => {
    const value = ref<string | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" type="week" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    const day = document.querySelector(
      '.dan-date-picker__day:not(.is-other):not(.is-disabled)',
    ) as HTMLButtonElement
    day.click()
    await nextTick()
    expect(value.value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    const [y, m, d] = value.value!.split('-').map(Number)
    expect(new Date(y, m - 1, d).getDay()).toBe(1)
    wrapper.unmount()
  })

  it('renders dual calendars with unlinkPanels', async () => {
    const value = ref<[string, string] | null>(null)
    const Comp = defineComponent({
      components: { DanDatePicker },
      setup() {
        return { value }
      },
      template: `<DanDatePicker v-model="value" type="daterange" unlink-panels />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('.dan-date-picker__trigger').trigger('click')
    await nextTick()
    expect(document.querySelectorAll('.dan-date-picker__calendar').length).toBe(
      2,
    )
    expect(document.querySelector('.dan-date-picker__calendars')).toBeTruthy()
    wrapper.unmount()
  })
})

