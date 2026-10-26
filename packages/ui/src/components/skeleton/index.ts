import { withInstall } from '../../utils/withInstall'
import Skeleton from './Skeleton.vue'

export const DanSkeleton = withInstall(Skeleton, undefined, 'DanSkeleton')
export default DanSkeleton
export type DanSkeletonInstance = InstanceType<typeof Skeleton>
