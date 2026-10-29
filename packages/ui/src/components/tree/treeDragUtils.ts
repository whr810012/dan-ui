import type { TreeNode } from './types'

export type TreeDropType = 'before' | 'after' | 'inner'

function cloneNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.map((node) => ({
    ...node,
    children: node.children ? cloneNodes(node.children) : undefined,
  }))
}

export function findNode(
  nodes: TreeNode[],
  id: string | number,
): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

export function isDescendant(
  ancestor: TreeNode,
  id: string | number,
): boolean {
  if (!ancestor.children?.length) return false
  for (const child of ancestor.children) {
    if (child.id === id || isDescendant(child, id)) return true
  }
  return false
}

/** 从树中移除节点，返回被移除节点（浅克隆，保留原 children 引用结构） */
export function removeNode(
  nodes: TreeNode[],
  id: string | number,
): { next: TreeNode[]; removed: TreeNode | null } {
  const next: TreeNode[] = []
  let removed: TreeNode | null = null
  for (const node of nodes) {
    if (node.id === id) {
      removed = { ...node, children: node.children ? [...node.children] : undefined }
      continue
    }
    if (node.children?.length) {
      const childResult = removeNode(node.children, id)
      if (childResult.removed) removed = childResult.removed
      next.push({ ...node, children: childResult.next })
    } else {
      next.push({ ...node })
    }
  }
  return { next, removed }
}

export function insertNode(
  nodes: TreeNode[],
  targetId: string | number,
  node: TreeNode,
  dropType: TreeDropType,
): TreeNode[] {
  const result: TreeNode[] = []
  for (const item of nodes) {
    if (item.id === targetId) {
      if (dropType === 'before') {
        result.push(node, item)
      } else if (dropType === 'after') {
        result.push(item, node)
      } else {
        result.push({
          ...item,
          children: [...(item.children ?? []), node],
        })
      }
      continue
    }
    if (item.children?.length) {
      result.push({
        ...item,
        children: insertNode(item.children, targetId, node, dropType),
      })
    } else {
      result.push(item)
    }
  }
  return result
}

export function reorderTree(
  data: TreeNode[],
  dragId: string | number,
  dropId: string | number,
  dropType: TreeDropType,
): TreeNode[] | null {
  if (dragId === dropId) return null
  const cloned = cloneNodes(data)
  const dragNode = findNode(cloned, dragId)
  const dropNode = findNode(cloned, dropId)
  if (!dragNode || !dropNode) return null
  if (isDescendant(dragNode, dropId)) return null

  const { next, removed } = removeNode(cloned, dragId)
  if (!removed) return null
  return insertNode(next, dropId, removed, dropType)
}

export function resolveDropType(
  clientY: number,
  rect: DOMRect,
): TreeDropType {
  const ratio = (clientY - rect.top) / Math.max(rect.height, 1)
  if (ratio < 0.25) return 'before'
  if (ratio > 0.75) return 'after'
  return 'inner'
}
