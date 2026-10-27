import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useFocusTrap } from '../useFocusTrap'

describe('useFocusTrap', () => {
  it('focuses first control and traps Tab at the last item', async () => {
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus')
    const Comp = defineComponent({
      setup() {
        const root = ref<HTMLElement | null>(null)
        const open = ref(true)
        useFocusTrap(root, open)
        return { root, open }
      },
      template: `
        <div ref="root" tabindex="-1">
          <button type="button">First</button>
          <button type="button">Second</button>
        </div>
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    await nextTick()

    const buttons = wrapper.findAll('button')
    expect(focusSpy.mock.instances[0]).toBe(buttons[0].element)

    focusSpy.mockClear()
    Object.defineProperty(document, 'activeElement', {
      configurable: true,
      get: () => buttons[1].element,
    })
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }),
    )
    expect(focusSpy.mock.instances[focusSpy.mock.instances.length - 1]).toBe(
      buttons[0].element,
    )

    wrapper.unmount()
    focusSpy.mockRestore()
  })
})
