import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
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
          :debounce="0"
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

  it('supports keyboard selection with debounce', async () => {
    vi.useFakeTimers()
    const value = ref('')
    const fetchSuggestions = vi.fn(
      (_q: string, cb: (list: string[]) => void) => cb(['one', 'two']),
    )
    const Comp = defineComponent({
      components: { DanAutocomplete },
      setup: () => ({ value, fetchSuggestions }),
      template: `
        <DanAutocomplete
          v-model="value"
          :fetch-suggestions="fetchSuggestions"
          :debounce="100"
        />
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    const input = wrapper.get('input')
    await input.setValue('o')
    expect(fetchSuggestions).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    await nextTick()
    expect(fetchSuggestions).toHaveBeenCalled()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(value.value).toBe('two')
    vi.useRealTimers()
    wrapper.unmount()
  })
})
