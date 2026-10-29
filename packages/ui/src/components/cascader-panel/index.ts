import { withInstall } from '../../utils/withInstall'
import CascaderPanel from './CascaderPanel.vue'

export const DanCascaderPanel = withInstall(
  CascaderPanel,
  undefined,
  'DanCascaderPanel',
)
export default DanCascaderPanel
export type DanCascaderPanelInstance = InstanceType<typeof CascaderPanel>
