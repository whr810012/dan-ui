<script setup lang="ts">
import type { TreeNode } from './types'

defineOptions({ name: 'DanTreeNodeView' })

defineProps<{
  node: TreeNode
  depth: number
  expanded: Set<string | number>
  checked: Set<string | number>
  showCheckbox?: boolean
}>()

const emit = defineEmits<{
  toggleExpand: [node: TreeNode]
  toggleCheck: [node: TreeNode]
  nodeClick: [node: TreeNode]
}>()
</script>

<template>
  <div class="dan-tree-node" role="treeitem">
    <div
      class="dan-tree-node__content"
      :class="{ 'is-disabled': node.disabled }"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
      @click="!node.disabled && emit('nodeClick', node)"
    >
      <span
        class="dan-tree-node__expand"
        :class="{
          'is-leaf': !node.children?.length,
          'is-expanded': expanded.has(node.id),
        }"
        @click.stop="node.children?.length && emit('toggleExpand', node)"
      >
        <template v-if="node.children?.length">
          {{ expanded.has(node.id) ? '▾' : '▸' }}
        </template>
      </span>
      <input
        v-if="showCheckbox"
        class="dan-tree-node__checkbox"
        type="checkbox"
        :checked="checked.has(node.id)"
        :disabled="node.disabled"
        @click.stop
        @change="emit('toggleCheck', node)"
      />
      <span class="dan-tree-node__label">{{ node.label }}</span>
    </div>
    <template v-if="node.children?.length && expanded.has(node.id)">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :expanded="expanded"
        :checked="checked"
        :show-checkbox="showCheckbox"
        @toggle-expand="emit('toggleExpand', $event)"
        @toggle-check="emit('toggleCheck', $event)"
        @node-click="emit('nodeClick', $event)"
      />
    </template>
  </div>
</template>
