<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import type {
  CascaderModelValue,
  CascaderOption,
  CascaderPath,
} from '../cascader/types'
import '../cascader/style.css'
import './style.css'

defineOptions({ name: 'DanCascaderPanel' })

const props = withDefaults(
  defineProps<{
    modelValue?: CascaderModelValue
    options?: CascaderOption[]
    filterable?: boolean
    filterPlaceholder?: string
    virtual?: boolean
    itemHeight?: number
    maxColumnHeight?: number
    /** 多选：v-model 为路径数组 Array<CascaderPath> */
    multiple?: boolean
  }>(),
  {
    modelValue: null,
    options: () => [],
    filterable: false,
    filterPlaceholder: '搜索',
    virtual: false,
    itemHeight: 34,
    maxColumnHeight: 220,
    multiple: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: CascaderModelValue]
  change: [value: CascaderModelValue]
}>()

const ns = useNamespace('cascader')
const panelNs = useNamespace('cascader-panel')
const activePath = ref<CascaderOption[]>([])
const filterQuery = ref('')
const scrollTops = ref<number[]>([])

function pathEqual(a: CascaderPath, b: CascaderPath) {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

const selectedPaths = computed((): CascaderPath[] => {
  if (!props.modelValue) return []
  if (props.multiple) {
    return Array.isArray(props.modelValue[0]) || props.modelValue.length === 0
      ? (props.modelValue as CascaderPath[])
      : []
  }
  return Array.isArray((props.modelValue as CascaderPath)[0])
    ? []
    : [props.modelValue as CascaderPath]
})

function isPathSelected(path: CascaderPath) {
  return selectedPaths.value.some((item) => pathEqual(item, path))
}

function isLeafChecked(level: number, option: CascaderOption) {
  if (option.children?.length) return false
  const path = [
    ...activePath.value.slice(0, level).map((item) => item.value),
    option.value,
  ]
  return isPathSelected(path)
}

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
  const paths = selectedPaths.value
  if (!paths.length) {
    if (!activePath.value.length) return
    activePath.value = []
    return
  }
  const pathValues = paths[paths.length - 1]!
  const path: CascaderOption[] = []
  let list = displayOptions.value
  for (const val of pathValues) {
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

function commit(value: CascaderModelValue) {
  emit('update:modelValue', value)
  emit('change', value)
}

function onSelect(level: number, option: CascaderOption) {
  if (option.disabled) return
  activePath.value = [...activePath.value.slice(0, level), option]
  if (option.children?.length) return

  const path = activePath.value.map((item) => item.value)
  if (!props.multiple) {
    commit(path)
    return
  }

  const exists = selectedPaths.value.some((item) => pathEqual(item, path))
  const next = exists
    ? selectedPaths.value.filter((item) => !pathEqual(item, path))
    : [...selectedPaths.value, path]
  commit(next)
}

function onColumnScroll(level: number, event: Event) {
  const next = [...scrollTops.value]
  next[level] = (event.target as HTMLElement).scrollTop
  scrollTops.value = next
}

function nodeClass(level: number, option: CascaderOption) {
  return [
    ns.e('node'),
    ns.is('active', activePath.value[level]?.value === option.value),
    ns.is('checked', props.multiple && isLeafChecked(level, option)),
    ns.is('disabled', !!option.disabled),
  ]
}
</script>

<template>
  <div
    :class="[
      ns.e('panel'),
      panelNs.b(),
      ns.is('embedded', true),
      ns.is('multiple', multiple),
    ]"
  >
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
            :class="nodeClass(level, item.option)"
            :style="{ height: `${itemHeight}px`, boxSizing: 'border-box' }"
            @click="onSelect(level, item.option)"
          >
            <span
              v-if="multiple && !item.option.children?.length"
              :class="ns.e('check')"
              aria-hidden="true"
            />
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
            :class="nodeClass(level, option)"
            @click="onSelect(level, option)"
          >
            <span
              v-if="multiple && !option.children?.length"
              :class="ns.e('check')"
              aria-hidden="true"
            />
            <span>{{ option.label }}</span>
            <span v-if="option.children?.length" :class="ns.e('arrow')">›</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
