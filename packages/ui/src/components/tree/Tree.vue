<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import TreeNodeView from './TreeNode.vue'
import type { TreeNode } from './types'
import './style.css'

defineOptions({ name: 'DanTree' })

const props = withDefaults(
  defineProps<{
    data?: TreeNode[]
    defaultExpandAll?: boolean
    showCheckbox?: boolean
    checkedKeys?: Array<string | number>
  }>(),
  {
    data: () => [],
    defaultExpandAll: false,
    showCheckbox: false,
    checkedKeys: () => [],
  },
)

const emit = defineEmits<{
  'update:checkedKeys': [keys: Array<string | number>]
  'node-click': [node: TreeNode]
  check: [keys: Array<string | number>, node: TreeNode]
}>()

const ns = useNamespace('tree')
const rootRef = ref<HTMLElement | null>(null)
const expanded = ref<Set<string | number>>(new Set())
const checked = ref<Set<string | number>>(new Set(props.checkedKeys))
const focusedId = ref<string | number | null>(null)

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
</script>

<template>
  <div
    ref="rootRef"
    :class="ns.b()"
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
      @toggle-expand="toggleExpand"
      @toggle-check="toggleCheck"
      @node-click="onClick"
      @focus-node="focusNode"
    />
  </div>
</template>
