import { withInstall } from '../../utils/withInstall'
import Popconfirm from './Popconfirm.vue'

export const DanPopconfirm = withInstall(Popconfirm, undefined, 'DanPopconfirm')
export default DanPopconfirm
export type DanPopconfirmInstance = InstanceType<typeof Popconfirm>
