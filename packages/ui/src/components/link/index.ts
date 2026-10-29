import { withInstall } from '../../utils/withInstall'
import Link from './Link.vue'

export const DanLink = withInstall(Link, undefined, 'DanLink')
export default DanLink
export type DanLinkInstance = InstanceType<typeof Link>
