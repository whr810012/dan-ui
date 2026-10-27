import type { TableColumn } from './types'

export interface TableHeaderCell {
  column: TableColumn
  colspan: number
  rowspan: number
}

export function isLeafColumn(column: TableColumn) {
  return !column.children?.length
}

export function getLeafColumns(columns: TableColumn[]): TableColumn[] {
  const leaves: TableColumn[] = []
  for (const column of columns) {
    if (column.children?.length) {
      leaves.push(...getLeafColumns(column.children))
    } else if (column.prop) {
      leaves.push(column)
    }
  }
  return leaves
}

export function leafCount(column: TableColumn): number {
  if (!column.children?.length) return column.prop ? 1 : 0
  return column.children.reduce((sum, child) => sum + leafCount(child), 0)
}

export function maxDepth(columns: TableColumn[]): number {
  let depth = 1
  for (const column of columns) {
    if (column.children?.length) {
      depth = Math.max(depth, 1 + maxDepth(column.children))
    }
  }
  return depth
}

/** Keep parents only when at least one visible leaf remains. */
export function filterColumnsByVisible(
  columns: TableColumn[],
  visibleProps: Set<string>,
): TableColumn[] {
  const result: TableColumn[] = []
  for (const column of columns) {
    if (column.children?.length) {
      const children = filterColumnsByVisible(column.children, visibleProps)
      if (children.length) {
        result.push({ ...column, children })
      }
    } else if (column.prop && visibleProps.has(column.prop)) {
      result.push(column)
    }
  }
  return result
}

export function buildHeaderRows(columns: TableColumn[]): TableHeaderCell[][] {
  const depth = maxDepth(columns)
  const rows: TableHeaderCell[][] = Array.from({ length: depth }, () => [])

  function walk(list: TableColumn[], level: number) {
    for (const column of list) {
      if (column.children?.length) {
        const span = leafCount(column)
        if (span <= 0) continue
        rows[level].push({ column, colspan: span, rowspan: 1 })
        walk(column.children, level + 1)
      } else if (column.prop) {
        rows[level].push({
          column,
          colspan: 1,
          rowspan: depth - level,
        })
      }
    }
  }

  walk(columns, 0)
  return rows
}
