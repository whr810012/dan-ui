import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanSlider } from '../index'

describe('DanSlider', () => {
  it('changes value with keyboard', async () => {
    const value = ref(10)
    const Comp = defineComponent({
      components: { DanSlider },
      setup() {
        return { value }
      },
      template: `<DanSlider v-model="value" :step="5" />`,
    })

    const wrapper = mount(Comp)
    await wrapper
      .get('[role="slider"]')
      .trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(value.value).toBe(15)
    await wrapper.get('[role="slider"]').trigger('keydown', { key: 'Home' })
    await nextTick()
    expect(value.value).toBe(0)
  })
})
