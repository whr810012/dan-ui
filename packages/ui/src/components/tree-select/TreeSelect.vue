<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { DanTree } from '../tree'
import type { TreeNode } from '../tree'
import './style.css'

defineOptions({ name: 'DanTreeSelect' })

type TreeSelectValue = string | number | null
type TreeSelectModel = TreeSelectValue | TreeSelectValue[]

const props = withDefaults(
  defineProps<{
    modelValue?: TreeSelectModel
    data?: TreeNode[]
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    /** 面板内搜索，命中节点及其祖先保留 */
    filterable?: boolean
    filterPlaceholder?: string
    /** 多选（复选框） */
    multiple?: boolean
    /** 多选时折叠展示标签数量，0 表示不折叠 */
    maxTagCount?: number
    /** 是否允许选中非叶子；单选默认仅叶子，多选默认可选任意节点 */
    checkStrictly?: boolean
  }>(),
  {
    modelValue: null,
    data: () => [],
    disabled: false,
    clearable: false,
    filterable: false,
    filterPlaceholder: '搜索',
    multiple: false,
    maxTagCount: 0,
    checkStrictly: undefined,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('treeSelect.placeholder'),
)

const emit = defineEmits<{
  'update:modelValue': [value: TreeSelectModel]
  change: [value: TreeSelectModel]
  clear: []
}>()

const ns = useNamespace('tree-select')
const { form, emitChange } = useFormItem()
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const filterQuery = ref('')
const filterInputRef = ref<HTMLInputElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const allowNonLeaf = computed(() =>
  props.checkStrictly != null ? props.checkStrictly : props.multiple,
)

function findLabel(nodes: TreeNode[], id: string | number | null): string {
  if (id == null) return ''
  for (const node of nodes) {
    if (node.id === id) return node.label
    if (node.children?.length) {
      const found = findLabel(node.children, id)
      if (found) return found
    }
  }
  return ''
}

function findNode(
  nodes: TreeNode[],
  id: string | number | null,
): TreeNode | null {
  if (id == null) return null
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

const selectedKeys = computed((): Array<string | number> => {
  if (props.multiple) {
    return Array.isArray(props.modelValue)
      ? (props.modelValue.filter((v) => v != null) as Array<string | number>)
      : []
  }
  return props.modelValue != null && !Array.isArray(props.modelValue)
    ? [props.modelValue]
    : []
})

const selectedItems = computed(() =>
  selectedKeys.value
    .map((id) => ({ id, label: findLabel(props.data, id) }))
    .filter((item) => item.label),
)

const visibleTagItems = computed(() => {
  if (props.maxTagCount > 0 && selectedItems.value.length > props.maxTagCount) {
    return selectedItems.value.slice(0, props.maxTagCount)
  }
  return selectedItems.value
})

const hiddenTagCount = computed(() => {
  if (!props.multiple || props.maxTagCount <= 0) return 0
  return Math.max(0, selectedItems.value.length - props.maxTagCount)
})

const display = computed(() =>
  selectedItems.value.map((item) => item.label).join('、'),
)

const showClear = computed(
  () =>
    props.clearable && selectedKeys.value.length > 0 && !isDisabled.value,
)

function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
  const q = query.trim().toLowerCase()
  if (!q) return nodes
  const result: TreeNode[] = []
  for (const node of nodes) {
    const children = node.children?.length
      ? filterTree(node.children, query)
      : []
    const selfMatch = node.label.toLowerCase().includes(q)
    if (selfMatch || children.length) {
      let nextChildren = children
      if (selfMatch && !children.length && node.children?.length) {
        nextChildren = node.children
      }
      result.push({
        ...node,
        children: nextChildren.length ? nextChildren : undefined,
      })
    }
  }
  return result
}

const filteredData = computed(() =>
  props.filterable ? filterTree(props.data, filterQuery.value) : props.data,
)

async function open() {
  if (isDisabled.value) return
  opened.value = true
  await nextTick()
  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) return
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${Math.max(rect.width, 200)}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
  if (props.filterable) filterInputRef.value?.focus()
}

function close() {
  opened.value = false
  filterQuery.value = ''
}

function toggle() {
  if (opened.value) close()
  else void open()
}

function commit(value: TreeSelectModel) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
}

function onNodeClick(node: TreeNode) {
  if (node.disabled || props.multiple) return
  if (!allowNonLeaf.value && node.children?.length) return
  commit(node.id)
  close()
}

function onCheckedKeys(keys: Array<string | number>) {
  if (!props.multiple) return
  let next = keys
  if (!allowNonLeaf.value) {
    next = keys.filter((id) => {
      const node = findNode(props.data, id)
      return Boolean(node && !node.children?.length)
    })
  }
  commit(next)
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  commit(props.multiple ? [] : null)
  emit('clear')
}

function removeTag(id: string | number, event: MouseEvent) {
  event.stopPropagation()
  if (!props.multiple || isDisabled.value) return
  commit(selectedKeys.value.filter((item) => item !== id))
}

function onDoc(event: MouseEvent) {
  const target = event.target as Node
  if (rootRef.value?.contains(target) || panelRef.value?.contains(target)) {
    return
  }
  close()
}

onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.is('disabled', isDisabled),
      ns.is('opened', opened),
      ns.is('multiple', multiple),
    ]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      @click="toggle"
    >
      <template v-if="multiple && visibleTagItems.length">
        <span :class="ns.e('tags')">
          <span
            v-for="item in visibleTagItems"
            :key="item.id"
            :class="ns.e('tag')"
          >
            {{ item.label }}
            <i @click="removeTag(item.id, $event)">×</i>
          </span>
          <span v-if="hiddenTagCount" :class="ns.e('tag-more')">
            +{{ hiddenTagCount }}
          </span>
        </span>
      </template>
      <span v-else-if="display" :class="ns.e('value')">{{ display }}</span>
      <span v-else :class="ns.e('placeholder')">{{ resolvedPlaceholder }}</span>
      <span :class="ns.e('suffix')" aria-hidden="true" />
    </button>
    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清除"
      @click="clear"
    >
      ×
    </button>
    <Teleport to="body">
      <div
        v-if="opened"
        ref="panelRef"
        :class="ns.e('panel')"
        :style="panelStyle"
      >
        <div v-if="filterable" :class="ns.e('filter')">
          <input
            ref="filterInputRef"
            v-model="filterQuery"
            type="search"
            :class="ns.e('filter-input')"
            :placeholder="filterPlaceholder"
            @click.stop
          />
        </div>
        <DanTree
          v-if="multiple"
          :data="filteredData"
          default-expand-all
          show-checkbox
          :checked-keys="selectedKeys"
          @update:checked-keys="onCheckedKeys"
        />
        <DanTree
          v-else
          :data="filteredData"
          default-expand-all
          @node-click="onNodeClick"
        />
      </div>
    </Teleport>
  </div>
</template>
