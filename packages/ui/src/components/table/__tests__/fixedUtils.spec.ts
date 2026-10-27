import { describe, expect, it } from 'vitest'
import { buildFixedLeafMeta, fixedStyleFromMeta } from '../fixedUtils'
import type { TableColumn } from '../types'

describe('fixedUtils', () => {
  const columns: TableColumn[] = [
    { prop: 'name', label: '姓名', width: 100, fixed: 'left' },
    { prop: 'age', label: '年龄', width: 80 },
    { prop: 'city', label: '城市', width: 120 },
    { prop: 'action', label: '操作', width: 90, fixed: 'right' },
  ]

  it('computes left/right offsets for fixed leaves', () => {
    const metas = buildFixedLeafMeta(columns)
    expect(metas.find((m) => m.prop === 'name')).toMatchObject({
      fixed: 'left',
      left: 0,
      isLastLeft: true,
    })
    expect(metas.find((m) => m.prop === 'action')).toMatchObject({
      fixed: 'right',
      right: 0,
      isFirstRight: true,
    })
  })

  it('stacks multiple left fixed columns', () => {
    const cols: TableColumn[] = [
      { prop: 'a', label: 'A', width: 50, fixed: 'left' },
      { prop: 'b', label: 'B', width: 60, fixed: 'left' },
      { prop: 'c', label: 'C', width: 70 },
    ]
    const metas = buildFixedLeafMeta(cols)
    expect(metas.find((m) => m.prop === 'a')?.left).toBe(0)
    expect(metas.find((m) => m.prop === 'b')).toMatchObject({
      left: 50,
      isLastLeft: true,
    })
  })

  it('builds sticky style', () => {
    const style = fixedStyleFromMeta({
      prop: 'name',
      fixed: 'left',
      left: 20,
    })
    expect(style).toMatchObject({
      position: 'sticky',
      left: '20px',
    })
  })
})
