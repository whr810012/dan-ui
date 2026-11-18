import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTabs, DanTabPane } from '../index'

function makeTabs(initial = 'a') {
  const active = ref(initial)
  const Comp = defineComponent({
    components: { DanTabs, DanTabPane },
    setup: () => ({ active }),
    template: `
      <DanTabs v-model="active">
        <DanTabPane label="A" name="a">pane-a</DanTabPane>
        <DanTabPane label="B" name="b" disabled>pane-b</DanTabPane>
        <DanTabPane label="C" name="c">pane-c</DanTabPane>
      </DanTabs>
    `,
  })
  return { active, wrapper: mount(Comp) }
}

describe('DanTabs a11y', () => {
  it('wires tab and panel roles together', async () => {
    const { wrapper } = makeTabs()
    await nextTick()

    expect(wrapper.get('.dan-tabs__nav').attributes('role')).toBe('tablist')
    const tabs = wrapper.findAll('[role="tab"]')
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(tabs).toHaveLength(3)
    expect(panels).toHaveLength(3)

    expect(tabs[0]!.attributes('aria-controls')).toBe(
      panels[0]!.attributes('id'),
    )
    expect(panels[0]!.attributes('aria-labelledby')).toBe(
      tabs[0]!.attributes('id'),
    )
  })

  it('marks the active tab and uses a roving tabindex', async () => {
    const { wrapper } = makeTabs()
    await nextTick()
    const tabs = wrapper.findAll('[role="tab"]')

    expect(tabs[0]!.attributes('aria-selected')).toBe('true')
    expect(tabs[2]!.attributes('aria-selected')).toBe('false')
    expect(tabs[0]!.attributes('tabindex')).toBe('0')
    expect(tabs[2]!.attributes('tabindex')).toBe('-1')
    // 禁用标签不可聚焦，也不可被 roving 选中
    expect(tabs[1]!.attributes('aria-disabled')).toBe('true')
    expect(tabs[1]!.attributes('tabindex')).toBe('-1')
  })

  it('jumps to the last enabled tab with End', async () => {
    const { active, wrapper } = makeTabs()
    await nextTick()
    await wrapper.find('.dan-tabs__nav').trigger('keydown', { key: 'End' })
    await nextTick()
    expect(active.value).toBe('c')
  })

  it('wraps with ArrowLeft and selects with Enter', async () => {
    const { active, wrapper } = makeTabs()
    await nextTick()

    await wrapper
      .find('.dan-tabs__nav')
      .trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    expect(active.value).toBe('c')

    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[0]!.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(active.value).toBe('a')
  })
})
