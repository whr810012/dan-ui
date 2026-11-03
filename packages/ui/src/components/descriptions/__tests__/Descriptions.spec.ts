import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanDescriptions } from '../index'

describe('DanDescriptions', () => {
  it('renders extra slot and labelWidth', () => {
    const wrapper = mount(DanDescriptions, {
      props: { title: '用户', labelWidth: 96 },
      slots: {
        extra: () => '操作',
      },
    })
    expect(wrapper.find('.dan-descriptions__extra').text()).toBe('操作')
    const style = wrapper.find('.dan-descriptions').attributes('style') || ''
    expect(style).toContain('--dan-descriptions-label-width: 96px')
  })
})
