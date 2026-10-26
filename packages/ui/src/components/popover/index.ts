import { withInstall } from '../../utils/withInstall'
import Popover from './Popover.vue'

export const DanPopover = withInstall(Popover, undefined, 'DanPopover')
export default DanPopover
export type DanPopoverInstance = InstanceType<typeof Popover>
