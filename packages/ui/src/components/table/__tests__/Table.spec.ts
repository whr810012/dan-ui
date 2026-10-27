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
})
