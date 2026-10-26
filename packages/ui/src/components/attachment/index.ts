import { withInstall } from '../../utils/withInstall'
import Attachment from './Attachment.vue'

export const DanAttachment = withInstall(Attachment, undefined, 'DanAttachment')
export default DanAttachment
export type DanAttachmentInstance = InstanceType<typeof Attachment>
