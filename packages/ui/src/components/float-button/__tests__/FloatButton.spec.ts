import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanFloatButton } from '../index'

describe('DanFloatButton', () => {
  it('emits click', async () => {
    const wrapper = mount(DanFloatButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
