<script setup lang="ts">
import { ref, watch } from 'vue'
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
const expanded = ref<Set<string | number>>(new Set())
const checked = ref<Set<string | number>>(new Set(props.checkedKeys))

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
  emit('node-click', node)
  toggleExpand(node)
}
</script>

<template>
  <div :class="ns.b()" role="tree">
    <TreeNodeView
      v-for="node in data"
      :key="node.id"
      :node="node"
      :depth="0"
      :expanded="expanded"
      :checked="checked"
      :show-checkbox="showCheckbox"
      @toggle-expand="toggleExpand"
      @toggle-check="toggleCheck"
      @node-click="onClick"
    />
  </div>
</template>
