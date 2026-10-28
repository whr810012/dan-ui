import { withInstall } from '../../utils/withInstall'
import ConversationList from './ConversationList.vue'

export const DanConversationList = withInstall(
  ConversationList,
  undefined,
  'DanConversationList',
)
export default DanConversationList
export type DanConversationListInstance = InstanceType<typeof ConversationList>
