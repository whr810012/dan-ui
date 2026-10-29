import { withInstall } from '../../utils/withInstall'
import CheckTag from './CheckTag.vue'

export const DanCheckTag = withInstall(CheckTag, undefined, 'DanCheckTag')
export default DanCheckTag
export type DanCheckTagInstance = InstanceType<typeof CheckTag>
