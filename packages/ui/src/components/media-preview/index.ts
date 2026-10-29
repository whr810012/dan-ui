import { withInstall } from '../../utils/withInstall'
import MediaPreview from './MediaPreview.vue'

export const DanMediaPreview = withInstall(
  MediaPreview,
  undefined,
  'DanMediaPreview',
)
export default DanMediaPreview
export type DanMediaPreviewInstance = InstanceType<typeof MediaPreview>
