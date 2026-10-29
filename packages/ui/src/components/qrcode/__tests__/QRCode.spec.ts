import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

vi.mock('qrcode', () => ({
  default: {
    toCanvas: vi.fn(async () => undefined),
  },
}))

import { DanQRCode } from '../index'

describe('DanQRCode', () => {
  it('renders canvas', async () => {
    const wrapper = mount(DanQRCode, {
      props: { value: 'https://dandanhub.vip/dan-ui/', size: 96 },
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })
})
