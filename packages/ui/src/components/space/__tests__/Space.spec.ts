import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanSpace } from '../index'

describe('DanSpace', () => {
  it('applies direction and gap', () => {
    const wrapper = mount(DanSpace, {
      props: { direction: 'vertical', size: 'large' },
      slots: { default: () => ['a', 'b'] },
    })
    expect(wrapper.classes()).toContain('dan-space--vertical')
    expect(wrapper.attributes('style')).toContain('gap: 16px')
  })

  it('supports compact zero gap', () => {
    const wrapper = mount(DanSpace, {
      props: { compact: true },
    })
    expect(wrapper.classes()).toContain('is-compact')
    expect(wrapper.attributes('style')).toContain('gap: 0px')
  })
})
