import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanAutocomplete } from '../index'

describe('DanAutocomplete', () => {
  it('shows suggestions and selects', async () => {
    const value = ref('')
    const Comp = defineComponent({
      components: { DanAutocomplete },
      setup: () => ({
        value,
        fetchSuggestions: (_q: string, cb: (list: string[]) => void) =>
          cb(['alpha', 'beta']),
      }),
      template: `
        <DanAutocomplete
          v-model="value"
          :fetch-suggestions="fetchSuggestions"
        />
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await wrapper.get('input').trigger('focus')
    await nextTick()
    const item = document.querySelector(
      '.dan-autocomplete__item',
    ) as HTMLElement
    item.click()
    await nextTick()
    expect(value.value).toBe('alpha')
    wrapper.unmount()
  })
})
