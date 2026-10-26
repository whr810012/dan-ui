import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { DanBreadcrumb, DanBreadcrumbItem } from '../index'

describe('DanBreadcrumb', () => {
  it('renders items with separator', () => {
    const Comp = defineComponent({
      components: { DanBreadcrumb, DanBreadcrumbItem },
      template: `
        <DanBreadcrumb separator=">">
          <DanBreadcrumbItem to="/">Home</DanBreadcrumbItem>
          <DanBreadcrumbItem>Detail</DanBreadcrumbItem>
        </DanBreadcrumb>
      `,
    })

    const wrapper = mount(Comp)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Detail')
    expect(wrapper.text()).toContain('>')
    expect(wrapper.get('a').attributes('href')).toBe('/')
  })
})
