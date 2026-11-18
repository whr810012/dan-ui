import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanImage } from '../index'

function mountImage(props: Record<string, unknown> = {}) {
  return mount(DanImage, {
    attachTo: document.body,
    props: {
      src: 'https://example.com/a.png',
      preview: true,
      ...props,
    },
  })
}

async function openByKeyboard(wrapper: ReturnType<typeof mountImage>) {
  await wrapper.find('img').trigger('load')
  await wrapper.get('.dan-image').trigger('keydown', { key: 'Enter' })
  await nextTick()
}

afterEach(() => {
  document.body.style.overflow = ''
  document
    .querySelectorAll('.dan-image__preview')
    .forEach((node) => node.remove())
})

describe('DanImage preview experience', () => {
  it('is keyboard reachable only when preview is enabled', async () => {
    const plain = mount(DanImage, {
      attachTo: document.body,
      props: { src: 'https://example.com/a.png' },
    })
    expect(plain.get('.dan-image').attributes('tabindex')).toBeUndefined()
    expect(plain.get('.dan-image').attributes('role')).toBeUndefined()
    plain.unmount()

    const wrapper = mountImage()
    const root = wrapper.get('.dan-image')
    expect(root.attributes('tabindex')).toBe('0')
    expect(root.attributes('role')).toBe('button')
    expect(root.attributes('aria-haspopup')).toBe('dialog')
    wrapper.unmount()
  })

  it('opens from the keyboard and locks body scrolling', async () => {
    const wrapper = mountImage()
    await openByKeyboard(wrapper)

    expect(document.querySelector('.dan-image__preview')).toBeTruthy()
    expect(document.body.style.overflow).toBe('hidden')
    wrapper.unmount()
  })

  it('moves focus into the dialog and restores it on close', async () => {
    const wrapper = mountImage()
    await openByKeyboard(wrapper)

    const close = document.querySelector(
      '.dan-image__preview-close',
    ) as HTMLButtonElement
    expect(document.activeElement).toBe(close)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(document.querySelector('.dan-image__preview')).toBeFalsy()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(wrapper.get('.dan-image').element)
    expect(wrapper.emitted('close')).toBeTruthy()
    wrapper.unmount()
  })

  it('keeps Escape and arrow keys working for galleries', async () => {
    const list = ['https://example.com/a.png', 'https://example.com/b.png']
    const wrapper = mountImage({ previewSrcList: list })
    await openByKeyboard(wrapper)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await nextTick()
    expect(
      (document.querySelector('.dan-image__preview-img') as HTMLImageElement)
        .src,
    ).toContain('b.png')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    await nextTick()
    expect(
      (document.querySelector('.dan-image__preview-img') as HTMLImageElement)
        .src,
    ).toContain('a.png')
    wrapper.unmount()
  })

  it('releases the scroll lock when unmounted mid preview', async () => {
    const wrapper = mountImage()
    await openByKeyboard(wrapper)
    expect(document.body.style.overflow).toBe('hidden')

    wrapper.unmount()
    expect(document.body.style.overflow).toBe('')
  })
})
