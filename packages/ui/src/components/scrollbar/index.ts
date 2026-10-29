import { withInstall } from '../../utils/withInstall'
import Scrollbar from './Scrollbar.vue'

export const DanScrollbar = withInstall(Scrollbar, undefined, 'DanScrollbar')
export default DanScrollbar
export type DanScrollbarInstance = InstanceType<typeof Scrollbar>
