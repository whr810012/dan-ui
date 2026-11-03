import type { InjectionKey, Ref } from 'vue'

export type AvatarSize = number | 'small' | 'default' | 'large'
export type AvatarShape = 'circle' | 'square'

export interface AvatarGroupContext {
  size: Ref<AvatarSize>
  shape: Ref<AvatarShape>
}

export const avatarGroupContextKey: InjectionKey<AvatarGroupContext> =
  Symbol('danAvatarGroup')
