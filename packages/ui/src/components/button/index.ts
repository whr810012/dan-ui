import { withInstall } from '../../utils/withInstall'
import Button from './Button.vue'

export const DanButton = withInstall(Button, undefined, 'DanButton')
export default DanButton
export type DanButtonInstance = InstanceType<typeof Button>
export type { ButtonType, ButtonNativeType, ButtonSize } from './types'
