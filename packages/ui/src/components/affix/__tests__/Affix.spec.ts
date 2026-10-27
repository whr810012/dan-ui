import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanAffix } from '../index'

describe('DanAffix', () => {
  it('renders slot content', () => {
    const wrapper = mount(DanAffix, {
      slots: { default: 'affix-content' },
    })
    expect(wrapper.text()).toContain('affix-content')
    expect(wrapper.classes()).toContain('dan-affix')
  })
})
