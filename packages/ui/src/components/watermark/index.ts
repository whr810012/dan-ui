import { withInstall } from '../../utils/withInstall'
import Watermark from './Watermark.vue'

export const DanWatermark = withInstall(Watermark, undefined, 'DanWatermark')
export default DanWatermark
export type DanWatermarkInstance = InstanceType<typeof Watermark>
