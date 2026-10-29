<script setup lang="ts">
import type { TreeNode } from './types'
import type { TreeDropType } from './treeDragUtils'

defineOptions({ name: 'DanTreeNodeView' })

defineProps<{
  node: TreeNode
  depth: number
  expanded: Set<string | number>
  checked: Set<string | number>
  showCheckbox?: boolean
  focusedId?: string | number | null
  draggable?: boolean
  dropTargetId?: string | number | null
  dropType?: TreeDropType | null
}>()

const emit = defineEmits<{
  toggleExpand: [node: TreeNode]
  toggleCheck: [node: TreeNode]
  nodeClick: [node: TreeNode]
  focusNode: [id: string | number]
  nodeDragStart: [node: TreeNode, event: DragEvent]
  nodeDragOver: [node: TreeNode, event: DragEvent]
  nodeDrop: [node: TreeNode, event: DragEvent]
  nodeDragEnd: []
}>()

function forwardDragStart(node: TreeNode, event: DragEvent) {
  emit('nodeDragStart', node, event)
}
function forwardDragOver(node: TreeNode, event: DragEvent) {
  emit('nodeDragOver', node, event)
}
function forwardDrop(node: TreeNode, event: DragEvent) {
  emit('nodeDrop', node, event)
}
</script>

<template>
  <div
    class="dan-tree-node"
    role="treeitem"
    :aria-expanded="
      node.children?.length ? expanded.has(node.id) : undefined
    "
    :aria-selected="focusedId === node.id"
    :aria-disabled="node.disabled || undefined"
  >
    <div
      class="dan-tree-node__content"
      :class="{
        'is-disabled': node.disabled,
        'is-focused': focusedId === node.id,
        'is-drop-before': dropTargetId === node.id && dropType === 'before',
        'is-drop-after': dropTargetId === node.id && dropType === 'after',
        'is-drop-inner': dropTargetId === node.id && dropType === 'inner',
      }"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
      :data-tree-id="node.id"
      :tabindex="node.disabled ? -1 : focusedId === node.id ? 0 : -1"
      :draggable="draggable && !node.disabled"
      @click="!node.disabled && emit('nodeClick', node)"
      @focus="emit('focusNode', node.id)"
      @dragstart="emit('nodeDragStart', node, $event)"
      @dragover="emit('nodeDragOver', node, $event)"
      @drop="emit('nodeDrop', node, $event)"
      @dragend="emit('nodeDragEnd')"
    >
      <span
        class="dan-tree-node__expand"
        :class="{
          'is-leaf': !node.children?.length,
          'is-expanded': expanded.has(node.id),
        }"
        aria-hidden="true"
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
        tabindex="-1"
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
        :focused-id="focusedId"
        :draggable="draggable"
        :drop-target-id="dropTargetId"
        :drop-type="dropType"
        @toggle-expand="emit('toggleExpand', $event)"
        @toggle-check="emit('toggleCheck', $event)"
        @node-click="emit('nodeClick', $event)"
        @focus-node="emit('focusNode', $event)"
        @node-drag-start="forwardDragStart"
        @node-drag-over="forwardDragOver"
        @node-drop="forwardDrop"
        @node-drag-end="emit('nodeDragEnd')"
      />
    </template>
  </div>
</template>
