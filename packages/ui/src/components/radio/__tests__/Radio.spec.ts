import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { DanRadio, DanRadioGroup } from '../index'

describe('DanRadio', () => {
  it('supports border and button group styles', async () => {
    const value = ref('a')
    const wrapper = mount({
      components: { DanRadio, DanRadioGroup },
      setup: () => ({ value }),
      template: `
        <DanRadioGroup v-model="value" button>
          <DanRadio label="a">A</DanRadio>
          <DanRadio label="b">B</DanRadio>
        </DanRadioGroup>
      `,
    })

    expect(wrapper.find('.dan-radio-group.is-button').exists()).toBe(true)
    expect(wrapper.findAll('.dan-radio.is-button')).toHaveLength(2)
    expect(wrapper.find('.dan-radio.is-checked').text()).toContain('A')

    await wrapper.findAll('input[type="radio"]')[1]!.setValue(true)
    expect(value.value).toBe('b')
  })

  it('supports border style on single radio', () => {
    const wrapper = mount(DanRadio, {
      props: { modelValue: 'x', label: 'x', border: true },
      slots: { default: '选项' },
    })
    expect(wrapper.find('.dan-radio.is-border').exists()).toBe(true)
    expect(wrapper.find('.dan-radio.is-checked').exists()).toBe(true)
  })
})
