import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { DanSegmented } from '../index'

describe('DanSegmented', () => {
  it('updates model on click', async () => {
    const value = ref('day')
    const Comp = defineComponent({
      components: { DanSegmented },
      setup: () => ({
        value,
        options: [
          { label: '日', value: 'day' },
          { label: '周', value: 'week' },
        ],
      }),
      template: `<DanSegmented v-model="value" :options="options" />`,
    })
    const wrapper = mount(Comp)
    await wrapper.findAll('.dan-segmented__item')[1]!.trigger('click')
    expect(value.value).toBe('week')
  })
})
