import { withInstall } from '../../utils/withInstall'
import PageHeader from './PageHeader.vue'

export const DanPageHeader = withInstall(PageHeader, undefined, 'DanPageHeader')
export default DanPageHeader
export type DanPageHeaderInstance = InstanceType<typeof PageHeader>
