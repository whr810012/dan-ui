import { withInstall } from '../../utils/withInstall'
import ColorPicker from './ColorPicker.vue'

export const DanColorPicker = withInstall(
  ColorPicker,
  undefined,
  'DanColorPicker',
)
export default DanColorPicker
export type DanColorPickerInstance = InstanceType<typeof ColorPicker>
