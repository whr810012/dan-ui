import { withInstall } from '../../utils/withInstall'
import Statistic from './Statistic.vue'

export const DanStatistic = withInstall(Statistic, undefined, 'DanStatistic')
export default DanStatistic
export type DanStatisticInstance = InstanceType<typeof Statistic>
