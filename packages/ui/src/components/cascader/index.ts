import { withInstall } from '../../utils/withInstall'
import Cascader from './Cascader.vue'

export const DanCascader = withInstall(Cascader, undefined, 'DanCascader')
export default DanCascader
export type DanCascaderInstance = InstanceType<typeof Cascader>
export type { CascaderOption } from './types'
