import { withInstall } from '../../utils/withInstall'
import Countdown from './Countdown.vue'

export const DanCountdown = withInstall(Countdown, undefined, 'DanCountdown')
export default DanCountdown
export type DanCountdownInstance = InstanceType<typeof Countdown>
