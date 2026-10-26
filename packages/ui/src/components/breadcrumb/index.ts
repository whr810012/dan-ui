import { withInstall } from '../../utils/withInstall'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

export const DanBreadcrumb = withInstall(
  Breadcrumb,
  { DanBreadcrumbItem: BreadcrumbItem },
  'DanBreadcrumb',
)
export const DanBreadcrumbItem = withInstall(
  BreadcrumbItem,
  undefined,
  'DanBreadcrumbItem',
)

export default DanBreadcrumb
export type DanBreadcrumbInstance = InstanceType<typeof Breadcrumb>
export type DanBreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>
