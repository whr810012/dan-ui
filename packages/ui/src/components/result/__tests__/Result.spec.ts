import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanResult } from '../index'

describe('DanResult', () => {
  it('renders title and subtitle', () => {
    const wrapper = mount(DanResult, {
      props: {
        status: 'success',
        title: '完成',
        subTitle: '已提交',
      },
    })
    expect(wrapper.classes()).toContain('dan-result--success')
    expect(wrapper.find('.dan-result__title').text()).toBe('完成')
    expect(wrapper.find('.dan-result__subtitle').text()).toBe('已提交')
  })

  it('maps http status codes to error style', () => {
    const wrapper = mount(DanResult, {
      props: { status: '404', title: '未找到' },
    })
    expect(wrapper.classes()).toContain('dan-result--error')
  })

  it('renders extra slot', () => {
    const wrapper = mount(DanResult, {
      props: { title: '提示' },
      slots: { default: () => '操作区' },
    })
    expect(wrapper.find('.dan-result__extra').text()).toBe('操作区')
  })
})
