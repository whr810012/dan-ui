import { withInstall } from '../../utils/withInstall'
import Progress from './Progress.vue'

export const DanProgress = withInstall(Progress, undefined, 'DanProgress')
export default DanProgress
export type DanProgressInstance = InstanceType<typeof Progress>
