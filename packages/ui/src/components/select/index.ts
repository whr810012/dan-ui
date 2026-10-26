import { withInstall } from '../../utils/withInstall'
import Select from './Select.vue'

export const DanSelect = withInstall(Select, undefined, 'DanSelect')
export default DanSelect
export type DanSelectInstance = InstanceType<typeof Select>
export type { SelectOption } from './types'
