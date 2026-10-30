<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import { DanEmpty } from '../empty'
import TreeNodeView from './TreeNode.vue'
import type { TreeNode } from './types'
import {
  findNode,
  isDescendant,
  reorderTree,
  resolveDropType,
  type TreeDropType,
} from './treeDragUtils'
import './style.css'

defineOptions({ name: 'DanTree' })

const props = withDefaults(
  defineProps<{
    data?: TreeNode[]
    defaultExpandAll?: boolean
    showCheckbox?: boolean
    checkedKeys?: Array<string | number>
    draggable?: boolean
    allowDrag?: (node: TreeNode) => boolean
    allowDrop?: (
      dragging: TreeNode,
      drop: TreeNode,
      type: TreeDropType,
    ) => boolean
    /** 过滤方法；返回 true 保留节点 */
    filterMethod?: (query: string, node: TreeNode) => boolean
    emptyText?: string
  }>(),
  {
    data: () => [],
    defaultExpandAll: false,
    showCheckbox: false,
    checkedKeys: () => [],
    draggable: false,
    emptyText: undefined,
  },
)

const emit = defineEmits<{
  'update:checkedKeys': [keys: Array<string | number>]
  'node-click': [node: TreeNode]
  check: [keys: Array<string | number>, node: TreeNode]
  'node-drag-end': [
    payload: {
      dragNode: TreeNode
      dropNode: TreeNode
      dropType: TreeDropType
      data: TreeNode[]
    },
  ]
}>()

const ns = useNamespace('tree')
const { t } = useLocale()
const rootRef = ref<HTMLElement | null>(null)
const expanded = ref<Set<string | number>>(new Set())
const checked = ref<Set<string | number>>(new Set(props.checkedKeys))
const focusedId = ref<string | number | null>(null)
const dragNodeId = ref<string | number | null>(null)
const dropTargetId = ref<string | number | null>(null)
const dropType = ref<TreeDropType | null>(null)
const filterQuery = ref('')

watch(
  () => props.checkedKeys,
  (keys) => {
    checked.value = new Set(keys)
  },
)

watch(
  () => [props.data, props.defaultExpandAll] as const,
  ([list, expandAll]) => {
    if (!expandAll) return
    const ids = new Set<string | number>()
    const walk = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.children?.length) {
          ids.add(node.id)
          walk(node.children)
        }
      }
    }
    walk(list)
    expanded.value = ids
  },
  { immediate: true, deep: true },
)

function defaultFilterMethod(query: string, node: TreeNode) {
  return node.label.toLowerCase().includes(query.toLowerCase())
}

function matchNode(node: TreeNode, query: string) {
  if (!query) return true
  const method = props.filterMethod ?? defaultFilterMethod
  return method(query, node)
}

function filterTreeData(
  nodes: TreeNode[],
  query: string,
): { tree: TreeNode[]; expandIds: Set<string | number> } {
  const expandIds = new Set<string | number>()
  if (!query) return { tree: nodes, expandIds }

  const walk = (list: TreeNode[]): TreeNode[] => {
    const result: TreeNode[] = []
    for (const node of list) {
      const children = node.children?.length ? walk(node.children) : []
      const selfMatch = matchNode(node, query)
      if (selfMatch || children.length) {
        if (children.length) expandIds.add(node.id)
        result.push({
          ...node,
          children: children.length ? children : undefined,
        })
      }
    }
    return result
  }

  return { tree: walk(nodes), expandIds }
}

const filteredResult = computed(() =>
  filterTreeData(props.data, filterQuery.value.trim()),
)

const displayData = computed(() => filteredResult.value.tree)

const resolvedExpanded = computed(() => {
  if (!filterQuery.value.trim()) return expanded.value
  const merged = new Set(expanded.value)
  for (const id of filteredResult.value.expandIds) merged.add(id)
  return merged
})

const isEmpty = computed(() => displayData.value.length === 0)

const emptyDescription = computed(() => {
  if (props.emptyText) return props.emptyText
  if (filterQuery.value.trim()) return t('tree.filterEmptyText')
  return t('tree.emptyText')
})

function filter(query: string) {
  filterQuery.value = query
}

function toggleExpand(node: TreeNode) {
  if (!node.children?.length) return
  const next = new Set(expanded.value)
  if (next.has(node.id)) next.delete(node.id)
  else next.add(node.id)
  expanded.value = next
}

function toggleCheck(node: TreeNode) {
  if (node.disabled) return
  const next = new Set(checked.value)
  if (next.has(node.id)) next.delete(node.id)
  else next.add(node.id)
  checked.value = next
  const keys = [...next]
  emit('update:checkedKeys', keys)
  emit('check', keys, node)
}

function onClick(node: TreeNode) {
  if (node.disabled) return
  focusedId.value = node.id
  emit('node-click', node)
  toggleExpand(node)
}

function flattenVisible(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = []
  const walk = (list: TreeNode[]) => {
    for (const node of list) {
      result.push(node)
      if (node.children?.length && resolvedExpanded.value.has(node.id)) {
        walk(node.children)
      }
    }
  }
  walk(nodes)
  return result
}

function focusNode(id: string | number) {
  focusedId.value = id
  void nextTick(() => {
    const target = Array.from(
      rootRef.value?.querySelectorAll<HTMLElement>('[data-tree-id]') ?? [],
    ).find((el) => el.dataset.treeId === String(id))
    target?.focus()
  })
}

function onKeydown(event: KeyboardEvent) {
  const visible = flattenVisible(displayData.value).filter(
    (node) => !node.disabled,
  )
  if (!visible.length) return
  const currentIndex = visible.findIndex((node) => node.id === focusedId.value)
  const current = currentIndex >= 0 ? visible[currentIndex] : visible[0]

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    const next =
      visible[((currentIndex < 0 ? -1 : currentIndex) + 1) % visible.length]!
    focusNode(next.id)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    const prev =
      visible[
        ((currentIndex < 0 ? 0 : currentIndex) - 1 + visible.length) %
          visible.length
      ]!
    focusNode(prev.id)
  } else if (event.key === 'ArrowRight' && current) {
    event.preventDefault()
    if (current.children?.length && !resolvedExpanded.value.has(current.id)) {
      toggleExpand(current)
    } else if (current.children?.length) {
      const child = current.children.find((item) => !item.disabled)
      if (child) focusNode(child.id)
    }
  } else if (event.key === 'ArrowLeft' && current) {
    event.preventDefault()
    if (current.children?.length && resolvedExpanded.value.has(current.id)) {
      toggleExpand(current)
    }
  } else if ((event.key === 'Enter' || event.key === ' ') && current) {
    event.preventDefault()
    if (props.showCheckbox) toggleCheck(current)
    else onClick(current)
  } else if (event.key === 'Home') {
    event.preventDefault()
    focusNode(visible[0]!.id)
  } else if (event.key === 'End') {
    event.preventDefault()
    focusNode(visible[visible.length - 1]!.id)
  }
}

function onNodeDragStart(node: TreeNode, event: DragEvent) {
  if (!props.draggable || node.disabled) {
    event.preventDefault()
    return
  }
  if (props.allowDrag && !props.allowDrag(node)) {
    event.preventDefault()
    return
  }
  dragNodeId.value = node.id
  event.dataTransfer?.setData('text/plain', String(node.id))
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

function onNodeDragOver(node: TreeNode, event: DragEvent) {
  if (!props.draggable || dragNodeId.value == null) return
  const dragging = findNode(props.data, dragNodeId.value)
  if (!dragging || dragging.id === node.id || isDescendant(dragging, node.id)) {
    return
  }
  const target = event.currentTarget as HTMLElement | null
  if (!target) return
  const type = resolveDropType(event.clientY, target.getBoundingClientRect())
  if (props.allowDrop && !props.allowDrop(dragging, node, type)) return
  event.preventDefault()
  dropTargetId.value = node.id
  dropType.value = type
}

function onNodeDrop(node: TreeNode, event: DragEvent) {
  event.preventDefault()
  const dragId =
    dragNodeId.value ?? event.dataTransfer?.getData('text/plain') ?? null
  const type = dropType.value
  clearDragState()
  if (dragId == null || type == null || !props.draggable) return
  const dragging = findNode(props.data, dragId)
  const dropping = findNode(props.data, node.id)
  if (!dragging || !dropping) return
  if (props.allowDrop && !props.allowDrop(dragging, dropping, type)) return
  const next = reorderTree(props.data, dragId, node.id, type)
  if (!next) return
  emit('node-drag-end', {
    dragNode: dragging,
    dropNode: dropping,
    dropType: type,
    data: next,
  })
}

function clearDragState() {
  dragNodeId.value = null
  dropTargetId.value = null
  dropType.value = null
}

defineExpose({ filter })
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.is('draggable', draggable),
      ns.is('empty', isEmpty),
      ns.is('filtered', Boolean(filterQuery.trim())),
    ]"
    role="tree"
    tabindex="0"
    @keydown="onKeydown"
  >
    <template v-if="!isEmpty">
      <TreeNodeView
        v-for="node in displayData"
        :key="node.id"
        :node="node"
        :depth="0"
        :expanded="resolvedExpanded"
        :checked="checked"
        :show-checkbox="showCheckbox"
        :focused-id="focusedId"
        :draggable="draggable"
        :drop-target-id="dropTargetId"
        :drop-type="dropType"
        :filter-query="filterQuery.trim()"
        @toggle-expand="toggleExpand"
        @toggle-check="toggleCheck"
        @node-click="onClick"
        @focus-node="focusNode"
        @node-drag-start="onNodeDragStart"
        @node-drag-over="onNodeDragOver"
        @node-drop="onNodeDrop"
        @node-drag-end="clearDragState"
      />
    </template>
    <div v-else :class="ns.e('empty')">
      <slot name="empty">
        <DanEmpty :description="emptyDescription" :image-size="64" />
      </slot>
    </div>
  </div>
</template>
