import { withInstall } from '../../utils/withInstall'
import Tag from './Tag.vue'

export const DanTag = withInstall(Tag, undefined, 'DanTag')
export default DanTag
export type DanTagInstance = InstanceType<typeof Tag>
