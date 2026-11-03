import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { DanAvatar, DanAvatarGroup } from '../index'

describe('DanAvatar', () => {
  it('shows fallback text when src missing', () => {
    const wrapper = mount(DanAvatar, { slots: { default: () => 'D' } })
    expect(wrapper.find('.dan-avatar__fallback').text()).toBe('D')
  })

  it('emits error and shows fallback', async () => {
    const wrapper = mount(DanAvatar, {
      props: { src: 'broken.png', alt: 'Dan' },
    })
    await wrapper.find('img').trigger('error')
    expect(wrapper.emitted('error')).toBeTruthy()
    expect(wrapper.find('.dan-avatar__fallback').text()).toBe('D')
  })

  it('inherits size from AvatarGroup', () => {
    const wrapper = mount(DanAvatarGroup, {
      props: { size: 'large' },
      slots: {
        default: () => h(DanAvatar, null, () => 'A'),
      },
    })
    expect(wrapper.find('.dan-avatar--large').exists()).toBe(true)
  })
})

describe('DanAvatarGroup', () => {
  it('collapses overflow with max', () => {
    const wrapper = mount(DanAvatarGroup, {
      props: { max: 2 },
      slots: {
        default: () => [
          h(DanAvatar, null, () => 'A'),
          h(DanAvatar, null, () => 'B'),
          h(DanAvatar, null, () => 'C'),
          h(DanAvatar, null, () => 'D'),
        ],
      },
    })
    expect(wrapper.findAll('.dan-avatar').length).toBe(3)
    expect(wrapper.find('.dan-avatar-group__more').text()).toBe('+2')
  })
})
