import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTree } from '../index'

describe('DanTree', () => {
  it('checks node', async () => {
    const checkedKeys = ref<Array<string | number>>([])
    const Comp = defineComponent({
      components: { DanTree },
      setup: () => ({
        checkedKeys,
        data: [{ id: 1, label: 'A', children: [{ id: 11, label: 'A1' }] }],
      }),
      template: `
        <DanTree
          v-model:checked-keys="checkedKeys"
          :data="data"
          show-checkbox
          default-expand-all
        />
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const boxes = wrapper.findAll('input[type="checkbox"]')
    await boxes[0]!.setValue(true)
    expect(checkedKeys.value).toContain(1)
  })

  it('navigates visible nodes with arrow keys', async () => {
    const clicks: Array<string | number> = []
    const Comp = defineComponent({
      components: { DanTree },
      setup: () => ({
        data: [
          {
            id: 1,
            label: 'A',
            children: [{ id: 11, label: 'A1' }],
          },
          { id: 2, label: 'B' },
        ],
        onClick: (node: { id: string | number }) => clicks.push(node.id),
      }),
      template: `
        <DanTree
          :data="data"
          default-expand-all
          @node-click="onClick"
        />
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    await wrapper.get('.dan-tree').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await wrapper.get('.dan-tree').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await wrapper.get('.dan-tree').trigger('keydown', { key: 'Enter' })
    await nextTick()
    // visible order: A → A1 → B；两次 ArrowDown 落在 A1
    expect(clicks).toContain(11)
    wrapper.unmount()
  })
})
