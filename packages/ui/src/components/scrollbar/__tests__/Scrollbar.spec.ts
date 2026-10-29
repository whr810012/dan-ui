import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanScrollbar } from '../index'

describe('DanScrollbar', () => {
  it('renders slot content and exposes scroll helpers', async () => {
    const barRef = ref<InstanceType<typeof DanScrollbar>>()
    const Comp = defineComponent({
      components: { DanScrollbar },
      setup: () => ({ barRef }),
      template: `
        <DanScrollbar ref="barRef" height="80px">
          <div style="height: 240px">tall content</div>
        </DanScrollbar>
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    expect(wrapper.text()).toContain('tall content')
    expect(wrapper.find('.dan-scrollbar__wrap').exists()).toBe(true)
    barRef.value?.setScrollTop(40)
    await nextTick()
    expect(barRef.value?.wrapRef?.scrollTop).toBe(40)
    wrapper.unmount()
  })

  it('uses native scrollbar when native is true', async () => {
    const wrapper = mount(DanScrollbar, {
      props: { native: true, height: '60px' },
      slots: { default: '<div style="height:200px">x</div>' },
    })
    expect(wrapper.classes()).toContain('is-native')
    expect(wrapper.find('.dan-scrollbar__bar').exists()).toBe(false)
  })
})
