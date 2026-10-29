import { withInstall } from '../../utils/withInstall'
import ChatWorkspace from './ChatWorkspace.vue'

export const DanChatWorkspace = withInstall(
  ChatWorkspace,
  undefined,
  'DanChatWorkspace',
)
export default DanChatWorkspace
export type DanChatWorkspaceInstance = InstanceType<typeof ChatWorkspace>
