import { withInstall } from '../../utils/withInstall'
import TimeSelect from './TimeSelect.vue'

export const DanTimeSelect = withInstall(TimeSelect, undefined, 'DanTimeSelect')
export default DanTimeSelect
export type DanTimeSelectInstance = InstanceType<typeof TimeSelect>
