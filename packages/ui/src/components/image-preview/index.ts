import { withInstall } from '../../utils/withInstall'
import ImagePreview from './ImagePreview.vue'

export const DanImagePreview = withInstall(
  ImagePreview,
  undefined,
  'DanImagePreview',
)
export default DanImagePreview
export type DanImagePreviewInstance = InstanceType<typeof ImagePreview>
