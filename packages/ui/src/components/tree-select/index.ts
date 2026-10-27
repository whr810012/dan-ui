import { withInstall } from '../../utils/withInstall'
import TreeSelect from './TreeSelect.vue'

export const DanTreeSelect = withInstall(TreeSelect, undefined, 'DanTreeSelect')
export default DanTreeSelect
export type DanTreeSelectInstance = InstanceType<typeof TreeSelect>
