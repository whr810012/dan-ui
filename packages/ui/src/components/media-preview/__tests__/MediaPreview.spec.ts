import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanMediaPreview } from '../index'

describe('DanMediaPreview', () => {
  it('detects image type from src', () => {
    const wrapper = mount(DanMediaPreview, {
      props: { src: 'https://example.com/a.png' },
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('shows pdf placeholder and emits open', async () => {
    const wrapper = mount(DanMediaPreview, {
      props: { src: '/doc.pdf', name: 'spec.pdf' },
    })
    expect(wrapper.text()).toContain('PDF')
    await wrapper.find('.dan-media-preview__action').trigger('click')
    expect(wrapper.emitted('open')).toBeTruthy()
  })
})
