import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTree } from '../index'

const data = [
  {
    id: 1,
    label: 'A',
    children: [
      { id: 11, label: 'A1' },
      { id: 12, label: 'A2', disabled: true },
    ],
  },
  { id: 2, label: 'B' },
]

function makeTree(props: Record<string, unknown> = {}) {
  const checkedKeys = ref<Array<string | number>>([])
  const Comp = defineComponent({
    components: { DanTree },
    setup: () => ({ data, checkedKeys, config: props }),
    template: `<DanTree v-model:checked-keys="checkedKeys" :data="data" v-bind="config" />`,
  })
  return { checkedKeys, wrapper: mount(Comp, { attachTo: document.body }) }
}

describe('DanTree a11y', () => {
  it('exposes tree and treeitem roles with expand state', async () => {
    const { wrapper } = makeTree()
    await nextTick()

    expect(wrapper.get('.dan-tree').attributes('role')).toBe('tree')
    const items = wrapper.findAll('[role="treeitem"]')
    expect(items).toHaveLength(2)

    expect(items[0]!.attributes('aria-expanded')).toBe('false')
    // 叶子节点不声明 aria-expanded
    expect(items[1]!.attributes('aria-expanded')).toBeUndefined()
    wrapper.unmount()
  })

  it('expands with ArrowRight and collapses with ArrowLeft', async () => {
    const { wrapper } = makeTree()
    await nextTick()
    const tree = wrapper.get('.dan-tree')

    await tree.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(
      wrapper.findAll('[role="treeitem"]')[0]!.attributes('aria-expanded'),
    ).toBe('true')

    await tree.trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    expect(
      wrapper.findAll('[role="treeitem"]')[0]!.attributes('aria-expanded'),
    ).toBe('false')
    wrapper.unmount()
  })

  it('moves into children and tracks aria-selected', async () => {
    const { wrapper } = makeTree()
    await nextTick()
    const tree = wrapper.get('.dan-tree')

    await tree.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    await tree.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()

    const items = wrapper.findAll('[role="treeitem"]')
    const selected = items.filter(
      (item) => item.attributes('aria-selected') === 'true',
    )
    expect(selected).toHaveLength(1)
    expect(selected[0]!.text()).toContain('A1')
    wrapper.unmount()
  })

  it('skips disabled nodes during keyboard navigation', async () => {
    const { wrapper } = makeTree()
    await nextTick()
    const tree = wrapper.get('.dan-tree')

    await tree.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()

    const disabled = wrapper
      .findAll('[role="treeitem"]')
      .find((item) => item.get('.dan-tree-node__label').text() === 'A2')
    expect(disabled?.attributes('aria-disabled')).toBe('true')

    // 展开后可见顺序为 A → A1 →（跳过禁用的 A2）→ B
    await tree.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await tree.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await tree.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(wrapper.get('[aria-selected="true"]').text()).toContain('B')
    wrapper.unmount()
  })

  it('toggles the checkbox with Space when checkable', async () => {
    const { checkedKeys, wrapper } = makeTree({ showCheckbox: true })
    await nextTick()

    await wrapper.get('.dan-tree').trigger('keydown', { key: ' ' })
    await nextTick()
    expect(checkedKeys.value).toContain(1)
    wrapper.unmount()
  })

  it('jumps to first and last visible nodes with Home / End', async () => {
    const { wrapper } = makeTree({ defaultExpandAll: true })
    await nextTick()
    const tree = wrapper.get('.dan-tree')

    await tree.trigger('keydown', { key: 'End' })
    await nextTick()
    expect(wrapper.get('[aria-selected="true"]').text()).toContain('B')

    await tree.trigger('keydown', { key: 'Home' })
    await nextTick()
    expect(wrapper.get('[aria-selected="true"]').text()).toContain('A')
    wrapper.unmount()
  })
})
