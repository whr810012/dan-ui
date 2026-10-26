import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTabs, DanTabPane } from '../index'

describe('DanTabs', () => {
  it('switches pane on tab click', async () => {
    const active = ref('a')
    const Comp = defineComponent({
      components: { DanTabs, DanTabPane },
      setup() {
        return { active }
      },
      template: `
        <DanTabs v-model="active">
          <DanTabPane label="A" name="a">pane-a</DanTabPane>
          <DanTabPane label="B" name="b">pane-b</DanTabPane>
        </DanTabs>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    expect(wrapper.text()).toContain('pane-a')
    const tabs = wrapper.findAll('.dan-tabs__item')
    expect(tabs).toHaveLength(2)
    await tabs[1]!.trigger('click')
    await nextTick()
    expect(active.value).toBe('b')
    expect(wrapper.text()).toContain('pane-b')
  })

  it('ignores disabled tab', async () => {
    const active = ref('a')
    const Comp = defineComponent({
      components: { DanTabs, DanTabPane },
      setup() {
        return { active }
      },
      template: `
        <DanTabs v-model="active">
          <DanTabPane label="A" name="a">pane-a</DanTabPane>
          <DanTabPane label="B" name="b" disabled>pane-b</DanTabPane>
        </DanTabs>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    await wrapper.findAll('.dan-tabs__item')[1]!.trigger('click')
    expect(active.value).toBe('a')
  })
})
