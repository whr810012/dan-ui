import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { DanWatermark } from '../index'

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never
  HTMLCanvasElement.prototype.toDataURL = vi.fn(() => '') as never
})

describe('DanWatermark', () => {
  it('renders content layer', () => {
    const wrapper = mount(DanWatermark, {
      props: { content: 'secret' },
      slots: { default: '<div class="body">page</div>' },
    })
    expect(wrapper.find('.body').exists()).toBe(true)
    expect(wrapper.find('.dan-watermark__layer').exists()).toBe(true)
  })
})

