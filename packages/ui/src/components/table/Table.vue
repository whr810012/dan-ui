<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
import type {
  TableColumn,
  TableColumnFilter,
  TableFilters,
  TableRow,
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
    /** 显示「列设置」入口，默认自动：存在 hideable 列时开启 */
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
  }>(),
  {
    data: () => [],
    columns: () => [],
    rowKey: 'id',
    border: false,
    stripe: false,
    emptyText: '暂无数据',
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
  },
)

const emit = defineEmits<{
  'update:filters': [value: TableFilters]
  'filter-change': [value: TableFilters]
  'update:visibleColumns': [value: string[]]
  'column-visibility-change': [value: string[]]
  'sort-change': [value: TableSortState]
  'update:expandRowKeys': [value: Array<string | number>]
  'expand-change': [row: TableRow, expanded: boolean]
}>()

const ns = useNamespace('table')

const innerFilters = ref<TableFilters>({})
const innerVisible = ref<string[]>([])
const innerExpandKeys = ref<Array<string | number>>([])
const sortState = ref<TableSortState>({ prop: null, order: null })
const scrollTop = ref(0)

const isFiltersControlled = computed(() => props.filters !== undefined)
const isVisibleControlled = computed(() => props.visibleColumns !== undefined)
const isExpandControlled = computed(() => props.expandRowKeys !== undefined)

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

const displayColumns = computed(() => getLeafColumns(displayColumnTree.value))

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

function compareRows(a: TableRow, b: TableRow) {
  const { prop, order } = sortState.value
  if (!prop || !order) return 0
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

function cellText(row: TableRow, prop: string) {
  const value = row[prop]
  return value == null ? '' : String(value)
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

function toggleSort(col: TableColumn) {
  if (!col.sortable || !col.prop) return
  let order: TableSortOrder = 'asc'
  if (sortState.value.prop === col.prop) {
    if (sortState.value.order === 'asc') order = 'desc'
    else if (sortState.value.order === 'desc') order = null
    else order = 'asc'
  }
  sortState.value = {
    prop: order ? col.prop : null,
    order,
  }
  emit('sort-change', { ...sortState.value })
}

const processedTree = computed(() => {
  let rows = props.data
  if (props.filterMode === 'local') {
    rows = props.tree
      ? filterTreeRows(rows, props.treeChildren, matchRowFilters)
      : rows.filter((row) => matchRowFilters(row))
  }
  const { prop, order } = sortState.value
  if (!prop || !order) return rows
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
      colSpan: displayColumns.value.length || 1,
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
    colSpan: displayColumns.value.length || 1,
  }
})

function onWrapperScroll(event: Event) {
  if (!props.virtual) return
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

function colWidth(col: TableColumn) {
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
    ]"
  >
    <div v-if="showSettings" :class="ns.e('toolbar')">
      <DanDropdown trigger="click" :hide-on-click="false" placement="bottom">
        <button type="button" :class="ns.e('settings-btn')">
          <DanIcon name="setting" :size="14" />
          列设置
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
              ]"
              :colspan="cell.colspan > 1 ? cell.colspan : undefined"
              :rowspan="cell.rowspan > 1 ? cell.rowspan : undefined"
            >
              <div :class="ns.e('header-inner')">
                <span
                  :class="ns.e('header-label')"
                  @click="toggleSort(cell.column)"
                >
                  {{ cell.column.label }}
                  <span
                    v-if="cell.column.sortable && cell.column.prop"
                    :class="[
                      ns.e('sort'),
                      sortState.prop === cell.column.prop && sortState.order
                        ? ns.is(sortState.order)
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
                          placeholder="请选择"
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
                          placeholder="输入关键词"
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
                        清除
                      </button>
                    </div>
                  </template>
                </DanPopover>
              </div>
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
          <tr
            v-for="item in virtualState.rows"
            :key="item.key"
            :class="ns.e('row')"
            :style="virtual ? { height: `${rowHeight}px` } : undefined"
          >
            <td
              v-for="col in displayColumns"
              :key="col.prop"
              :class="[ns.e('cell'), col.align ? ns.em('cell', col.align) : '']"
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
                    expandedKeySet.has(item.key) ? ns.is('expanded') : '',
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
                  {{ cellText(item.row, col.prop as string) }}
                </slot>
              </div>
              <slot
                v-else
                :name="col.prop"
                :row="item.row"
                :column="col"
                :index="item.index"
              >
                {{ cellText(item.row, col.prop as string) }}
              </slot>
            </td>
          </tr>
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
      </table>

      <div v-if="isEmpty" :class="ns.e('empty')">
        <DanEmpty :description="emptyText" :image-size="72" />
      </div>
    </div>
  </div>
</template>
