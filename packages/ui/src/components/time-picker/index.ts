import { withInstall } from '../../utils/withInstall'
import TimePicker from './TimePicker.vue'

export const DanTimePicker = withInstall(TimePicker, undefined, 'DanTimePicker')
export default DanTimePicker
export type DanTimePickerInstance = InstanceType<typeof TimePicker>
