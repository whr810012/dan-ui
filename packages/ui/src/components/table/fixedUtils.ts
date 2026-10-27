import type { TableColumn } from './types'

export interface FixedLeafMeta {
  prop: string
  fixed?: 'left' | 'right'
  left?: number
  right?: number
  isLastLeft?: boolean
  isFirstRight?: boolean
}

function resolveWidth(col: TableColumn): number {
  if (typeof col.width === 'number') return col.width
  if (typeof col.width === 'string') {
    const n = Number.parseInt(col.width, 10)
    if (Number.isFinite(n)) return n
  }
  if (typeof col.minWidth === 'number') return col.minWidth
  if (typeof col.minWidth === 'string') {
    const n = Number.parseInt(col.minWidth, 10)
    if (Number.isFinite(n)) return n
  }
  return 120
}

/** 按可见叶列计算左右固定偏移 */
export function buildFixedLeafMeta(leaves: TableColumn[]): FixedLeafMeta[] {
  const metas: FixedLeafMeta[] = leaves
    .filter((col): col is TableColumn & { prop: string } => Boolean(col.prop))
    .map((col) => ({
      prop: col.prop,
      fixed: col.fixed,
    }))

  let left = 0
  const leftCols = metas.filter((m) => m.fixed === 'left')
  leftCols.forEach((meta, index) => {
    const col = leaves.find((c) => c.prop === meta.prop)!
    meta.left = left
    left += resolveWidth(col)
    meta.isLastLeft = index === leftCols.length - 1
  })

  let right = 0
  const rightCols = metas.filter((m) => m.fixed === 'right')
  for (let i = rightCols.length - 1; i >= 0; i--) {
    const meta = rightCols[i]!
    const col = leaves.find((c) => c.prop === meta.prop)!
    meta.right = right
    right += resolveWidth(col)
    meta.isFirstRight = i === 0
  }

  return metas
}

export function fixedStyleFromMeta(
  meta?: FixedLeafMeta,
): Record<string, string> | undefined {
  if (!meta?.fixed) return undefined
  const style: Record<string, string> = { position: 'sticky', zIndex: '3' }
  if (meta.fixed === 'left' && meta.left != null) {
    style.left = `${meta.left}px`
  }
  if (meta.fixed === 'right' && meta.right != null) {
    style.right = `${meta.right}px`
  }
  return style
}
