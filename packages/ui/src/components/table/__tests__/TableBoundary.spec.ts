import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanTable } from '../index'
import type { TableColumn, TableRow } from '../types'

const columns: TableColumn[] = [
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'age', label: '年龄', sortable: true },
]

const data: TableRow[] = [
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 22 },
  { id: 3, name: '王五', age: 31 },
]

function headerLabel(wrapper: ReturnType<typeof mount>, text: string) {
  const node = wrapper
    .findAll('.dan-table__header-label')
    .find((item) => item.text().includes(text))
  if (!node) throw new Error(`header not found: ${text}`)
  return node
}

function firstCellText(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('tbody tr')[0]!.findAll('td')[0]!.text()
}

function rowCheckboxes(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('.dan-checkbox__original')
}

describe('DanTable boundary cases', () => {
  it('cycles sort order asc → desc → none', async () => {
    const wrapper = mount(DanTable, { props: { columns, data } })

    await headerLabel(wrapper, '年龄').trigger('click')
    await nextTick()
    expect(firstCellText(wrapper)).toBe('李四')
    expect(wrapper.emitted('sort-change')?.[0]?.[0]).toEqual({
      prop: 'age',
      order: 'asc',
    })

    await headerLabel(wrapper, '年龄').trigger('click')
    await nextTick()
    expect(firstCellText(wrapper)).toBe('王五')
    expect(wrapper.emitted('sort-change')?.[1]?.[0]).toEqual({
      prop: 'age',
      order: 'desc',
    })

    await headerLabel(wrapper, '年龄').trigger('click')
    await nextTick()
    expect(firstCellText(wrapper)).toBe('张三')
    expect(wrapper.emitted('sort-change')?.[2]?.[0]).toEqual({
      prop: null,
      order: null,
    })
  })

  it('appends a second sort column when shift-clicking', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data, multiSort: true },
    })

    await headerLabel(wrapper, '年龄').trigger('click', { shiftKey: true })
    await headerLabel(wrapper, '姓名').trigger('click', { shiftKey: true })
    await nextTick()

    const last = wrapper.emitted('sort-change')?.at(-1)?.[0]
    expect(last).toEqual([
      { prop: 'age', order: 'asc' },
      { prop: 'name', order: 'asc' },
    ])
    const priorities = wrapper
      .findAll('.dan-table__sort-priority')
      .map((item) => item.text())
    expect([...priorities].sort()).toEqual(['1', '2'])
  })

  it('selects and clears all visible rows from the header checkbox', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data, selection: true },
    })
    await nextTick()

    const headerBox = rowCheckboxes(wrapper)[0]!
    ;(headerBox.element as HTMLInputElement).checked = true
    await headerBox.trigger('change')
    await nextTick()

    expect(wrapper.emitted('selection-change')?.[0]?.[0]).toEqual([1, 2, 3])
    expect(
      rowCheckboxes(wrapper)
        .slice(1)
        .every((box) => (box.element as HTMLInputElement).checked),
    ).toBe(true)

    const headerBoxAgain = rowCheckboxes(wrapper)[0]!
    ;(headerBoxAgain.element as HTMLInputElement).checked = false
    await headerBoxAgain.trigger('change')
    await nextTick()
    expect(wrapper.emitted('selection-change')?.at(-1)?.[0]).toEqual([])
  })

  it('keeps selection across data refresh when reserveSelection is set', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data, selection: true, reserveSelection: true },
    })
    await nextTick()

    const firstRowBox = rowCheckboxes(wrapper)[1]!
    ;(firstRowBox.element as HTMLInputElement).checked = true
    await firstRowBox.trigger('change')
    await nextTick()

    await wrapper.setProps({ data: data.map((row) => ({ ...row })) })
    await nextTick()
    expect(
      (rowCheckboxes(wrapper)[1]!.element as HTMLInputElement).checked,
    ).toBe(true)
  })

  it('drops selection on data refresh without reserveSelection', async () => {
    const wrapper = mount(DanTable, {
      props: { columns, data, selection: true },
    })
    await nextTick()

    const firstRowBox = rowCheckboxes(wrapper)[1]!
    ;(firstRowBox.element as HTMLInputElement).checked = true
    await firstRowBox.trigger('change')
    await nextTick()

    await wrapper.setProps({ data: data.map((row) => ({ ...row })) })
    await nextTick()
    expect(
      (rowCheckboxes(wrapper)[1]!.element as HTMLInputElement).checked,
    ).toBe(false)
  })

  it('uses summaryMethod for custom totals', async () => {
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
        summaryMethod: () => ({ amount: '合计 15' }),
      },
    })
    await nextTick()
    expect(wrapper.get('tfoot').text()).toContain('合计 15')
  })

  it('leaves rows untouched in remote filter mode', async () => {
    const wrapper = mount(DanTable, {
      props: {
        columns,
        data,
        filterMode: 'remote',
        filters: { name: '李' },
      },
    })
    await nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)

    const table = wrapper.vm as unknown as {
      setFilterDraft: (prop: string, value: string | null) => void
      confirmFilter: (prop: string) => void
    }
    table.setFilterDraft('name', '李')
    table.confirmFilter('name')
    await nextTick()

    expect(wrapper.emitted('filter-change')?.[0]?.[0]).toEqual({ name: '李' })
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
  })
})
