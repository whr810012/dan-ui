import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanButton } from '../index'
import { DanConfigProvider } from '../../config-provider'

describe('DanButton', () => {
  it('renders slot content and type class', () => {
    const wrapper = mount(DanButton, {
      props: { type: 'primary' },
      slots: { default: '提交' },
    })
    expect(wrapper.text()).toContain('提交')
    expect(wrapper.classes()).toContain('dan-button')
    expect(wrapper.classes()).toContain('dan-button--primary')
  })

  it('does not emit click when disabled or loading', async () => {
    const disabled = mount(DanButton, {
      props: { disabled: true },
      slots: { default: '禁用' },
    })
    await disabled.trigger('click')
    expect(disabled.emitted('click')).toBeUndefined()

    const loading = mount(DanButton, {
      props: { loading: true },
      slots: { default: '加载' },
    })
    expect(loading.find('.dan-icon').exists()).toBe(true)
    await loading.trigger('click')
    expect(loading.emitted('click')).toBeUndefined()
  })

  it('inherits size from ConfigProvider', () => {
    const wrapper = mount({
      components: { DanConfigProvider, DanButton },
      template: `
        <DanConfigProvider size="large">
          <DanButton>大号</DanButton>
        </DanConfigProvider>
      `,
    })
    expect(wrapper.find('button').classes()).toContain('dan-button--large')
  })
})
