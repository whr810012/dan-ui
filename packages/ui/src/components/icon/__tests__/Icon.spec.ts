import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanIcon } from '../index'

describe('DanIcon', () => {
  it('renders named icon with size and spin', () => {
    const wrapper = mount(DanIcon, {
      props: { name: 'close', size: 20, spin: true, color: '#f00' },
    })
    expect(wrapper.classes()).toContain('dan-icon')
    expect(wrapper.classes()).toContain('is-spin')
    const style = wrapper.attributes('style') || ''
    expect(style).toContain('20px')
    expect(style).toContain('rgb(255, 0, 0)')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('falls back to default slot when name missing', () => {
    const wrapper = mount(DanIcon, {
      slots: { default: () => 'x' },
    })
    expect(wrapper.text()).toBe('x')
  })
})
