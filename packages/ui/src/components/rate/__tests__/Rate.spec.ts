import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanRate } from '../index'

describe('DanRate', () => {
  it('selects score on click', async () => {
    const value = ref(0)
    const Comp = defineComponent({
      components: { DanRate },
      setup() {
        return { value }
      },
      template: `<DanRate v-model="value" />`,
    })

    const wrapper = mount(Comp)
    const items = wrapper.findAll('.dan-rate__item')
    await items[2]!.trigger('click')
    await nextTick()
    expect(value.value).toBe(3)
  })

  it('ignores click when disabled', async () => {
    const value = ref(2)
    const Comp = defineComponent({
      components: { DanRate },
      setup() {
        return { value }
      },
      template: `<DanRate v-model="value" disabled />`,
    })

    const wrapper = mount(Comp)
    await wrapper.findAll('.dan-rate__item')[4]!.trigger('click')
    expect(value.value).toBe(2)
  })

  it('clears value when clearable and clicking same score', async () => {
    const value = ref(3)
    const Comp = defineComponent({
      components: { DanRate },
      setup() {
        return { value }
      },
      template: `<DanRate v-model="value" clearable />`,
    })

    const wrapper = mount(Comp)
    await wrapper.findAll('.dan-rate__item')[2]!.trigger('click')
    await nextTick()
    expect(value.value).toBe(0)
  })

  it('supports half selection', async () => {
    const value = ref(0)
    const Comp = defineComponent({
      components: { DanRate },
      setup() {
        return { value }
      },
      template: `<DanRate v-model="value" allow-half />`,
    })

    const wrapper = mount(Comp)
    const item = wrapper.findAll('.dan-rate__item')[2]!
    item.element.getBoundingClientRect = () =>
      ({
        left: 0,
        width: 20,
        top: 0,
        height: 20,
        right: 20,
        bottom: 20,
        x: 0,
        y: 0,
        toJSON() {
          return {}
        },
      }) as DOMRect
    await item.trigger('click', { clientX: 4 })
    await nextTick()
    expect(value.value).toBe(2.5)
  })
})

