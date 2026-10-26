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

function defaultVisibleProps() {
  return props.columns
    .filter((col) => col.visible !== false)
    .map((col) => col.prop)
}

watch(
  () => props.columns,
  () => {
    if (!isVisibleControlled.value) {
      const next = defaultVisibleProps()
      if (!innerVisible.value.length) {
        innerVisible.value = next
      } else {
        const allowed = new Set(props.columns.map((c) => c.prop))
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

const displayColumns = computed(() =>
  props.columns.filter((col) => resolvedVisibleProps.value.includes(col.prop)),
)

const showSettings = computed(() => {
  if (props.showColumnSettings != null) return props.showColumnSettings
  return props.columns.some((col) => col.hideable !== false)
})

const hideableColumns = computed(() =>
  props.columns.filter((col) => col.hideable !== false),
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
    const order = props.columns.map((c) => c.prop)
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
  if (!col.sortable) return
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
    rows = rows.filter((row) => {
      for (const col of props.columns) {
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
                :model-value="isColumnVisible(col.prop)"
                @update:model-value="
                  (val) => setColumnVisible(col.prop, Boolean(val))
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
          <tr>
            <th
              v-for="col in displayColumns"
              :key="col.prop"
              :class="[
                ns.e('cell'),
                ns.e('header-cell'),
                col.align ? ns.em('cell', col.align) : '',
                col.sortable ? ns.is('sortable') : '',
              ]"
            >
              <div :class="ns.e('header-inner')">
                <span :class="ns.e('header-label')" @click="toggleSort(col)">
                  {{ col.label }}
                  <span
                    v-if="col.sortable"
                    :class="[
                      ns.e('sort'),
                      sortState.prop === col.prop && sortState.order
                        ? ns.is(sortState.order)
                        : '',
                    ]"
                  >
                    <i :class="ns.e('sort-caret-asc')" />
                    <i :class="ns.e('sort-caret-desc')" />
                  </span>
                </span>

                <DanPopover
                  v-if="resolveFilterConfig(col)"
                  trigger="click"
                  placement="bottom"
                  :width="200"
                >
                  <button
                    type="button"
                    :class="[
                      ns.e('filter-btn'),
                      resolvedFilters[col.prop] != null &&
                      resolvedFilters[col.prop] !== ''
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
                        v-if="resolveFilterConfig(col)?.type === 'select'"
                      >
                        <DanSelect
                          :model-value="
                            (resolvedFilters[col.prop] as
                              string | number | null) ?? null
                          "
                          :options="resolveFilterConfig(col)?.options ?? []"
                          clearable
                          placeholder="请选择"
                          @update:model-value="
                            (val) =>
                              setFilter(col.prop, val as string | number | null)
                          "
                        />
                      </template>
                      <template v-else>
                        <DanInput
                          :model-value="
                            resolvedFilters[col.prop] == null
                              ? ''
                              : String(resolvedFilters[col.prop])
                          "
                          clearable
                          placeholder="输入关键词"
                          @update:model-value="
                            (val) => setFilter(col.prop, val || null)
                          "
                        />
                      </template>
                      <button
                        type="button"
                        :class="ns.e('filter-clear')"
                        @click="clearFilter(col.prop)"
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
                {{ cellText(row, col.prop) }}
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
