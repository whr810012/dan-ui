import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanAnchor, DanAnchorLink } from '../index'

describe('DanAnchor', () => {
  it('scrolls to target on link click', async () => {
    const target = document.createElement('div')
    target.id = 'section-a'
    document.body.appendChild(target)
    Object.defineProperty(target, 'getBoundingClientRect', {
      value: () => ({
        top: 200,
        bottom: 240,
        left: 0,
        right: 0,
        width: 0,
        height: 40,
      }),
    })
    const scrollTo = vi.fn()
    window.scrollTo = scrollTo as typeof window.scrollTo

    const Comp = defineComponent({
      components: { DanAnchor, DanAnchorLink },
      template: `
        <DanAnchor>
          <DanAnchorLink href="#section-a" title="A" />
        </DanAnchor>
      `,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    await wrapper.get('a').trigger('click')
    expect(scrollTo).toHaveBeenCalled()
    expect(wrapper.get('a').classes()).toContain('is-active')
    wrapper.unmount()
    target.remove()
  })
})
