import { withInstall } from '../../utils/withInstall'
import Textarea from './Textarea.vue'

export const DanTextarea = withInstall(Textarea, undefined, 'DanTextarea')
export default DanTextarea
export type DanTextareaInstance = InstanceType<typeof Textarea>
