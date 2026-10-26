import { withInstall } from '../../utils/withInstall'
import Divider from './Divider.vue'

export const DanDivider = withInstall(Divider, undefined, 'DanDivider')
export default DanDivider
export type DanDividerInstance = InstanceType<typeof Divider>
