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

  it('moves with arrow keys and skips disabled', async () => {
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
          <DanTabPane label="C" name="c">pane-c</DanTabPane>
        </DanTabs>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    await wrapper.find('.dan-tabs__nav').trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(active.value).toBe('c')
    await wrapper.find('.dan-tabs__nav').trigger('keydown', { key: 'Home' })
    await nextTick()
    expect(active.value).toBe('a')
  })

  it('emits tabRemove / tabAdd when editable', async () => {
    const active = ref('a')
    const removed: Array<string | number> = []
    let added = 0
    const Comp = defineComponent({
      components: { DanTabs, DanTabPane },
      setup() {
        return {
          active,
          onRemove: (name: string | number) => removed.push(name),
          onAdd: () => {
            added += 1
          },
        }
      },
      template: `
        <DanTabs v-model="active" editable @tab-remove="onRemove" @tab-add="onAdd">
          <DanTabPane label="A" name="a">pane-a</DanTabPane>
          <DanTabPane label="B" name="b" :closable="false">pane-b</DanTabPane>
        </DanTabs>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    expect(wrapper.findAll('.dan-tabs__close')).toHaveLength(1)
    expect(wrapper.find('.dan-tabs__new').exists()).toBe(true)

    await wrapper.find('.dan-tabs__close').trigger('click')
    expect(removed).toEqual(['a'])

    await wrapper.find('.dan-tabs__new').trigger('click')
    expect(added).toBe(1)
  })
})
