import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanMarkdown } from '../index'

describe('DanMarkdown', () => {
  it('renders markdown syntax into html', () => {
    const wrapper = mount(DanMarkdown, {
      props: {
        content: '# 标题\n\n**加粗** 与 [链接](https://example.com)',
      },
    })
    expect(wrapper.get('h1').text()).toBe('标题')
    expect(wrapper.get('strong').text()).toBe('加粗')
    expect(wrapper.get('a').attributes('href')).toBe('https://example.com')
  })

  it('escapes raw html by default', () => {
    const wrapper = mount(DanMarkdown, {
      props: { content: '<script>alert(1)</script>' },
    })
    expect(wrapper.find('script').exists()).toBe(false)
    expect(wrapper.text()).toContain('<script>')
  })

  it('strips event handlers when html is enabled', () => {
    const wrapper = mount(DanMarkdown, {
      props: {
        content: '<img src="x" onerror="alert(1)" onload="alert(2)" />',
        html: true,
      },
    })
    const img = wrapper.get('img')
    expect(img.attributes('onerror')).toBeUndefined()
    expect(img.attributes('onload')).toBeUndefined()
  })

  it('honours the breaks option', () => {
    const withBreaks = mount(DanMarkdown, { props: { content: 'a\nb' } })
    expect(withBreaks.html()).toContain('<br>')

    const withoutBreaks = mount(DanMarkdown, {
      props: { content: 'a\nb', breaks: false },
    })
    expect(withoutBreaks.html()).not.toContain('<br>')
  })

  it('renders empty content without throwing', () => {
    const wrapper = mount(DanMarkdown)
    expect(wrapper.get('.dan-markdown').text()).toBe('')
  })
})
