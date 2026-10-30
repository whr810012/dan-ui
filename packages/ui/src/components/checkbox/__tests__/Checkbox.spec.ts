import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { DanCheckbox, DanCheckboxGroup } from '../index'

describe('DanCheckbox', () => {
  it('supports border and button group styles', async () => {
    const value = ref(['a'])
    const wrapper = mount({
      components: { DanCheckbox, DanCheckboxGroup },
      setup: () => ({ value }),
      template: `
        <DanCheckboxGroup v-model="value" button>
          <DanCheckbox label="a">A</DanCheckbox>
          <DanCheckbox label="b">B</DanCheckbox>
        </DanCheckboxGroup>
      `,
    })

    expect(wrapper.find('.dan-checkbox-group.is-button').exists()).toBe(true)
    expect(wrapper.findAll('.dan-checkbox.is-button')).toHaveLength(2)
    expect(wrapper.find('.dan-checkbox.is-checked').text()).toContain('A')

    await wrapper.findAll('input[type="checkbox"]')[1]!.setValue(true)
    expect(value.value).toEqual(['a', 'b'])
  })

  it('supports border style on single checkbox', () => {
    const wrapper = mount(DanCheckbox, {
      props: { modelValue: true, border: true },
      slots: { default: '同意' },
    })
    expect(wrapper.find('.dan-checkbox.is-border').exists()).toBe(true)
  })
})
