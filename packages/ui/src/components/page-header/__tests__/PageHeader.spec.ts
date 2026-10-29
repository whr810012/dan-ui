import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanPageHeader } from '../index'

describe('DanPageHeader', () => {
  it('renders title and emits back', async () => {
    const wrapper = mount(DanPageHeader, {
      props: { title: '订单详情', subtitle: '查看与编辑' },
    })
    expect(wrapper.find('.dan-page-header__title').text()).toBe('订单详情')
    expect(wrapper.find('.dan-page-header__subtitle').text()).toBe('查看与编辑')
    await wrapper.find('.dan-page-header__back').trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('hides back when showBack is false and renders slots', () => {
    const wrapper = mount(DanPageHeader, {
      props: { showBack: false, title: '列表' },
      slots: {
        breadcrumb: '<span class="crumb">首页 / 列表</span>',
        extra: '<button class="extra-btn">新建</button>',
      },
    })
    expect(wrapper.find('.dan-page-header__back').exists()).toBe(false)
    expect(wrapper.find('.crumb').exists()).toBe(true)
    expect(wrapper.find('.extra-btn').exists()).toBe(true)
  })
})
