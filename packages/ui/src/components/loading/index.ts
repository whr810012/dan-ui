import { withInstall } from '../../utils/withInstall'
import Loading from './Loading.vue'

export const DanLoading = withInstall(Loading, undefined, 'DanLoading')
export default DanLoading
export type DanLoadingInstance = InstanceType<typeof Loading>
