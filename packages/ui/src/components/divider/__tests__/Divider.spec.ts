import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanDivider } from '../index'

describe('DanDivider', () => {
  it('renders horizontal text divider', () => {
    const wrapper = mount(DanDivider, {
      slots: { default: () => '或' },
    })
    expect(wrapper.classes()).toContain('dan-divider--horizontal')
    expect(wrapper.find('.dan-divider__text').text()).toBe('或')
  })

  it('supports dashed via borderStyle and legacy dashed prop', async () => {
    const wrapper = mount(DanDivider, {
      props: { borderStyle: 'dotted' },
    })
    expect(wrapper.classes()).toContain('dan-divider--style-dotted')

    await wrapper.setProps({ borderStyle: 'solid', dashed: true })
    expect(wrapper.classes()).toContain('dan-divider--style-dashed')
    expect(wrapper.classes()).toContain('is-dashed')
  })
})
