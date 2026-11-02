import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanAffix } from '../index'

describe('DanAffix', () => {
  it('renders slot content', () => {
    const wrapper = mount(DanAffix, {
      slots: { default: 'affix-content' },
    })
    expect(wrapper.text()).toContain('affix-content')
    expect(wrapper.classes()).toContain('dan-affix')
  })

  it('supports disabled and exposes update', async () => {
    const wrapper = mount(DanAffix, {
      props: { disabled: true, offset: 0 },
      slots: { default: 'pinned' },
      attachTo: document.body,
    })
    await nextTick()
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('.dan-affix__content').classes()).not.toContain(
      'is-fixed',
    )
    expect(typeof wrapper.vm.update).toBe('function')
    wrapper.vm.update()
    await nextTick()
    expect(wrapper.find('.dan-affix__content').classes()).not.toContain(
      'is-fixed',
    )
    wrapper.unmount()
  })
})
