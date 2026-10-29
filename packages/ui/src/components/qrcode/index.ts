import { withInstall } from '../../utils/withInstall'
import QRCode from './QRCode.vue'

export const DanQRCode = withInstall(QRCode, undefined, 'DanQRCode')
export default DanQRCode
export type DanQRCodeInstance = InstanceType<typeof QRCode>
