import { withInstall } from '../../utils/withInstall'
import Empty from './Empty.vue'

export const DanEmpty = withInstall(Empty, undefined, 'DanEmpty')
export default DanEmpty
export type DanEmptyInstance = InstanceType<typeof Empty>
