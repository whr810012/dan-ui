export interface TreeNode {
  id: string | number
  label: string
  disabled?: boolean
  children?: TreeNode[]
}
