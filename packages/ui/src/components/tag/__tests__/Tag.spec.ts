import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTag } from '../index'

describe('DanTag', () => {
  it('applies hit border emphasis', () => {
    const wrapper = mount(DanTag, {
      props: { type: 'primary', hit: true },
      slots: { default: '重点' },
    })
    expect(wrapper.classes()).toContain('is-hit')
  })

  it('emits close when closable', async () => {
    const wrapper = mount(DanTag, {
      props: { closable: true },
      slots: { default: '可关' },
    })
    await wrapper.get('.dan-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
