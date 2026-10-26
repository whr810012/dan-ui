import { withInstall } from '../../utils/withInstall'
import Pagination from './Pagination.vue'

export const DanPagination = withInstall(Pagination, undefined, 'DanPagination')
export default DanPagination
export type DanPaginationInstance = InstanceType<typeof Pagination>
