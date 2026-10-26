import { withInstall } from '../../utils/withInstall'
import Switch from './Switch.vue'

export const DanSwitch = withInstall(Switch, undefined, 'DanSwitch')
export default DanSwitch
export type DanSwitchInstance = InstanceType<typeof Switch>
