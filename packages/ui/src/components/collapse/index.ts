import { withInstall } from '../../utils/withInstall'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

export const DanCollapseItem = withInstall(
  CollapseItem,
  undefined,
  'DanCollapseItem',
)
export const DanCollapse = withInstall(
  Collapse,
  { DanCollapseItem },
  'DanCollapse',
)

export default DanCollapse
export type DanCollapseInstance = InstanceType<typeof Collapse>
export type DanCollapseItemInstance = InstanceType<typeof CollapseItem>
