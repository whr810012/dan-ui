import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanTree } from '../index'

describe('DanTree', () => {
  it('filters nodes and highlights matches', async () => {
    const Comp = defineComponent({
      components: { DanTree },
      setup: () => ({
        data: [
          {
            id: 1,
            label: '文档',
            children: [
              { id: 11, label: '指南' },
              { id: 12, label: '组件' },
            ],
          },
          { id: 2, label: '资源' },
        ],
      }),
      template: `<DanTree ref="tree" :data="data" />`,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const tree = wrapper.findComponent(DanTree).vm as {
      filter: (query: string) => void
    }
    tree.filter('组')
    await nextTick()
    expect(wrapper.text()).toContain('文档')
    expect(wrapper.text()).toContain('组件')
    expect(wrapper.text()).not.toContain('资源')
    expect(wrapper.find('.dan-tree-node__mark').text()).toBe('组')

    tree.filter('不存在')
    await nextTick()
    expect(wrapper.find('.dan-tree__empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('无匹配节点')
  })

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

  it('emits node-drag-end with reordered data', async () => {
    const data = ref<Array<{ id: number; label: string; children?: unknown[] }>>([
      { id: 1, label: 'A', children: [{ id: 11, label: 'A1' }] },
      { id: 2, label: 'B' },
    ])
    const Comp = defineComponent({
      components: { DanTree },
      setup: () => ({
        data,
        onDragEnd: (payload: { data: typeof data.value }) => {
          data.value = payload.data as typeof data.value
        },
      }),
      template: `
        <DanTree
          :data="data"
          default-expand-all
          draggable
          @node-drag-end="onDragEnd"
        />
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const contents = wrapper.findAll('.dan-tree-node__content')
    const drag = contents.find((el) => el.attributes('data-tree-id') === '2')!
    const drop = contents.find((el) => el.attributes('data-tree-id') === '1')!
    await drag.trigger('dragstart', {
      dataTransfer: { setData: () => undefined, effectAllowed: 'move' },
    })
    Object.defineProperty(drop.element, 'getBoundingClientRect', {
      value: () => ({ top: 0, height: 40, bottom: 40, left: 0, right: 100, width: 100, x: 0, y: 0, toJSON: () => ({}) }),
    })
    await drop.trigger('dragover', { clientY: 20, currentTarget: drop.element })
    await drop.trigger('drop', {
      clientY: 20,
      currentTarget: drop.element,
      dataTransfer: { getData: () => '2' },
    })
    await nextTick()
    expect(data.value.map((n) => n.id)).toEqual([1])
    expect(data.value[0]?.children?.map((n) => (n as { id: number }).id)).toEqual([
      11, 2,
    ])
  })
})
