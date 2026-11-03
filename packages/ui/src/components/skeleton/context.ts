import type { InjectionKey, Ref } from 'vue'

export interface SkeletonContext {
  animated: Ref<boolean>
}

export const skeletonContextKey: InjectionKey<SkeletonContext> =
  Symbol('danSkeleton')

export type SkeletonThrottle =
  | number
  | {
      leading?: number
      trailing?: number
      initVal?: boolean
    }

export function normalizeThrottle(throttle: SkeletonThrottle | undefined): {
  leading: number
  trailing: number
  initVal: boolean
} {
  if (throttle == null) {
    return { leading: 0, trailing: 0, initVal: false }
  }
  if (typeof throttle === 'number') {
    return { leading: Math.max(0, throttle), trailing: 0, initVal: false }
  }
  return {
    leading: Math.max(0, throttle.leading ?? 0),
    trailing: Math.max(0, throttle.trailing ?? 0),
    initVal: Boolean(throttle.initVal),
  }
}
