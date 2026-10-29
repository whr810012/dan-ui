<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import { DanCheckbox } from '../checkbox'
import { DanDropdown, DanDropdownMenu } from '../dropdown'
import { DanEmpty } from '../empty'
import { DanIcon } from '../icon'
import { DanInput } from '../input'
import { DanPopover } from '../popover'
import { DanSelect } from '../select'
import {
  buildHeaderRows,
  filterColumnsByVisible,
  getLeafColumns,
} from './columnUtils'
import {
  collectAllKeys,
  filterTreeRows,
  flattenTreeRows,
  sortTreeRows,
} from './treeUtils'
import { buildFixedLeafMeta, fixedStyleFromMeta } from './fixedUtils'
import type {
  TableColumn,
  TableColumnFilter,
  TableFilters,
  TableRow,
  TableSortItem,
  TableSortOrder,
  TableSortState,
} from './types'
import './style.css'

defineOptions({ name: 'DanTable' })

const props = withDefaults(
  defineProps<{
    data?: TableRow[]
    columns?: TableColumn[]
    rowKey?: string | ((row: TableRow, index: number) => string | number)
    border?: boolean
    stripe?: boolean
    emptyText?: string
    /** 显示列设置入口，默认自动：存在 hideable 列时开启 */
    showColumnSettings?: boolean
    /** 受控筛选条件 */
    filters?: TableFilters
    /** 受控可见列 prop 列表 */
    visibleColumns?: string[]
    /** local：组件内过滤；remote：只抛事件，不过滤 */
    filterMode?: 'local' | 'remote'
    /** 启用树形数据（行内 children） */
    tree?: boolean
    /** 树子节点字段名 */
    treeChildren?: string
    /** 默认展开全部 */
    defaultExpandAll?: boolean
    /** 受控展开行 key */
    expandRowKeys?: Array<string | number>
    /** 每级缩进（px） */
    indent?: number
    /** 启用虚拟滚动（定高行） */
    virtual?: boolean
    /** 虚拟滚动容器高度 */
    height?: number | string
    /** 虚拟行高（px） */
    rowHeight?: number
    /** 视口外缓冲行数 */
    virtualBuffer?: number
    /** 行多选 */
    selection?: boolean
    /** 受控选中行 key */
    selectedRowKeys?: Array<string | number>
    /** 数据刷新后保留选中（仅非受控） */
    reserveSelection?: boolean
    /** 内容展开行（与 tree 展开列分开） */
    expandable?: boolean
    /** 受控内容展开行 key */
    expandedRowKeys?: Array<string | number>
    /** 显示合计行 */
    showSummary?: boolean
    /** 自定义合计；默认对 number 列求和 */
    summaryMethod?: (param: {
      columns: TableColumn[]
      data: TableRow[]
    }) => Record<string, string>
    /** 行拖拽排序（树表不支持） */
    rowDraggable?: boolean
    /** 加载中遮罩 */
    loading?: boolean
    /** 多列排序（Shift+点击表头追加） */
    multiSort?: boolean
  }>(),
  {
    data: () => [],
    columns: () => [],
    rowKey: 'id',
    border: false,
    stripe: false,
    emptyText: undefined,
    showColumnSettings: undefined,
    filters: undefined,
    visibleColumns: undefined,
    filterMode: 'local',
    tree: false,
    treeChildren: 'children',
    defaultExpandAll: false,
    expandRowKeys: undefined,
    indent: 16,
    virtual: false,
    height: 400,
    rowHeight: 48,
    virtualBuffer: 5,
    selection: false,
    selectedRowKeys: undefined,
    reserveSelection: false,
    expandable: false,
    expandedRowKeys: undefined,
    showSummary: false,
    summaryMethod: undefined,
    rowDraggable: false,
    loading: false,
    multiSort: false,
  },
)

const emit = defineEmits<{
  'update:filters': [value: TableFilters]
  'filter-change': [value: TableFilters]
  'update:visibleColumns': [value: string[]]
  'column-visibility-change': [value: string[]]
  'sort-change': [value: TableSortState | TableSortItem[]]
  'export-csv': [csv: string]
  'update:expandRowKeys': [value: Array<string | number>]
  'expand-change': [row: TableRow, expanded: boolean]
  'update:selectedRowKeys': [value: Array<string | number>]
  'selection-change': [keys: Array<string | number>, rows: TableRow[]]
  'update:expandedRowKeys': [value: Array<string | number>]
  'expandable-change': [row: TableRow, expanded: boolean]
  'cell-edit': [
    payload: {
      row: TableRow
      prop: string
      value: unknown
      index: number
    },
  ]
  'column-drag-end': [props: string[]]
  'column-resize-end': [payload: { prop: string; width: number }]
  'row-drag-end': [
    payload: {
      from: number
      to: number
      keys: Array<string | number>
    },
  ]
}>()

const SELECTION_COL_WIDTH = 48
const EXPANDABLE_COL_WIDTH = 48
const ROW_DRAG_COL_WIDTH = 36

const ns = useNamespace('table')
const { t } = useLocale()
const resolvedEmptyText = computed(
  () => props.emptyText ?? t('table.emptyText'),
)

const innerFilters = ref<TableFilters>({})
const innerVisible = ref<string[]>([])
const innerExpandKeys = ref<Array<string | number>>([])
const innerSelectedKeys = ref<Array<string | number>>([])
const innerContentExpandKeys = ref<Array<string | number>>([])
const sortState = ref<TableSortState>({ prop: null, order: null })
const multiSortState = ref<TableSortItem[]>([])
const scrollTop = ref(0)
const columnOrder = ref<string[]>([])
const editingCell = ref<{ key: string | number; prop: string } | null>(null)
const editingValue = ref('')
const dragProp = ref<string | null>(null)
const columnWidths = ref<Record<string, number>>({})
const resizing = ref<{ prop: string; startX: number; startW: number } | null>(
  null,
)
const dragRowKey = ref<string | number | null>(null)

const canReorderColumns = computed(
  () => !props.columns.some((col) => col.children?.length),
)
const canDragRows = computed(() => props.rowDraggable && !props.tree)

const isFiltersControlled = computed(() => props.filters !== undefined)
const isVisibleControlled = computed(() => props.visibleColumns !== undefined)
const isExpandControlled = computed(() => props.expandRowKeys !== undefined)
const isSelectionControlled = computed(
  () => props.selectedRowKeys !== undefined,
)
const isContentExpandControlled = computed(
  () => props.expandedRowKeys !== undefined,
)

const resolvedFilters = computed(() =>
  isFiltersControlled.value ? (props.filters ?? {}) : innerFilters.value,
)

const allLeafColumns = computed(() => getLeafColumns(props.columns))

function defaultVisibleProps() {
  return allLeafColumns.value
    .filter((col) => col.visible !== false && col.prop)
    .map((col) => col.prop as string)
}

watch(
  () => props.columns,
  () => {
    if (!isVisibleControlled.value) {
      const next = defaultVisibleProps()
      if (!innerVisible.value.length) {
        innerVisible.value = next
      } else {
        const allowed = new Set(
          allLeafColumns.value
            .map((c) => c.prop)
            .filter((p): p is string => Boolean(p)),
        )
        const kept = innerVisible.value.filter((p) => allowed.has(p))
        const added = next.filter((p) => !innerVisible.value.includes(p))
        innerVisible.value = [...kept, ...added]
      }
    }
  },
  { immediate: true, deep: true },
)

const resolvedVisibleProps = computed(() =>
  isVisibleControlled.value
    ? (props.visibleColumns ?? defaultVisibleProps())
    : innerVisible.value,
)

const displayColumnTree = computed(() =>
  filterColumnsByVisible(props.columns, new Set(resolvedVisibleProps.value)),
)

const displayColumns = computed(() => {
  const leaves = getLeafColumns(displayColumnTree.value)
  if (!columnOrder.value.length) return leaves
  const map = new Map(
    leaves
      .filter((col) => col.prop)
      .map((col) => [col.prop as string, col] as const),
  )
  const ordered: TableColumn[] = []
  for (const prop of columnOrder.value) {
    const col = map.get(prop)
    if (col) {
      ordered.push(col)
      map.delete(prop)
    }
  }
  for (const col of map.values()) ordered.push(col)
  return ordered
})

watch(
  () => displayColumnTree.value,
  () => {
    const leaves = getLeafColumns(displayColumnTree.value)
      .map((col) => col.prop)
      .filter((prop): prop is string => Boolean(prop))
    if (!columnOrder.value.length) {
      columnOrder.value = leaves
      return
    }
    const set = new Set(leaves)
    const kept = columnOrder.value.filter((prop) => set.has(prop))
    const added = leaves.filter((prop) => !kept.includes(prop))
    columnOrder.value = [...kept, ...added]
  },
  { immediate: true, deep: true },
)

const columnsForLayout = computed(() =>
  displayColumns.value.map((col) => {
    if (!col.prop || columnWidths.value[col.prop] == null) return col
    return { ...col, width: columnWidths.value[col.prop] }
  }),
)
const fixedMetaList = computed(() => buildFixedLeafMeta(columnsForLayout.value))

const fixedMetaMap = computed(() => {
  const map = new Map<string, (typeof fixedMetaList.value)[number]>()
  for (const meta of fixedMetaList.value) map.set(meta.prop, meta)
  return map
})

const hasFixedColumns = computed(() =>
  fixedMetaList.value.some((m) => m.fixed === 'left' || m.fixed === 'right'),
)

function leafFixedClass(prop?: string) {
  if (!prop) return []
  const meta = fixedMetaMap.value.get(prop)
  if (!meta?.fixed) return []
  return [
    ns.is(`fixed-${meta.fixed}`, true),
    meta.isLastLeft ? ns.is('fixed-left-last', true) : '',
    meta.isFirstRight ? ns.is('fixed-right-first', true) : '',
  ]
}

const leadingOffset = computed(() => {
  let offset = 0
  if (canDragRows.value) offset += ROW_DRAG_COL_WIDTH
  if (props.selection) offset += SELECTION_COL_WIDTH
  if (props.expandable) offset += EXPANDABLE_COL_WIDTH
  return offset
})

function leafFixedStyle(prop?: string) {
  if (!prop) return undefined
  const style = fixedStyleFromMeta(fixedMetaMap.value.get(prop))
  if (!style?.left) return style
  const left = Number.parseInt(style.left, 10) + leadingOffset.value
  return { ...style, left: `${left}px` }
}

function rowDragCellStyle(): Record<string, string> | undefined {
  if (!canDragRows.value) return undefined
  if (!hasFixedColumns.value && !props.selection && !props.expandable) {
    return undefined
  }
  return {
    position: 'sticky',
    left: '0px',
    zIndex: '5',
  }
}

function selectionCellStyle(): Record<string, string> | undefined {
  if (!props.selection) return undefined
  if (!hasFixedColumns.value && !props.expandable && !canDragRows.value) {
    return undefined
  }
  return {
    position: 'sticky',
    left: canDragRows.value ? `${ROW_DRAG_COL_WIDTH}px` : '0px',
    zIndex: '5',
  }
}

function expandableCellStyle(): Record<string, string> | undefined {
  if (!props.expandable) return undefined
  if (!hasFixedColumns.value && !props.selection && !canDragRows.value) {
    return undefined
  }
  let left = 0
  if (canDragRows.value) left += ROW_DRAG_COL_WIDTH
  if (props.selection) left += SELECTION_COL_WIDTH
  return {
    position: 'sticky',
    left: `${left}px`,
    zIndex: '5',
  }
}

const tableColSpan = computed(() => {
  let n = displayColumns.value.length
  if (canDragRows.value) n += 1
  if (props.selection) n += 1
  if (props.expandable) n += 1
  return n || 1
})

const headerRows = computed(() => buildHeaderRows(displayColumnTree.value))

const showSettings = computed(() => {
  if (props.showColumnSettings != null) return props.showColumnSettings
  return allLeafColumns.value.some((col) => col.hideable !== false)
})

const hideableColumns = computed(() =>
  allLeafColumns.value.filter((col) => col.hideable !== false && col.prop),
)

function resolveFilterConfig(col: TableColumn): TableColumnFilter | null {
  if (!col.filterable) return null
  if (col.filterable === true) return { type: 'text' }
  return {
    type: col.filterable.type ?? 'text',
    options: col.filterable.options,
  }
}

function getRowKey(row: TableRow, index: number) {
  if (typeof props.rowKey === 'function') return props.rowKey(row, index)
  const key = row[props.rowKey]
  return key == null ? index : (key as string | number)
}

function resolveTreeKey(row: TableRow, index: number, _parents: TableRow[]) {
  return getRowKey(row, index)
}

watch(
  () =>
    [
      props.data,
      props.tree,
      props.defaultExpandAll,
      props.treeChildren,
    ] as const,
  () => {
    if (!props.tree || isExpandControlled.value) return
    if (props.defaultExpandAll) {
      innerExpandKeys.value = collectAllKeys(
        props.data,
        props.treeChildren,
        resolveTreeKey,
      )
    }
  },
  { immediate: true, deep: true },
)

const resolvedExpandKeys = computed(() =>
  isExpandControlled.value
    ? (props.expandRowKeys ?? [])
    : innerExpandKeys.value,
)

const expandedKeySet = computed(() => new Set(resolvedExpandKeys.value))

function setExpandKeys(next: Array<string | number>) {
  if (isExpandControlled.value) {
    emit('update:expandRowKeys', next)
  } else {
    innerExpandKeys.value = next
  }
}

function toggleExpand(row: TableRow, key: string | number) {
  const set = new Set(resolvedExpandKeys.value)
  const expanded = !set.has(key)
  if (expanded) set.add(key)
  else set.delete(key)
  setExpandKeys([...set])
  emit('expand-change', row, expanded)
}

function matchRowFilters(row: TableRow) {
  const filters = resolvedFilters.value
  for (const col of allLeafColumns.value) {
    if (!col.prop) continue
    const config = resolveFilterConfig(col)
    if (!config) continue
    const raw = filters[col.prop]
    if (raw == null || raw === '') continue
    const text = cellText(row, col.prop)
    if (config.type === 'select') {
      if (text !== String(raw)) return false
    } else if (!text.toLowerCase().includes(String(raw).toLowerCase())) {
      return false
    }
  }
  return true
}

function compareByProp(
  a: TableRow,
  b: TableRow,
  prop: string,
  order: 'asc' | 'desc',
) {
  const av = a[prop]
  const bv = b[prop]
  if (av == null && bv == null) return 0
  if (av == null) return 1
  if (bv == null) return -1
  if (typeof av === 'number' && typeof bv === 'number') {
    return order === 'asc' ? av - bv : bv - av
  }
  const as = String(av)
  const bs = String(bv)
  return order === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
}

function compareRows(a: TableRow, b: TableRow) {
  if (props.multiSort && multiSortState.value.length) {
    for (const item of multiSortState.value) {
      const result = compareByProp(a, b, item.prop, item.order)
      if (result !== 0) return result
    }
    return 0
  }
  const { prop, order } = sortState.value
  if (!prop || !order) return 0
  return compareByProp(a, b, prop, order)
}

function cellText(row: TableRow, prop: string) {
  const value = row[prop]
  return value == null ? '' : String(value)
}

function isEditing(rowKey: string | number, prop: string) {
  return (
    editingCell.value?.key === rowKey && editingCell.value.prop === prop
  )
}

function startEdit(row: TableRow, prop: string, index: number) {
  const col = displayColumns.value.find((item) => item.prop === prop)
  if (!col?.editable) return
  const key = getRowKey(row, index)
  editingCell.value = { key, prop }
  editingValue.value = cellText(row, prop)
}

function commitEdit(row: TableRow, prop: string, index: number) {
  if (!editingCell.value) return
  const value = editingValue.value
  editingCell.value = null
  emit('cell-edit', { row, prop, value, index })
}

function cancelEdit() {
  editingCell.value = null
}

function onColumnDragStart(prop: string | undefined, event: DragEvent) {
  if (!prop || !canReorderColumns.value) {
    event.preventDefault()
    return
  }
  const col = displayColumns.value.find((item) => item.prop === prop)
  if (!col || col.fixed || col.draggable === false) {
    event.preventDefault()
    return
  }
  dragProp.value = prop
  event.dataTransfer?.setData('text/plain', prop)
}

function onColumnDrop(targetProp: string | undefined, event: DragEvent) {
  event.preventDefault()
  const from = dragProp.value || event.dataTransfer?.getData('text/plain')
  dragProp.value = null
  if (!from || !targetProp || from === targetProp || !canReorderColumns.value) {
    return
  }
  const targetCol = displayColumns.value.find((item) => item.prop === targetProp)
  if (targetCol?.fixed) return
  const next = [...columnOrder.value]
  const fromIndex = next.indexOf(from)
  const toIndex = next.indexOf(targetProp)
  if (fromIndex < 0 || toIndex < 0) return
  next.splice(fromIndex, 1)
  next.splice(toIndex, 0, from)
  columnOrder.value = next
  emit('column-drag-end', next)
}

function resolveColumnPixelWidth(col: TableColumn): number {
  if (col.prop && columnWidths.value[col.prop] != null) {
    return columnWidths.value[col.prop]!
  }
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

function canResizeColumn(col: TableColumn) {
  return Boolean(col.prop) && !col.children?.length && col.resizable !== false
}

function onColumnResizeStart(prop: string | undefined, event: MouseEvent) {
  if (!prop) return
  const col = displayColumns.value.find((item) => item.prop === prop)
  if (!col || !canResizeColumn(col)) return
  event.preventDefault()
  event.stopPropagation()
  const startW = resolveColumnPixelWidth(col)
  resizing.value = { prop, startX: event.clientX, startW }
  const onMove = (moveEvent: MouseEvent) => {
    if (!resizing.value) return
    const next = Math.max(
      48,
      resizing.value.startW + (moveEvent.clientX - resizing.value.startX),
    )
    columnWidths.value = {
      ...columnWidths.value,
      [resizing.value.prop]: next,
    }
  }
  const onUp = () => {
    if (resizing.value) {
      const width = columnWidths.value[resizing.value.prop] ?? startW
      emit('column-resize-end', { prop: resizing.value.prop, width })
    }
    resizing.value = null
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function onRowDragStart(key: string | number, event: DragEvent) {
  if (!canDragRows.value) {
    event.preventDefault()
    return
  }
  dragRowKey.value = key
  event.dataTransfer?.setData('text/plain', String(key))
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

function onRowDrop(targetKey: string | number, event: DragEvent) {
  event.preventDefault()
  const fromKey = dragRowKey.value ?? event.dataTransfer?.getData('text/plain')
  dragRowKey.value = null
  if (fromKey == null || !canDragRows.value) return
  const keys = displayRows.value.map((item) => item.key)
  const from = keys.findIndex((key) => String(key) === String(fromKey))
  const to = keys.findIndex((key) => String(key) === String(targetKey))
  if (from < 0 || to < 0 || from === to) return
  const next = [...keys]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved!)
  emit('row-drag-end', { from, to, keys: next })
}

function setFilter(prop: string, value: string | number | null) {
  const next = { ...resolvedFilters.value, [prop]: value }
  if (value == null || value === '') delete next[prop]
  if (isFiltersControlled.value) {
    emit('update:filters', next)
  } else {
    innerFilters.value = next
  }
  emit('filter-change', next)
}

function clearFilter(prop: string) {
  setFilter(prop, null)
}

function isColumnVisible(prop: string) {
  return resolvedVisibleProps.value.includes(prop)
}

function setColumnVisible(prop: string, visible: boolean) {
  const current = [...resolvedVisibleProps.value]
  const index = current.indexOf(prop)
  if (visible && index < 0) {
    const order = allLeafColumns.value
      .map((c) => c.prop)
      .filter((p): p is string => Boolean(p))
    current.push(prop)
    current.sort((a, b) => order.indexOf(a) - order.indexOf(b))
  }
  if (!visible && index >= 0) {
    if (current.length <= 1) return
    current.splice(index, 1)
  }
  if (isVisibleControlled.value) {
    emit('update:visibleColumns', current)
  } else {
    innerVisible.value = current
  }
  emit('column-visibility-change', current)
}

function toggleSort(col: TableColumn, event?: MouseEvent) {
  if (!col.sortable || !col.prop) return
  const prop = col.prop

  if (props.multiSort && event?.shiftKey) {
    const next = [...multiSortState.value]
    const index = next.findIndex((item) => item.prop === prop)
    if (index < 0) {
      next.push({ prop, order: 'asc' })
    } else if (next[index]!.order === 'asc') {
      next[index] = { prop, order: 'desc' }
    } else {
      next.splice(index, 1)
    }
    multiSortState.value = next
    sortState.value = next[0]
      ? { prop: next[0].prop, order: next[0].order }
      : { prop: null, order: null }
    emit('sort-change', [...next])
    return
  }

  let order: TableSortOrder = 'asc'
  if (props.multiSort) {
    const current = multiSortState.value.find((item) => item.prop === prop)
    if (!current) order = 'asc'
    else if (current.order === 'asc') order = 'desc'
    else order = null
    multiSortState.value = order ? [{ prop, order }] : []
    sortState.value = { prop: order ? prop : null, order }
    emit('sort-change', order ? [{ prop, order }] : [])
    return
  }

  if (sortState.value.prop === prop) {
    if (sortState.value.order === 'asc') order = 'desc'
    else if (sortState.value.order === 'desc') order = null
    else order = 'asc'
  }
  sortState.value = {
    prop: order ? prop : null,
    order,
  }
  multiSortState.value = order ? [{ prop, order }] : []
  emit('sort-change', { ...sortState.value })
}

function sortPriority(prop?: string) {
  if (!prop || !props.multiSort) return 0
  const index = multiSortState.value.findIndex((item) => item.prop === prop)
  return index >= 0 ? index + 1 : 0
}

function sortOrderOf(prop?: string): TableSortOrder {
  if (!prop) return null
  if (props.multiSort) {
    return multiSortState.value.find((item) => item.prop === prop)?.order ?? null
  }
  return sortState.value.prop === prop ? sortState.value.order : null
}

function escapeCsvCell(value: unknown) {
  const text = value == null ? '' : String(value)
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

function exportCsv() {
  const cols = displayColumns.value.filter((col) => col.prop)
  const header = cols.map((col) => escapeCsvCell(col.label)).join(',')
  const lines = displayRows.value.map(({ row }) =>
    cols.map((col) => escapeCsvCell(row[col.prop!])).join(','),
  )
  const csv = [header, ...lines].join('\n')
  emit('export-csv', csv)
  return csv
}

function exportData() {
  return displayRows.value.map(({ row }) => ({ ...row }))
}

defineExpose({
  exportCsv,
  exportData,
})

const processedTree = computed(() => {
  let rows = props.data
  if (props.filterMode === 'local') {
    rows = props.tree
      ? filterTreeRows(rows, props.treeChildren, matchRowFilters)
      : rows.filter((row) => matchRowFilters(row))
  }
  const hasSort = props.multiSort
    ? multiSortState.value.length > 0
    : Boolean(sortState.value.prop && sortState.value.order)
  if (!hasSort) return rows
  return props.tree
    ? sortTreeRows(rows, props.treeChildren, compareRows)
    : [...rows].sort(compareRows)
})

const displayRows = computed(() => {
  if (!props.tree) {
    return processedTree.value.map((row, index) => ({
      row,
      depth: 0,
      key: getRowKey(row, index),
      hasChildren: false,
      index,
    }))
  }
  return flattenTreeRows(
    processedTree.value,
    props.treeChildren,
    expandedKeySet.value,
    resolveTreeKey,
  ).map((item, index) => ({ ...item, index }))
})

const resolvedSelectedKeys = computed(() =>
  isSelectionControlled.value
    ? (props.selectedRowKeys ?? [])
    : innerSelectedKeys.value,
)

const selectedKeySet = computed(() => new Set(resolvedSelectedKeys.value))

function setSelectedKeys(next: Array<string | number>) {
  if (isSelectionControlled.value) {
    emit('update:selectedRowKeys', next)
  } else {
    innerSelectedKeys.value = next
  }
  const keySet = new Set(next)
  const rows = displayRows.value
    .filter((item) => keySet.has(item.key))
    .map((item) => item.row)
  emit('selection-change', next, rows)
}

function isRowSelected(key: string | number) {
  return selectedKeySet.value.has(key)
}

function toggleRowSelection(key: string | number, checked: boolean) {
  const set = new Set(resolvedSelectedKeys.value)
  if (checked) set.add(key)
  else set.delete(key)
  setSelectedKeys([...set])
}

const visibleRowKeys = computed(() => displayRows.value.map((item) => item.key))

const allVisibleSelected = computed(() => {
  const keys = visibleRowKeys.value
  return keys.length > 0 && keys.every((k) => selectedKeySet.value.has(k))
})

const someVisibleSelected = computed(() => {
  const keys = visibleRowKeys.value
  const count = keys.filter((k) => selectedKeySet.value.has(k)).length
  return count > 0 && count < keys.length
})

function toggleSelectAll(checked: boolean) {
  if (checked) {
    const merged = new Set(resolvedSelectedKeys.value)
    for (const key of visibleRowKeys.value) merged.add(key)
    setSelectedKeys([...merged])
  } else {
    const visible = new Set(visibleRowKeys.value)
    setSelectedKeys(resolvedSelectedKeys.value.filter((k) => !visible.has(k)))
  }
}

watch(
  () => props.data,
  () => {
    if (isSelectionControlled.value || props.reserveSelection) return
    innerSelectedKeys.value = []
  },
)

const resolvedContentExpandKeys = computed(() =>
  isContentExpandControlled.value
    ? (props.expandedRowKeys ?? [])
    : innerContentExpandKeys.value,
)

const contentExpandKeySet = computed(
  () => new Set(resolvedContentExpandKeys.value),
)

function setContentExpandKeys(next: Array<string | number>) {
  if (isContentExpandControlled.value) {
    emit('update:expandedRowKeys', next)
  } else {
    innerContentExpandKeys.value = next
  }
}

function toggleContentExpand(row: TableRow, key: string | number) {
  const set = new Set(resolvedContentExpandKeys.value)
  const expanded = !set.has(key)
  if (expanded) set.add(key)
  else set.delete(key)
  setContentExpandKeys([...set])
  emit('expandable-change', row, expanded)
}

const summaryCells = computed(() => {
  if (!props.showSummary) return {} as Record<string, string>
  const cols = displayColumns.value
  const data = processedTree.value
  if (props.summaryMethod) {
    return props.summaryMethod({ columns: cols, data })
  }
  const result: Record<string, string> = {}
  for (const col of cols) {
    if (!col.prop) continue
    let sum = 0
    let count = 0
    for (const row of data) {
      const v = row[col.prop]
      if (typeof v === 'number' && Number.isFinite(v)) {
        sum += v
        count += 1
      }
    }
    if (count) result[col.prop] = String(sum)
  }
  return result
})

const treeColumnProp = computed(() => displayColumns.value[0]?.prop)

const isEmpty = computed(() => displayRows.value.length === 0)

const viewportHeight = computed(() => {
  if (typeof props.height === 'number') return props.height
  const parsed = Number.parseInt(String(props.height), 10)
  return Number.isFinite(parsed) ? parsed : 400
})

const wrapperStyle = computed(() => {
  if (!props.virtual) return undefined
  const h =
    typeof props.height === 'number'
      ? `${props.height}px`
      : String(props.height)
  return { maxHeight: h, height: h }
})

const virtualState = computed(() => {
  if (!props.virtual) {
    return {
      enabled: false,
      rows: displayRows.value,
      topPad: 0,
      bottomPad: 0,
      colSpan: tableColSpan.value,
    }
  }
  const total = displayRows.value.length
  const rh = props.rowHeight
  const buffer = props.virtualBuffer
  const visibleCount = Math.ceil(viewportHeight.value / rh) + buffer * 2
  const start = Math.max(0, Math.floor(scrollTop.value / rh) - buffer)
  const end = Math.min(total, start + visibleCount)
  return {
    enabled: true,
    rows: displayRows.value.slice(start, end),
    topPad: start * rh,
    bottomPad: Math.max(0, (total - end) * rh),
    colSpan: tableColSpan.value,
  }
})

function onWrapperScroll(event: Event) {
  if (!props.virtual) return
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

function colWidth(col: TableColumn) {
  if (col.prop && columnWidths.value[col.prop] != null) {
    return `${columnWidths.value[col.prop]}px`
  }
  if (col.width == null) return undefined
  return typeof col.width === 'number' ? `${col.width}px` : col.width
}

function colMinWidth(col: TableColumn) {
  if (col.minWidth == null) return undefined
  return typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('border', border),
      ns.is('stripe', stripe),
      ns.is('empty', isEmpty),
      ns.is('tree', tree),
      ns.is('virtual', virtual),
      ns.is('fixed', hasFixedColumns),
      ns.is('loading', loading),
    ]"
  >
    <div v-if="loading" :class="ns.e('loading')">
      <slot name="loading">{{ t('table.loading') }}</slot>
    </div>
    <div v-if="showSettings" :class="ns.e('toolbar')">
      <DanDropdown trigger="click" :hide-on-click="false" placement="bottom">
        <button type="button" :class="ns.e('settings-btn')">
          <DanIcon name="setting" :size="14" />
          {{ t('table.columnSettings') }}
        </button>
        <template #dropdown>
          <DanDropdownMenu>
            <li
              v-for="col in hideableColumns"
              :key="col.prop"
              :class="ns.e('settings-item')"
              @click.stop
            >
              <DanCheckbox
                :model-value="isColumnVisible(col.prop!)"
                @update:model-value="
                  (val) => setColumnVisible(col.prop!, Boolean(val))
                "
              >
                {{ col.label }}
              </DanCheckbox>
            </li>
          </DanDropdownMenu>
        </template>
      </DanDropdown>
    </div>

    <div
      :class="[ns.e('wrapper'), ns.is('virtual', virtual)]"
      :style="wrapperStyle"
      @scroll="onWrapperScroll"
    >
      <table :class="ns.e('table')">
        <colgroup>
          <col
            v-if="canDragRows"
            :style="{ width: `${ROW_DRAG_COL_WIDTH}px` }"
          />
          <col
            v-if="selection"
            :style="{ width: `${SELECTION_COL_WIDTH}px` }"
          />
          <col
            v-if="expandable"
            :style="{ width: `${EXPANDABLE_COL_WIDTH}px` }"
          />
          <col
            v-for="col in displayColumns"
            :key="col.prop"
            :style="{
              width: colWidth(col),
              minWidth: colMinWidth(col),
            }"
          />
        </colgroup>
        <thead>
          <tr v-for="(row, rowIndex) in headerRows" :key="rowIndex">
            <th
              v-if="canDragRows && rowIndex === 0"
              :class="[
                ns.e('cell'),
                ns.e('header-cell'),
                ns.e('drag-cell'),
                hasFixedColumns || selection || expandable
                  ? ns.is('fixed-left', true)
                  : '',
              ]"
              :style="rowDragCellStyle()"
              :rowspan="headerRows.length"
            />
            <th
              v-if="selection && rowIndex === 0"
              :class="[
                ns.e('cell'),
                ns.e('header-cell'),
                ns.e('selection-cell'),
                hasFixedColumns || expandable || canDragRows
                  ? ns.is('fixed-left', true)
                  : '',
              ]"
              :style="selectionCellStyle()"
              :rowspan="headerRows.length"
            >
              <DanCheckbox
                :model-value="allVisibleSelected"
                :indeterminate="someVisibleSelected"
                @update:model-value="(val) => toggleSelectAll(Boolean(val))"
              />
            </th>
            <th
              v-if="expandable && rowIndex === 0"
              :class="[
                ns.e('cell'),
                ns.e('header-cell'),
                ns.e('expandable-cell'),
                hasFixedColumns || selection || canDragRows
                  ? ns.is('fixed-left', true)
                  : '',
              ]"
              :style="expandableCellStyle()"
              :rowspan="headerRows.length"
            />
            <th
              v-for="(cell, cellIndex) in row"
              :key="`${rowIndex}-${cell.column.prop ?? cell.column.label}-${cellIndex}`"
              :class="[
                ns.e('cell'),
                ns.e('header-cell'),
                cell.column.children?.length ? ns.is('group') : '',
                cell.column.align ? ns.em('cell', cell.column.align) : '',
                cell.column.sortable && !cell.column.children?.length
                  ? ns.is('sortable')
                  : '',
                ...leafFixedClass(
                  cell.column.children?.length ? undefined : cell.column.prop,
                ),
              ]"
              :style="
                leafFixedStyle(
                  cell.column.children?.length ? undefined : cell.column.prop,
                )
              "
              :colspan="cell.colspan > 1 ? cell.colspan : undefined"
              :rowspan="cell.rowspan > 1 ? cell.rowspan : undefined"
              :draggable="
                canReorderColumns &&
                !!cell.column.prop &&
                !cell.column.children?.length &&
                !cell.column.fixed &&
                cell.column.draggable !== false
              "
              @dragstart="onColumnDragStart(cell.column.prop, $event)"
              @dragover.prevent
              @drop="onColumnDrop(cell.column.prop, $event)"
            >
              <div :class="ns.e('header-inner')">
                <span
                  :class="ns.e('header-label')"
                  @click="toggleSort(cell.column, $event)"
                >
                  {{ cell.column.label }}
                  <span
                    v-if="
                      multiSort &&
                      cell.column.sortable &&
                      sortPriority(cell.column.prop)
                    "
                    :class="ns.e('sort-priority')"
                  >
                    {{ sortPriority(cell.column.prop) }}
                  </span>
                  <span
                    v-if="cell.column.sortable && cell.column.prop"
                    :class="[
                      ns.e('sort'),
                      sortOrderOf(cell.column.prop)
                        ? ns.is(sortOrderOf(cell.column.prop)!)
                        : '',
                    ]"
                  >
                    <i :class="ns.e('sort-caret-asc')" />
                    <i :class="ns.e('sort-caret-desc')" />
                  </span>
                </span>

                <DanPopover
                  v-if="cell.column.prop && resolveFilterConfig(cell.column)"
                  trigger="click"
                  placement="bottom"
                  :width="200"
                >
                  <button
                    type="button"
                    :class="[
                      ns.e('filter-btn'),
                      resolvedFilters[cell.column.prop] != null &&
                      resolvedFilters[cell.column.prop] !== ''
                        ? ns.is('active')
                        : '',
                    ]"
                    aria-label="筛选"
                  >
                    <DanIcon name="filter" :size="12" />
                  </button>
                  <template #content>
                    <div :class="ns.e('filter-panel')" @click.stop>
                      <template
                        v-if="
                          resolveFilterConfig(cell.column)?.type === 'select'
                        "
                      >
                        <DanSelect
                          :model-value="
                            (resolvedFilters[cell.column.prop as string] as
                              string | number | null) ?? null
                          "
                          :options="
                            resolveFilterConfig(cell.column)?.options ?? []
                          "
                          clearable
                          :placeholder="t('table.filterSelectPlaceholder')"
                          @update:model-value="
                            (val) =>
                              setFilter(
                                cell.column.prop as string,
                                val as string | number | null,
                              )
                          "
                        />
                      </template>
                      <template v-else>
                        <DanInput
                          :model-value="
                            resolvedFilters[cell.column.prop as string] == null
                              ? ''
                              : String(
                                  resolvedFilters[cell.column.prop as string],
                                )
                          "
                          clearable
                          :placeholder="t('table.filterPlaceholder')"
                          @update:model-value="
                            (val) =>
                              setFilter(cell.column.prop as string, val || null)
                          "
                        />
                      </template>
                      <button
                        type="button"
                        :class="ns.e('filter-clear')"
                        @click="clearFilter(cell.column.prop as string)"
                      >
                        {{ t('table.filterClear') }}
                      </button>
                    </div>
                  </template>
                </DanPopover>
              </div>
              <span
                v-if="canResizeColumn(cell.column)"
                :class="ns.e('column-resizer')"
                @mousedown="onColumnResizeStart(cell.column.prop, $event)"
                @click.stop
              />
            </th>
          </tr>
        </thead>
        <tbody v-if="!isEmpty">
          <tr
            v-if="virtualState.enabled && virtualState.topPad > 0"
            :class="ns.e('virtual-pad')"
            aria-hidden="true"
          >
            <td
              :colspan="virtualState.colSpan"
              :style="{
                height: `${virtualState.topPad}px`,
                padding: 0,
                border: 0,
              }"
            />
          </tr>
          <template v-for="item in virtualState.rows" :key="item.key">
            <tr
              :class="ns.e('row')"
              :style="virtual ? { height: `${rowHeight}px` } : undefined"
              @dragover.prevent
              @drop="onRowDrop(item.key, $event)"
            >
              <td
                v-if="canDragRows"
                :class="[
                  ns.e('cell'),
                  ns.e('drag-cell'),
                  hasFixedColumns || selection || expandable
                    ? ns.is('fixed-left', true)
                    : '',
                ]"
                :style="rowDragCellStyle()"
              >
                <span
                  :class="ns.e('row-drag-handle')"
                  draggable="true"
                  aria-label="拖拽排序"
                  @dragstart="onRowDragStart(item.key, $event)"
                >
                  ⋮⋮
                </span>
              </td>
              <td
                v-if="selection"
                :class="[
                  ns.e('cell'),
                  ns.e('selection-cell'),
                  hasFixedColumns || expandable || canDragRows
                    ? ns.is('fixed-left', true)
                    : '',
                ]"
                :style="selectionCellStyle()"
              >
                <DanCheckbox
                  :model-value="isRowSelected(item.key)"
                  @update:model-value="
                    (val) => toggleRowSelection(item.key, Boolean(val))
                  "
                />
              </td>
              <td
                v-if="expandable"
                :class="[
                  ns.e('cell'),
                  ns.e('expandable-cell'),
                  hasFixedColumns || selection || canDragRows
                    ? ns.is('fixed-left', true)
                    : '',
                ]"
                :style="expandableCellStyle()"
              >
                <button
                  type="button"
                  :class="[
                    ns.e('expand'),
                    contentExpandKeySet.has(item.key)
                      ? ns.is('expanded', true)
                      : '',
                  ]"
                  aria-label="展开详情"
                  @click.stop="toggleContentExpand(item.row, item.key)"
                >
                  ▸
                </button>
              </td>
              <td
                v-for="col in displayColumns"
                :key="col.prop"
                :class="[
                  ns.e('cell'),
                  col.align ? ns.em('cell', col.align) : '',
                  ...leafFixedClass(col.prop),
                ]"
                :style="leafFixedStyle(col.prop)"
              >
                <div
                  v-if="tree && col.prop === treeColumnProp"
                  :class="ns.e('tree-cell')"
                  :style="{ paddingLeft: `${item.depth * indent}px` }"
                >
                  <button
                    v-if="item.hasChildren"
                    type="button"
                    :class="[
                      ns.e('expand'),
                      expandedKeySet.has(item.key)
                        ? ns.is('expanded', true)
                        : '',
                    ]"
                    aria-label="展开/收起"
                    @click.stop="toggleExpand(item.row, item.key)"
                  >
                    ▸
                  </button>
                  <span v-else :class="ns.e('expand-placeholder')" />
                  <slot
                    :name="col.prop"
                    :row="item.row"
                    :column="col"
                    :index="item.index"
                  >
                    <input
                      v-if="
                        col.editable &&
                        isEditing(item.key, col.prop as string)
                      "
                      v-model="editingValue"
                      :class="ns.e('edit-input')"
                      @click.stop
                      @keydown.enter.prevent="
                        commitEdit(item.row, col.prop as string, item.index)
                      "
                      @keydown.esc.prevent="cancelEdit"
                      @blur="
                        commitEdit(item.row, col.prop as string, item.index)
                      "
                    />
                    <span
                      v-else
                      @dblclick="
                        startEdit(item.row, col.prop as string, item.index)
                      "
                    >
                      {{ cellText(item.row, col.prop as string) }}
                    </span>
                  </slot>
                </div>
                <slot
                  v-else
                  :name="col.prop"
                  :row="item.row"
                  :column="col"
                  :index="item.index"
                >
                  <input
                    v-if="
                      col.editable && isEditing(item.key, col.prop as string)
                    "
                    v-model="editingValue"
                    :class="ns.e('edit-input')"
                    @click.stop
                    @keydown.enter.prevent="
                      commitEdit(item.row, col.prop as string, item.index)
                    "
                    @keydown.esc.prevent="cancelEdit"
                    @blur="commitEdit(item.row, col.prop as string, item.index)"
                  />
                  <span
                    v-else
                    @dblclick="
                      startEdit(item.row, col.prop as string, item.index)
                    "
                  >
                    {{ cellText(item.row, col.prop as string) }}
                  </span>
                </slot>
              </td>
            </tr>
            <tr
              v-if="expandable && contentExpandKeySet.has(item.key)"
              :class="ns.e('expanded-row')"
            >
              <td :colspan="tableColSpan" :class="ns.e('expanded-cell')">
                <slot
                  name="expand"
                  :row="item.row"
                  :index="item.index"
                />
              </td>
            </tr>
          </template>
          <tr
            v-if="virtualState.enabled && virtualState.bottomPad > 0"
            :class="ns.e('virtual-pad')"
            aria-hidden="true"
          >
            <td
              :colspan="virtualState.colSpan"
              :style="{
                height: `${virtualState.bottomPad}px`,
                padding: 0,
                border: 0,
              }"
            />
          </tr>
        </tbody>
        <tfoot v-if="showSummary && !isEmpty">
          <tr :class="ns.e('summary-row')">
            <td
              v-if="canDragRows"
              :class="[
                ns.e('cell'),
                ns.e('summary-cell'),
                ns.e('drag-cell'),
                hasFixedColumns || selection || expandable
                  ? ns.is('fixed-left', true)
                  : '',
              ]"
              :style="rowDragCellStyle()"
            />
            <td
              v-if="selection"
              :class="[
                ns.e('cell'),
                ns.e('summary-cell'),
                hasFixedColumns || expandable || canDragRows
                  ? ns.is('fixed-left', true)
                  : '',
              ]"
              :style="selectionCellStyle()"
            />
            <td
              v-if="expandable"
              :class="[
                ns.e('cell'),
                ns.e('summary-cell'),
                hasFixedColumns || selection || canDragRows
                  ? ns.is('fixed-left', true)
                  : '',
              ]"
              :style="expandableCellStyle()"
            />
            <td
              v-for="(col, colIndex) in displayColumns"
              :key="col.prop"
              :class="[
                ns.e('cell'),
                ns.e('summary-cell'),
                col.align ? ns.em('cell', col.align) : '',
                ...leafFixedClass(col.prop),
              ]"
              :style="leafFixedStyle(col.prop)"
            >
              <template v-if="colIndex === 0 && summaryCells[col.prop!] == null">
                {{ t('table.summary') }}
              </template>
              <template v-else>
                {{ summaryCells[col.prop as string] ?? '' }}
              </template>
            </td>
          </tr>
        </tfoot>
      </table>

      <div v-if="isEmpty" :class="ns.e('empty')">
        <slot name="empty">
          <DanEmpty :description="resolvedEmptyText" :image-size="72" />
        </slot>
      </div>
    </div>
  </div>
</template>
