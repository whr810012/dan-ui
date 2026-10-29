import { withInstall } from '../../utils/withInstall'
import Tree from './Tree.vue'

export const DanTree = withInstall(Tree, undefined, 'DanTree')
export default DanTree
export type DanTreeInstance = InstanceType<typeof Tree>
export type { TreeNode } from './types'
export type { TreeDropType } from './treeDragUtils'
