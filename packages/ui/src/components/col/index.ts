import { withInstall } from '../../utils/withInstall'
import Col from './Col.vue'

export const DanCol = withInstall(Col, undefined, 'DanCol')
export default DanCol
export type DanColInstance = InstanceType<typeof Col>
