import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
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

  it('supports separator slot and maxItems collapse', async () => {
    const Comp = defineComponent({
      components: { DanBreadcrumb, DanBreadcrumbItem },
      template: `
        <DanBreadcrumb :max-items="3">
          <template #separator><span class="sep">·</span></template>
          <DanBreadcrumbItem>A</DanBreadcrumbItem>
          <DanBreadcrumbItem>B</DanBreadcrumbItem>
          <DanBreadcrumbItem>C</DanBreadcrumbItem>
          <DanBreadcrumbItem>D</DanBreadcrumbItem>
          <DanBreadcrumbItem>E</DanBreadcrumbItem>
        </DanBreadcrumb>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    expect(wrapper.find('.sep').exists()).toBe(true)
    expect(wrapper.text()).toContain('…')
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('E')
    const items = wrapper.findAll(
      '.dan-breadcrumb-item:not(.dan-breadcrumb-item--ellipsis)',
    )
    const visibleTexts = items
      .filter((item) => (item.element as HTMLElement).style.display !== 'none')
      .map((item) => item.find('.dan-breadcrumb-item__inner').text())
    expect(visibleTexts).toEqual(['A', 'D', 'E'])
  })
})
