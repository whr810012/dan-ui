import { withInstall } from '../../utils/withInstall'
import Rate from './Rate.vue'

export const DanRate = withInstall(Rate, undefined, 'DanRate')
export default DanRate
export type DanRateInstance = InstanceType<typeof Rate>
