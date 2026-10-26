import { withInstall } from '../../utils/withInstall'
import Result from './Result.vue'

export const DanResult = withInstall(Result, undefined, 'DanResult')
export default DanResult
export type DanResultInstance = InstanceType<typeof Result>
