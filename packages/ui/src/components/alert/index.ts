import { withInstall } from '../../utils/withInstall'
import Alert from './Alert.vue'

export const DanAlert = withInstall(Alert, undefined, 'DanAlert')
export default DanAlert
export type DanAlertInstance = InstanceType<typeof Alert>
