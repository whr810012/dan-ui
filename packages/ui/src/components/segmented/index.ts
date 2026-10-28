import { withInstall } from '../../utils/withInstall'
import Segmented from './Segmented.vue'

export const DanSegmented = withInstall(Segmented, undefined, 'DanSegmented')
export default DanSegmented
export type DanSegmentedInstance = InstanceType<typeof Segmented>
export type { SegmentedOption } from './Segmented.vue'
