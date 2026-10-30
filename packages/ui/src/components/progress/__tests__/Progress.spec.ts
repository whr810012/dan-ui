import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanProgress } from '../index'

describe('DanProgress', () => {
  it('renders text inside the bar', () => {
    const wrapper = mount(DanProgress, {
      props: { percentage: 42, textInside: true },
    })
    expect(wrapper.find('.dan-progress__inner-text').text()).toBe('42%')
    expect(wrapper.find('.dan-progress__text').exists()).toBe(false)
  })

  it('applies striped and indeterminate classes', () => {
    const striped = mount(DanProgress, {
      props: { percentage: 50, striped: true, stripedFlow: true },
    })
    expect(striped.find('.dan-progress__bar-inner').classes()).toContain(
      'is-striped',
    )
    expect(striped.find('.dan-progress__bar-inner').classes()).toContain(
      'is-striped-flow',
    )

    const indeterminate = mount(DanProgress, {
      props: { indeterminate: true },
    })
    expect(indeterminate.classes()).toContain('is-indeterminate')
    expect(indeterminate.attributes('aria-busy')).toBe('true')
  })
})
