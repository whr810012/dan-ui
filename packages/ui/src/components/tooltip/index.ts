import { withInstall } from '../../utils/withInstall'
import Tooltip from './Tooltip.vue'

export const DanTooltip = withInstall(Tooltip, undefined, 'DanTooltip')
export default DanTooltip
export type DanTooltipInstance = InstanceType<typeof Tooltip>
