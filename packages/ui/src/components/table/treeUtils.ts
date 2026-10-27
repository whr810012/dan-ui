import type { TableRow } from './types'

export interface FlatTreeRow {
  row: TableRow
  depth: number
  key: string | number
  hasChildren: boolean
}

export function getRowChildren(row: TableRow, childrenKey: string): TableRow[] {
  const value = row[childrenKey]
  return Array.isArray(value) ? (value as TableRow[]) : []
}

export function filterTreeRows(
  rows: TableRow[],
  childrenKey: string,
  match: (row: TableRow) => boolean,
): TableRow[] {
  const result: TableRow[] = []
  for (const row of rows) {
    const children = getRowChildren(row, childrenKey)
    const filteredChildren = children.length
      ? filterTreeRows(children, childrenKey, match)
      : []
    if (match(row) || filteredChildren.length) {
      result.push(
        filteredChildren.length
          ? { ...row, [childrenKey]: filteredChildren }
          : { ...row },
      )
    }
  }
  return result
}

export function sortTreeRows(
  rows: TableRow[],
  childrenKey: string,
  compare: (a: TableRow, b: TableRow) => number,
): TableRow[] {
  const sorted = [...rows].sort(compare)
  return sorted.map((row) => {
    const children = getRowChildren(row, childrenKey)
    if (!children.length) return row
    return {
      ...row,
      [childrenKey]: sortTreeRows(children, childrenKey, compare),
    }
  })
}

export function flattenTreeRows(
  rows: TableRow[],
  childrenKey: string,
  expandedKeys: Set<string | number>,
  getKey: (
    row: TableRow,
    index: number,
    parents: TableRow[],
  ) => string | number,
  parents: TableRow[] = [],
): FlatTreeRow[] {
  const result: FlatTreeRow[] = []
  rows.forEach((row, index) => {
    const key = getKey(row, index, parents)
    const children = getRowChildren(row, childrenKey)
    const hasChildren = children.length > 0
    result.push({
      row,
      depth: parents.length,
      key,
      hasChildren,
    })
    if (hasChildren && expandedKeys.has(key)) {
      result.push(
        ...flattenTreeRows(children, childrenKey, expandedKeys, getKey, [
          ...parents,
          row,
        ]),
      )
    }
  })
  return result
}

export function collectAllKeys(
  rows: TableRow[],
  childrenKey: string,
  getKey: (
    row: TableRow,
    index: number,
    parents: TableRow[],
  ) => string | number,
  parents: TableRow[] = [],
): Array<string | number> {
  const keys: Array<string | number> = []
  rows.forEach((row, index) => {
    const key = getKey(row, index, parents)
    const children = getRowChildren(row, childrenKey)
    if (children.length) {
      keys.push(key)
      keys.push(
        ...collectAllKeys(children, childrenKey, getKey, [...parents, row]),
      )
    }
  })
  return keys
}
