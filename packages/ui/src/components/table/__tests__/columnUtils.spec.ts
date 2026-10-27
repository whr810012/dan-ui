import { describe, expect, it } from 'vitest'
import {
  buildHeaderRows,
  filterColumnsByVisible,
  getLeafColumns,
  maxDepth,
} from '../columnUtils'
import type { TableColumn } from '../types'

const nested: TableColumn[] = [
  { prop: 'id', label: 'ID' },
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄', sortable: true },
    ],
  },
  {
    label: '联系',
    children: [
      { prop: 'email', label: '邮箱' },
      { prop: 'phone', label: '电话' },
    ],
  },
]

describe('table columnUtils', () => {
  it('flattens leaf columns', () => {
    expect(getLeafColumns(nested).map((c) => c.prop)).toEqual([
      'id',
      'name',
      'age',
      'email',
      'phone',
    ])
  })

  it('builds multi-level header rows with rowspan/colspan', () => {
    expect(maxDepth(nested)).toBe(2)
    const rows = buildHeaderRows(nested)
    expect(rows).toHaveLength(2)
    expect(rows[0].map((c) => [c.column.label, c.colspan, c.rowspan])).toEqual([
      ['ID', 1, 2],
      ['基本信息', 2, 1],
      ['联系', 2, 1],
    ])
    expect(rows[1].map((c) => c.column.prop)).toEqual([
      'name',
      'age',
      'email',
      'phone',
    ])
  })

  it('prunes hidden leaves and empty groups', () => {
    const visible = filterColumnsByVisible(
      nested,
      new Set(['id', 'name', 'phone']),
    )
    expect(getLeafColumns(visible).map((c) => c.prop)).toEqual([
      'id',
      'name',
      'phone',
    ])
    expect(visible[1].label).toBe('基本信息')
    expect(visible[1].children).toHaveLength(1)
  })
})
