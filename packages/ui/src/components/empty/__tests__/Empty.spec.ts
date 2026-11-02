import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanEmpty } from '../index'

describe('DanEmpty', () => {
  it('renders default description', () => {
    const wrapper = mount(DanEmpty)
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('uses type preset description and custom image', () => {
    const wrapper = mount(DanEmpty, {
      props: {
        type: 'search',
        image: 'https://example.com/empty.png',
      },
    })
    expect(wrapper.text()).toContain('没有找到相关结果')
    expect(wrapper.find('img.dan-empty__img').attributes('src')).toBe(
      'https://example.com/empty.png',
    )
  })

  it('applies size class and default image width', () => {
    const small = mount(DanEmpty, { props: { size: 'small' } })
    expect(small.classes()).toContain('dan-empty--small')
    expect(small.find('.dan-empty__image').attributes('style')).toContain(
      '64px',
    )

    const large = mount(DanEmpty, {
      props: { size: 'large', imageSize: 140 },
    })
    expect(large.classes()).toContain('dan-empty--large')
    expect(large.find('.dan-empty__image').attributes('style')).toContain(
      '140px',
    )
  })
})
