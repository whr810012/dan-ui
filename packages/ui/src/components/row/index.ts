import { withInstall } from '../../utils/withInstall'
import Row from './Row.vue'

export const DanRow = withInstall(Row, undefined, 'DanRow')
export default DanRow
export type DanRowInstance = InstanceType<typeof Row>
