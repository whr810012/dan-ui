import { withInstall } from '../../utils/withInstall'
import Space from './Space.vue'

export const DanSpace = withInstall(Space, undefined, 'DanSpace')
export default DanSpace
export type DanSpaceInstance = InstanceType<typeof Space>
