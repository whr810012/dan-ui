import { withInstall } from '../../utils/withInstall'
import Transfer from './Transfer.vue'

export const DanTransfer = withInstall(Transfer, undefined, 'DanTransfer')
export default DanTransfer
export type DanTransferInstance = InstanceType<typeof Transfer>
export type { TransferItem } from './types'
