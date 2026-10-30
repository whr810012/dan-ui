import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanImage } from '../index'

describe('DanImage', () => {
  it('opens multi preview and switches with nav', async () => {
    const list = [
      'https://example.com/a.png',
      'https://example.com/b.png',
      'https://example.com/c.png',
    ]
    const wrapper = mount(DanImage, {
      attachTo: document.body,
      props: {
        src: list[1],
        preview: true,
        previewSrcList: list,
      },
    })

    await wrapper.trigger('click')
    await nextTick()
    const preview = document.querySelector('.dan-image__preview') as HTMLElement
    expect(preview).toBeTruthy()
    const img = preview.querySelector(
      '.dan-image__preview-img',
    ) as HTMLImageElement
    expect(img.src).toContain('b.png')
    expect(preview.textContent).toContain('2 / 3')

    await preview
      .querySelector('.dan-image__preview-next')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(
      (preview.querySelector('.dan-image__preview-img') as HTMLImageElement).src,
    ).toContain('c.png')
    expect(wrapper.emitted('switch')?.[0]?.[0]).toBe(2)

    wrapper.unmount()
  })
})
