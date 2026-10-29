import { withInstall } from '../../utils/withInstall'
import InfiniteList from './InfiniteList.vue'

export const DanInfiniteList = withInstall(
  InfiniteList,
  undefined,
  'DanInfiniteList',
)
export default DanInfiniteList
export type DanInfiniteListInstance = InstanceType<typeof InfiniteList>
