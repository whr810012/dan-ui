import { withInstall } from '../../utils/withInstall'
import Chat from './Chat.vue'

export const DanChat = withInstall(Chat, undefined, 'DanChat')
export default DanChat
export type DanChatInstance = InstanceType<typeof Chat>
