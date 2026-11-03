import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanConfigProvider } from '../index'
import { getMessageConfig, setMessageConfig } from '../../message/config'

describe('DanConfigProvider', () => {
  it('applies theme CSS variables', () => {
    const wrapper = mount(DanConfigProvider, {
      props: {
        theme: {
          'color-primary': '#112233',
          '--dan-radius-md': '10px',
        },
      },
      slots: { default: () => 'child' },
    })
    const style = wrapper.attributes('style') || ''
    expect(style).toContain('--dan-color-primary: #112233')
    expect(style).toContain('--dan-radius-md: 10px')
    expect(wrapper.text()).toBe('child')
  })

  it('pushes and restores message global config', async () => {
    setMessageConfig(null)
    const wrapper = mount(DanConfigProvider, {
      props: {
        message: { duration: 1200, max: 2, offset: 48 },
      },
      slots: { default: () => 'x' },
    })
    expect(getMessageConfig()).toMatchObject({
      duration: 1200,
      max: 2,
      offset: 48,
    })
    wrapper.unmount()
    expect(getMessageConfig()).toMatchObject({
      duration: 3000,
      max: Number.POSITIVE_INFINITY,
      offset: 20,
    })
  })
})
