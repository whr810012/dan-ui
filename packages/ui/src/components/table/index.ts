import { withInstall } from '../../utils/withInstall'
import Table from './Table.vue'

export const DanTable = withInstall(Table, undefined, 'DanTable')
export default DanTable
export type DanTableInstance = InstanceType<typeof Table>
export type {
  TableAlign,
  TableColumn,
  TableColumnFilter,
  TableFilterOption,
  TableFilters,
  TableRow,
  TableSortOrder,
  TableSortState,
} from './types'
