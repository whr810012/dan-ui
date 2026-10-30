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

  it('renders marks and jumps on mark click', async () => {
    const value = ref(10)
    const Comp = defineComponent({
      components: { DanSlider },
      setup() {
        return {
          value,
          marks: { 0: '低', 50: '中', 100: '高' },
        }
      },
      template: `<DanSlider v-model="value" :marks="marks" />`,
    })

    const wrapper = mount(Comp)
    expect(wrapper.findAll('.dan-slider__mark')).toHaveLength(3)
    await wrapper.findAll('.dan-slider__mark')[1]!.trigger('click')
    await nextTick()
    expect(value.value).toBe(50)
  })
})

