import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanThinking } from '../index'

describe('DanThinking', () => {
  it('is collapsed by default and toggles on click', async () => {
    const wrapper = mount(DanThinking, { props: { content: '推理内容' } })
    const body = () => wrapper.get('.dan-thinking__body')

    expect(wrapper.text()).toContain('思考过程')
    expect(wrapper.text()).toContain('展开')
    expect(body().attributes('style')).toContain('display: none')

    await wrapper.get('.dan-thinking__trigger').trigger('click')
    expect(wrapper.text()).toContain('收起')
    expect(body().attributes('style') ?? '').not.toContain('display: none')

    await wrapper.get('.dan-thinking__trigger').trigger('click')
    expect(body().attributes('style')).toContain('display: none')
  })

  it('respects collapsed=false and a custom title', () => {
    const wrapper = mount(DanThinking, {
      props: { content: '推理内容', collapsed: false, title: '推理链路' },
    })
    expect(wrapper.text()).toContain('推理链路')
    expect(wrapper.text()).toContain('收起')
    expect(
      wrapper.get('.dan-thinking__body').attributes('style') ?? '',
    ).not.toContain('display: none')
  })

  it('renders slot content over the content prop', () => {
    const wrapper = mount(DanThinking, {
      props: { content: 'prop 内容', collapsed: false },
      slots: { default: '<em>slot 内容</em>' },
    })
    expect(wrapper.get('.dan-thinking__body em').text()).toBe('slot 内容')
    expect(wrapper.text()).not.toContain('prop 内容')
  })
})
