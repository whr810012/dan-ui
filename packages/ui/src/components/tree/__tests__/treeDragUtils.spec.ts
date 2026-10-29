import { describe, expect, it } from 'vitest'
import { reorderTree } from '../treeDragUtils'
import type { TreeNode } from '../types'

const sample: TreeNode[] = [
  {
    id: 1,
    label: 'A',
    children: [
      { id: 11, label: 'A1' },
      { id: 12, label: 'A2' },
    ],
  },
  { id: 2, label: 'B' },
]

describe('treeDragUtils.reorderTree', () => {
  it('moves node before sibling', () => {
    const next = reorderTree(sample, 12, 11, 'before')
    expect(next?.[0]?.children?.map((n) => n.id)).toEqual([12, 11])
  })

  it('moves node as inner child', () => {
    const next = reorderTree(sample, 2, 1, 'inner')
    expect(next?.map((n) => n.id)).toEqual([1])
    expect(next?.[0]?.children?.map((n) => n.id)).toEqual([11, 12, 2])
  })

  it('rejects dropping into descendant', () => {
    expect(reorderTree(sample, 1, 11, 'inner')).toBeNull()
  })
})
