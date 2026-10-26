import { withInstall } from '../../utils/withInstall'
import Badge from './Badge.vue'

export const DanBadge = withInstall(Badge, undefined, 'DanBadge')
export default DanBadge
export type DanBadgeInstance = InstanceType<typeof Badge>
