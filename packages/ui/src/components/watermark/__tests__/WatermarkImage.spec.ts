import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { DanWatermark } from '../index'

const drawImage = vi.fn()
const fillText = vi.fn()

class FakeImage {
  static instances: FakeImage[] = []
  src = ''
  crossOrigin: string | null = null
  naturalWidth = 64
  naturalHeight = 64
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  constructor() {
    FakeImage.instances.push(this)
  }
}

beforeEach(() => {
  drawImage.mockClear()
  fillText.mockClear()
  FakeImage.instances = []
  vi.stubGlobal('Image', FakeImage)
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    scale: vi.fn(),
    clearRect: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText,
    drawImage,
    globalAlpha: 1,
    fillStyle: '',
    font: '',
    textAlign: '',
    textBaseline: '',
  })) as never
  HTMLCanvasElement.prototype.toDataURL = vi.fn(
    () => 'data:image/png;base64,MOCK',
  ) as never
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('DanWatermark image mode', () => {
  it('keeps painting a text layer when no image is set', () => {
    mount(DanWatermark, { props: { content: 'internal' } })
    expect(FakeImage.instances).toHaveLength(0)
    expect(fillText).toHaveBeenCalledWith(
      'internal',
      expect.any(Number),
      expect.any(Number),
    )
    expect(drawImage).not.toHaveBeenCalled()
  })

  it('loads the image and draws it instead of text once ready', async () => {
    const wrapper = mount(DanWatermark, { props: { image: '/logo.png' } })

    expect(FakeImage.instances).toHaveLength(1)
    expect(FakeImage.instances[0].src).toBe('/logo.png')
    // 图片未就绪前不落背景，避免闪一层空白
    expect(
      wrapper.get('.dan-watermark__layer').attributes('style'),
    ).not.toContain('background-image')

    FakeImage.instances[0].onload?.()
    await nextTick()

    expect(drawImage).toHaveBeenCalledTimes(1)
    expect(fillText).not.toHaveBeenCalled()
    expect(wrapper.get('.dan-watermark__layer').attributes('style')).toContain(
      'background-image',
    )
  })

  it('fits the image into the imageWidth / imageHeight box', async () => {
    mount(DanWatermark, {
      props: { image: '/logo.png', imageWidth: 30, imageHeight: 30 },
    })
    FakeImage.instances[0].onload?.()
    await nextTick()

    // 64x64 原图装进 30x30 盒，等比缩放到 30x30，居中绘制
    const [, x, y, width, height] = drawImage.mock.calls[0]
    expect(x).toBeCloseTo(-15)
    expect(y).toBeCloseTo(-15)
    expect(width).toBeCloseTo(30)
    expect(height).toBeCloseTo(30)
  })

  it('passes crossOrigin through for CORS images', () => {
    mount(DanWatermark, {
      props: {
        image: 'https://cdn.example.com/logo.png',
        crossOrigin: 'anonymous',
      },
    })
    expect(FakeImage.instances[0].crossOrigin).toBe('anonymous')
  })

  it('falls back to the text layer when the image fails to load', async () => {
    const wrapper = mount(DanWatermark, {
      props: { image: '/missing.png', content: 'fallback' },
    })
    FakeImage.instances[0].onerror?.()
    await nextTick()

    expect(drawImage).not.toHaveBeenCalled()
    expect(fillText).toHaveBeenCalledWith(
      'fallback',
      expect.any(Number),
      expect.any(Number),
    )
    expect(wrapper.get('.dan-watermark__layer').attributes('style')).toContain(
      'background-image',
    )
  })

  it('reloads when the image source changes', async () => {
    const wrapper = mount(DanWatermark, { props: { image: '/a.png' } })
    FakeImage.instances[0].onload?.()
    await nextTick()

    await wrapper.setProps({ image: '/b.png' })
    expect(FakeImage.instances).toHaveLength(2)
    expect(FakeImage.instances[1].src).toBe('/b.png')
  })
})
