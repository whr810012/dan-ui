import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { DanTimeline, DanTimelineItem } from '../index'

describe('DanTimeline', () => {
  it('applies mode class', () => {
    const wrapper = mount(DanTimeline, {
      props: { mode: 'alternate' },
      slots: {
        default: () => [
          h(DanTimelineItem, { timestamp: '2026-01-01' }, () => 'A'),
          h(DanTimelineItem, { timestamp: '2026-02-01' }, () => 'B'),
        ],
      },
    })
    expect(wrapper.classes()).toContain('dan-timeline--alternate')
    expect(wrapper.findAll('.dan-timeline-item').length).toBe(2)
  })

  it('places timestamp on top', () => {
    const wrapper = mount(DanTimelineItem, {
      props: { timestamp: '今天', placement: 'top' },
      slots: { default: () => '事件' },
    })
    const children = wrapper.find('.dan-timeline-item__wrapper').element
      .children as HTMLCollection
    expect(children[0].className).toContain('dan-timeline-item__timestamp')
    expect(children[1].className).toContain('dan-timeline-item__content')
  })
})
