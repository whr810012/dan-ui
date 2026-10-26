import { withInstall } from '../../utils/withInstall'
import ChatInput from './ChatInput.vue'

export const DanChatInput = withInstall(ChatInput, undefined, 'DanChatInput')
export default DanChatInput
export type DanChatInputInstance = InstanceType<typeof ChatInput>
