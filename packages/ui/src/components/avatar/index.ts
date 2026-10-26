import { withInstall } from '../../utils/withInstall'
import Avatar from './Avatar.vue'

export const DanAvatar = withInstall(Avatar, undefined, 'DanAvatar')
export default DanAvatar
export type DanAvatarInstance = InstanceType<typeof Avatar>
