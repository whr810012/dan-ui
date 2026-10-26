import { withInstall } from '../../utils/withInstall'
import ChatMessage from './ChatMessage.vue'

export const DanChatMessage = withInstall(
  ChatMessage,
  undefined,
  'DanChatMessage',
)
export default DanChatMessage
export type DanChatMessageInstance = InstanceType<typeof ChatMessage>
