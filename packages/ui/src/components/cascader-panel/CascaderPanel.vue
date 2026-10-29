<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import type { CascaderOption } from '../cascader/types'
import '../cascader/style.css'
import './style.css'

defineOptions({ name: 'DanCascaderPanel' })

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number> | null
    options?: CascaderOption[]
    filterable?: boolean
    filterPlaceholder?: string
    virtual?: boolean
    itemHeight?: number
    maxColumnHeight?: number
  }>(),
  {
    modelValue: null,
    options: () => [],
    filterable: false,
    filterPlaceholder: '搜索',
    virtual: false,
    itemHeight: 34,
    maxColumnHeight: 220,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number> | null]
  change: [value: Array<string | number> | null]
}>()

const ns = useNamespace('cascader')
const panelNs = useNamespace('cascader-panel')
const activePath = ref<CascaderOption[]>([])
const filterQuery = ref('')
const scrollTops = ref<number[]>([])

function filterTree(
  options: CascaderOption[],
  query: string,
): CascaderOption[] {
  const q = query.trim().toLowerCase()
  if (!q) return options
  const result: CascaderOption[] = []
  for (const opt of options) {
    const children = opt.children?.length
      ? filterTree(opt.children, query)
      : []
    if (opt.label.toLowerCase().includes(q)) {
      result.push(opt)
    } else if (children.length) {
      result.push({ ...opt, children })
    }
  }
  return result
}

const displayOptions = computed(() =>
  props.filterable ? filterTree(props.options, filterQuery.value) : props.options,
)

function syncFromValue() {
  if (!props.modelValue?.length) {
    activePath.value = []
    return
  }
  const path: CascaderOption[] = []
  let list = displayOptions.value
  for (const val of props.modelValue) {
    const found = list.find((item) => item.value === val)
    if (!found) break
    path.push(found)
    list = found.children || []
  }
  activePath.value = path
}

watch(
  () => [props.modelValue, displayOptions.value] as const,
  () => syncFromValue(),
  { immediate: true, deep: true },
)

watch(filterQuery, () => {
  activePath.value = []
  scrollTops.value = []
})

const columns = computed(() => {
  const cols: CascaderOption[][] = [displayOptions.value]
  for (const node of activePath.value) {
    if (node.children?.length) cols.push(node.children)
  }
  return cols
})

type ColumnView = {
  useVirtual: boolean
  padTop: number
  padBottom: number
  items: { option: CascaderOption; index: number }[]
}

const columnViews = computed((): ColumnView[] => {
  const height = props.itemHeight
  const maxH = props.maxColumnHeight
  return columns.value.map((col, level) => {
    const useVirtual = props.virtual && col.length * height > maxH
    if (!useVirtual) {
      return {
        useVirtual: false,
        padTop: 0,
        padBottom: 0,
        items: col.map((option, index) => ({ option, index })),
      }
    }
    const scrollTop = scrollTops.value[level] ?? 0
    const visibleCount = Math.ceil(maxH / height) + 4
    const start = Math.max(0, Math.floor(scrollTop / height) - 2)
    const end = Math.min(col.length, start + visibleCount)
    return {
      useVirtual: true,
      padTop: start * height,
      padBottom: Math.max(0, (col.length - end) * height),
      items: col.slice(start, end).map((option, i) => ({
        option,
        index: start + i,
      })),
    }
  })
})

function onSelect(level: number, option: CascaderOption) {
  if (option.disabled) return
  activePath.value = [...activePath.value.slice(0, level), option]
  if (!option.children?.length) {
    const value = activePath.value.map((item) => item.value)
    emit('update:modelValue', value)
    emit('change', value)
  }
}

function onColumnScroll(level: number, event: Event) {
  const next = [...scrollTops.value]
  next[level] = (event.target as HTMLElement).scrollTop
  scrollTops.value = next
}
</script>

<template>
  <div :class="[ns.e('panel'), panelNs.b(), ns.is('embedded', true)]">
    <div v-if="filterable" :class="panelNs.e('filter')">
      <input
        v-model="filterQuery"
        type="search"
        :class="panelNs.e('filter-input')"
        :placeholder="filterPlaceholder"
      />
    </div>
    <div :class="panelNs.e('columns')">
      <ul
        v-for="(col, level) in columns"
        :key="level"
        :class="ns.e('menu')"
        :style="{ maxHeight: `${maxColumnHeight}px` }"
        @scroll="onColumnScroll(level, $event)"
      >
        <template v-if="columnViews[level]?.useVirtual">
          <li
            :style="{ height: `${columnViews[level]!.padTop}px` }"
            aria-hidden="true"
          />
          <li
            v-for="item in columnViews[level]!.items"
            :key="String(item.option.value)"
            :class="[
              ns.e('node'),
              ns.is('active', activePath[level]?.value === item.option.value),
              ns.is('disabled', !!item.option.disabled),
            ]"
            :style="{ height: `${itemHeight}px`, boxSizing: 'border-box' }"
            @click="onSelect(level, item.option)"
          >
            <span>{{ item.option.label }}</span>
            <span
              v-if="item.option.children?.length"
              :class="ns.e('arrow')"
            >›</span>
          </li>
          <li
            :style="{ height: `${columnViews[level]!.padBottom}px` }"
            aria-hidden="true"
          />
        </template>
        <template v-else>
          <li
            v-for="option in col"
            :key="String(option.value)"
            :class="[
              ns.e('node'),
              ns.is('active', activePath[level]?.value === option.value),
              ns.is('disabled', !!option.disabled),
            ]"
            @click="onSelect(level, option)"
          >
            <span>{{ option.label }}</span>
            <span v-if="option.children?.length" :class="ns.e('arrow')">›</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
