import type { App, Plugin } from 'vue'
import { withInstall } from '../../utils/withInstall'
import Skeleton from './Skeleton.vue'
import SkeletonItem from './SkeletonItem.vue'

export const DanSkeleton = withInstall(Skeleton, undefined, 'DanSkeleton')
export const DanSkeletonItem = withInstall(
  SkeletonItem,
  undefined,
  'DanSkeletonItem',
)

const plugin: Plugin = {
  install(app: App) {
    app.component('DanSkeleton', DanSkeleton)
    app.component('DanSkeletonItem', DanSkeletonItem)
  },
}

export default plugin
export type DanSkeletonInstance = InstanceType<typeof Skeleton>
export type DanSkeletonItemInstance = InstanceType<typeof SkeletonItem>
export type { SkeletonThrottle } from './context'
