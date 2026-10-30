import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanInputNumber } from '../index'

describe('DanInputNumber', () => {
  it('increases and decreases by step', async () => {
    const value = ref(1)
    const Comp = defineComponent({
      components: { DanInputNumber },
      setup() {
        return { value }
      },
      template: `<DanInputNumber v-model="value" :min="0" :max="5" />`,
    })

    const wrapper = mount(Comp)
    await wrapper.get('.dan-input-number__increase').trigger('click')
    await nextTick()
    expect(value.value).toBe(2)
    await wrapper.get('.dan-input-number__decrease').trigger('click')
    await nextTick()
    expect(value.value).toBe(1)
  })

  it('clamps to max', async () => {
    const value = ref(5)
    const Comp = defineComponent({
      components: { DanInputNumber },
      setup() {
        return { value }
      },
      template: `<DanInputNumber v-model="value" :min="0" :max="5" />`,
    })

    const wrapper = mount(Comp)
    await wrapper.get('.dan-input-number__increase').trigger('click')
    await nextTick()
    expect(value.value).toBe(5)
    expect(
      wrapper.get('.dan-input-number__increase').attributes('disabled'),
    ).toBeDefined()
  })

  it('applies precision and right controls', async () => {
    const value = ref(1)
    const Comp = defineComponent({
      components: { DanInputNumber },
      setup() {
        return { value }
      },
      template: `
        <DanInputNumber
          v-model="value"
          :step="0.2"
          :precision="2"
          controls-position="right"
        />
      `,
    })

    const wrapper = mount(Comp)
    expect(wrapper.classes()).toContain('is-controls-right')
    await wrapper.get('.dan-input-number__increase').trigger('click')
    await nextTick()
    expect(value.value).toBe(1.2)
    expect(wrapper.get('input').element.value).toBe('1.20')
  })
})

