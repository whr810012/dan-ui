import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { defineComponent } from 'vue'
import { DanColorPicker } from '../index'

describe('DanColorPicker', () => {
  it('applies predefined color', async () => {
    const color = ref('#2563eb')
    const Comp = defineComponent({
      components: { DanColorPicker },
      setup: () => ({ color }),
      template: `<DanColorPicker v-model="color" :predefine="['#dc2626']" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.get('.dan-color-picker__preset').trigger('click')
    await nextTick()
    expect(color.value).toBe('#dc2626')
  })
})
