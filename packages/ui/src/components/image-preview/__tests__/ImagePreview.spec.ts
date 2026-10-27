import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { defineComponent } from 'vue'
import { DanImagePreview } from '../index'

describe('DanImagePreview', () => {
  it('closes on button click', async () => {
    const visible = ref(true)
    const Comp = defineComponent({
      components: { DanImagePreview },
      setup: () => ({ visible }),
      template: `<DanImagePreview v-model="visible" url="/a.png" />`,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    ;(
      document.querySelector('.dan-image-preview__close') as HTMLElement
    ).click()
    await nextTick()
    expect(visible.value).toBe(false)
    wrapper.unmount()
  })
})
