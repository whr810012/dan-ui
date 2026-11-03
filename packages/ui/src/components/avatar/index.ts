import type { App, Plugin } from 'vue'
import { withInstall } from '../../utils/withInstall'
import Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'

export const DanAvatar = withInstall(Avatar, undefined, 'DanAvatar')
export const DanAvatarGroup = withInstall(
  AvatarGroup,
  undefined,
  'DanAvatarGroup',
)

const plugin: Plugin = {
  install(app: App) {
    app.component('DanAvatar', DanAvatar)
    app.component('DanAvatarGroup', DanAvatarGroup)
  },
}

export default plugin
export type DanAvatarInstance = InstanceType<typeof Avatar>
export type DanAvatarGroupInstance = InstanceType<typeof AvatarGroup>
