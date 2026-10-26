import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { DanAside, DanFooter, DanHeader, DanLayout, DanMain } from '../index'

describe('DanLayout', () => {
  it('renders classic sidebar layout and collapses aside', async () => {
    const collapsed = ref(false)
    const wrapper = mount({
      components: { DanLayout, DanHeader, DanAside, DanMain, DanFooter },
      template: `
        <DanLayout style="height: 240px">
          <DanAside v-model:collapsed="collapsed" width="200px" collapsed-width="64px">
            侧栏
          </DanAside>
          <DanLayout>
            <DanHeader>顶栏</DanHeader>
            <DanMain>内容</DanMain>
            <DanFooter>底栏</DanFooter>
          </DanLayout>
        </DanLayout>
      `,
      setup() {
        return { collapsed }
      },
    })

    await nextTick()
    const root = wrapper.find('.dan-layout')
    expect(root.classes()).toContain('is-horizontal')
    expect(wrapper.find('.dan-aside').text()).toContain('侧栏')
    expect(wrapper.find('.dan-main').text()).toContain('内容')

    collapsed.value = true
    await nextTick()
    expect(wrapper.find('.dan-aside').classes()).toContain('is-collapsed')
    expect(
      (wrapper.find('.dan-aside').element as HTMLElement).style.width,
    ).toBe('64px')

    wrapper.unmount()
  })
})
