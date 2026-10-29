<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
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
  }>(),
  {
    data: () => [],
    defaultExpandAll: false,
    showCheckbox: false,
    checkedKeys: () => [],
    draggable: false,
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
const rootRef = ref<HTMLElement | null>(null)
const expanded = ref<Set<string | number>>(new Set())
const checked = ref<Set<string | number>>(new Set(props.checkedKeys))
const focusedId = ref<string | number | null>(null)
const dragNodeId = ref<string | number | null>(null)
const dropTargetId = ref<string | number | null>(null)
const dropType = ref<TreeDropType | null>(null)

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
      if (node.children?.length && expanded.value.has(node.id)) {
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
  const visible = flattenVisible(props.data).filter((node) => !node.disabled)
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
    if (current.children?.length && !expanded.value.has(current.id)) {
      toggleExpand(current)
    } else if (current.children?.length) {
      const child = current.children.find((item) => !item.disabled)
      if (child) focusNode(child.id)
    }
  } else if (event.key === 'ArrowLeft' && current) {
    event.preventDefault()
    if (current.children?.length && expanded.value.has(current.id)) {
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
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b(), ns.is('draggable', draggable)]"
    role="tree"
    tabindex="0"
    @keydown="onKeydown"
  >
    <TreeNodeView
      v-for="node in data"
      :key="node.id"
      :node="node"
      :depth="0"
      :expanded="expanded"
      :checked="checked"
      :show-checkbox="showCheckbox"
      :focused-id="focusedId"
      :draggable="draggable"
      :drop-target-id="dropTargetId"
      :drop-type="dropType"
      @toggle-expand="toggleExpand"
      @toggle-check="toggleCheck"
      @node-click="onClick"
      @focus-node="focusNode"
      @node-drag-start="onNodeDragStart"
      @node-drag-over="onNodeDragOver"
      @node-drop="onNodeDrop"
      @node-drag-end="clearDragState"
    />
  </div>
</template>
