import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanTable } from '../index'
import type { TableColumn } from '../types'

const columns: TableColumn[] = [
  { prop: 'name', label: '姓名', filterable: true },
  {
    prop: 'role',
    label: '角色',
    filterable: {
      type: 'select',
      options: [
        { label: '管理', value: 'admin' },
        { label: '成员', value: 'member' },
      ],
    },
  },
  { prop: 'age', label: '年龄', sortable: true },
]

const data = [
  { id: 1, name: '张三', role: 'admin', age: 28 },
  { id: 2, name: '李四', role: 'member', age: 22 },
  { id: 3, name: '王五', role: 'member', age: 31 },
]

describe('DanTable', () => {
  it('renders rows and shows empty state', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data, border: true },
    })
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
    expect(wrapper.text()).toContain('张三')

    await wrapper.setProps({ data: [] })
    expect(wrapper.find('.dan-empty').exists()).toBe(true)
  })

  it('filters rows locally by text', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data, filters: { name: '李' } },
    })
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.text()).toContain('李四')
  })

  it('applies filter only after confirm', async () => {
    const wrapper = mount(DanTable, {
      attachTo: document.body,
      props: { columns, data },
    })
    await nextTick()

    const table = wrapper.vm as unknown as {
      setFilterDraft: (prop: string, value: string | null) => void
      confirmFilter: (prop: string) => void
    }
    table.setFilterDraft('name', '李')
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)

    table.confirmFilter('name')
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.text()).toContain('李四')

    wrapper.unmount()
  })

  it('shows filter empty hint and clears filters', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data },
    })
    const table = wrapper.vm as unknown as {
      setFilterDraft: (prop: string, value: string | null) => void
      confirmFilter: (prop: string) => void
      clearAllFilters: () => void
    }
    table.setFilterDraft('name', '不存在的人')
    table.confirmFilter('name')
    await nextTick()

    expect(wrapper.find('.dan-table__empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('未找到匹配的筛选结果')
    table.clearAllFilters()
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)

    wrapper.unmount()
  })

  it('hides columns via visibleColumns', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns,
        data,
        visibleColumns: ['name', 'age'],
      },
    })
    await nextTick()
    expect(wrapper.findAll('thead th')).toHaveLength(2)
    expect(wrapper.text()).not.toContain('角色')
    expect(wrapper.text()).toContain('姓名')
  })

  it('renders multi-level headers', async () => {
    const nested: TableColumn[] = [
      { prop: 'id', label: 'ID', width: 60 },
      {
        label: '基本信息',
        children: [
          { prop: 'name', label: '姓名' },
          { prop: 'age', label: '年龄' },
        ],
      },
    ]
    const wrapper = mount(DanTable, {
      props: {
        columns: nested,
        data: [{ id: 1, name: '张三', age: 28 }],
        border: true,
      },
    })
    await nextTick()
    const headerRows = wrapper.findAll('thead tr')
    expect(headerRows).toHaveLength(2)
    expect(headerRows[0].text()).toContain('基本信息')
    expect(wrapper.findAll('tbody td')).toHaveLength(3)
    expect(wrapper.text()).toContain('张三')
  })

  it('expands tree rows', async () => {
    const treeData = [
      {
        id: 1,
        name: '总部',
        children: [{ id: 11, name: '研发' }],
      },
    ]
    const wrapper = mount(DanTable, {
      props: {
        columns: [{ prop: 'name', label: '名称' }],
        data: treeData,
        tree: true,
      },
    })
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    await wrapper.find('.dan-table__expand').trigger('click')
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.text()).toContain('研发')
  })

  it('supports row selection', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns,
        data,
        selection: true,
        selectedRowKeys: [],
        'onUpdate:selectedRowKeys': (keys: Array<string | number>) => {
          void wrapper.setProps({ selectedRowKeys: keys })
        },
      },
    })
    await nextTick()
    const inputs = wrapper.findAll('.dan-checkbox__original')
    expect(inputs.length).toBeGreaterThan(1)
    const rowInput = inputs[1]!
    ;(rowInput.element as HTMLInputElement).checked = true
    await rowInput.trigger('change')
    await nextTick()
    expect(wrapper.emitted('selection-change')).toBeTruthy()
    expect(wrapper.emitted('update:selectedRowKeys')?.[0]?.[0]).toEqual([
      data[0]!.id,
    ])
  })

  it('expands content row via expandable slot', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns: [{ prop: 'name', label: '姓名' }],
        data: [{ id: 1, name: '张三' }],
        expandable: true,
      },
      slots: {
        expand: `<div class="detail">详情</div>`,
      },
    })
    await nextTick()
    await wrapper.find('.dan-table__expandable-cell .dan-table__expand').trigger('click')
    await nextTick()
    expect(wrapper.find('.detail').exists()).toBe(true)
    expect(wrapper.text()).toContain('详情')
  })

  it('renders summary row for number columns', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns: [
          { prop: 'name', label: '名称' },
          { prop: 'amount', label: '金额' },
        ],
        data: [
          { id: 1, name: 'A', amount: 10 },
          { id: 2, name: 'B', amount: 5 },
        ],
        showSummary: true,
      },
    })
    await nextTick()
    expect(wrapper.find('tfoot').exists()).toBe(true)
    expect(wrapper.find('tfoot').text()).toContain('15')
  })

  it('emits column-resize-end when dragging header resizer', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns: [
          { prop: 'name', label: '姓名', width: 120 },
          { prop: 'age', label: '年龄', width: 80 },
        ],
        data,
        border: true,
      },
    })
    const resizer = wrapper.find('.dan-table__column-resizer')
    expect(resizer.exists()).toBe(true)
    await resizer.trigger('mousedown', { clientX: 100 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 140 }))
    window.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    const payload = wrapper.emitted('column-resize-end')?.[0]?.[0] as {
      prop: string
      width: number
    }
    expect(payload.prop).toBe('name')
    expect(payload.width).toBe(160)
  })

  it('emits row-drag-end with reordered keys', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns: [{ prop: 'name', label: '姓名' }],
        data,
        rowDraggable: true,
      },
    })
    const handles = wrapper.findAll('.dan-table__row-drag-handle')
    expect(handles).toHaveLength(3)
    await handles[0]!.trigger('dragstart', {
      dataTransfer: { setData: () => undefined, effectAllowed: 'move' },
    })
    const rows = wrapper
      .findAll('tbody tr')
      .filter((row) => !row.classes().includes('dan-table__virtual-pad'))
    await rows[2]!.trigger('drop', {
      dataTransfer: { getData: () => '1' },
    })
    const payload = wrapper.emitted('row-drag-end')?.[0]?.[0] as {
      from: number
      to: number
      keys: Array<string | number>
    }
    expect(payload.from).toBe(0)
    expect(payload.to).toBe(2)
    expect(payload.keys.map(String)).toEqual(['2', '3', '1'])
  })

  it('virtually renders a window of rows', async () => {
    const many = Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      name: `行${i + 1}`,
    }))
    const wrapper = mount(DanTable, {
      props: {
        columns: [{ prop: 'name', label: '名称' }],
        data: many,
        virtual: true,
        height: 240,
        rowHeight: 40,
        virtualBuffer: 2,
      },
    })
    await nextTick()
    const bodyRows = wrapper
      .findAll('tbody tr')
      .filter((row) => !row.classes().includes('dan-table__virtual-pad'))
    expect(bodyRows.length).toBeLessThan(40)
    expect(bodyRows.length).toBeGreaterThan(5)
    expect(wrapper.text()).toContain('行1')
  })
})
