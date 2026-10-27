import { withInstall } from '../../utils/withInstall'
import BackTop from './BackTop.vue'

export const DanBackTop = withInstall(BackTop, undefined, 'DanBackTop')
export default DanBackTop
export type DanBackTopInstance = InstanceType<typeof BackTop>
