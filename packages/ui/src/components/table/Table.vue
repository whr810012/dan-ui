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
  },
)

const emit = defineEmits<{
  'update:filters': [value: TableFilters]
  'filter-change': [value: TableFilters]
  'update:visibleColumns': [value: string[]]
  'column-visibility-change': [value: string[]]
  'sort-change': [value: TableSortState]
}>()

const ns = useNamespace('table')

const innerFilters = ref<TableFilters>({})
const innerVisible = ref<string[]>([])
const sortState = ref<TableSortState>({ prop: null, order: null })

const isFiltersControlled = computed(() => props.filters !== undefined)
const isVisibleControlled = computed(() => props.visibleColumns !== undefined)

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

const filteredData = computed(() => {
  let rows = props.data
  if (props.filterMode === 'local') {
    const filters = resolvedFilters.value
    const leaves = allLeafColumns.value
    rows = rows.filter((row) => {
      for (const col of leaves) {
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
    })
  }

  const { prop, order } = sortState.value
  if (!prop || !order) return rows
  const sorted = [...rows]
  sorted.sort((a, b) => {
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
  })
  return sorted
})

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
      ns.is('empty', filteredData.length === 0),
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

    <div :class="ns.e('wrapper')">
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
        <tbody v-if="filteredData.length">
          <tr
            v-for="(row, index) in filteredData"
            :key="getRowKey(row, index)"
            :class="ns.e('row')"
          >
            <td
              v-for="col in displayColumns"
              :key="col.prop"
              :class="[ns.e('cell'), col.align ? ns.em('cell', col.align) : '']"
            >
              <slot :name="col.prop" :row="row" :column="col" :index="index">
                {{ cellText(row, col.prop as string) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!filteredData.length" :class="ns.e('empty')">
        <DanEmpty :description="emptyText" :image-size="72" />
      </div>
    </div>
  </div>
</template>
