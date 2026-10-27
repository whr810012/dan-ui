import { describe, expect, it } from 'vitest'
import { collectAllKeys, filterTreeRows, flattenTreeRows } from '../treeUtils'
import type { TableRow } from '../types'

const data: TableRow[] = [
  {
    id: 1,
    name: '总部',
    children: [
      { id: 11, name: '研发' },
      {
        id: 12,
        name: '市场',
        children: [{ id: 121, name: '华东' }],
      },
    ],
  },
  { id: 2, name: '分公司' },
]

function getKey(row: TableRow) {
  return row.id as number
}

describe('table treeUtils', () => {
  it('flattens only expanded branches', () => {
    const flat = flattenTreeRows(data, 'children', new Set([1]), (row) =>
      getKey(row),
    )
    expect(flat.map((item) => item.key)).toEqual([1, 11, 12, 2])
    expect(flat.find((item) => item.key === 12)?.hasChildren).toBe(true)
  })

  it('filters keeping ancestors of matches', () => {
    const filtered = filterTreeRows(data, 'children', (row) =>
      String(row.name).includes('华东'),
    )
    expect(filtered).toHaveLength(1)
    expect((filtered[0].children as TableRow[])[0].name).toBe('市场')
  })

  it('collects expandable keys', () => {
    expect(collectAllKeys(data, 'children', (row) => getKey(row))).toEqual([
      1, 12,
    ])
  })
})
