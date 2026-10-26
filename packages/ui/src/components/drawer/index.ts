import { withInstall } from '../../utils/withInstall'
import Drawer from './Drawer.vue'

export const DanDrawer = withInstall(Drawer, undefined, 'DanDrawer')
export default DanDrawer
export type DanDrawerInstance = InstanceType<typeof Drawer>
