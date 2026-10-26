import { withInstall } from '../../utils/withInstall'
import Icon from './Icon.vue'

export const DanIcon = withInstall(Icon, undefined, 'DanIcon')
export default DanIcon
export type DanIconInstance = InstanceType<typeof Icon>
export type { IconName } from './icons'
export { iconMap, iconNames } from './icons'
