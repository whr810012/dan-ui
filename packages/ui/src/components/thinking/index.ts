import { withInstall } from '../../utils/withInstall'
import Thinking from './Thinking.vue'

export const DanThinking = withInstall(Thinking, undefined, 'DanThinking')
export default DanThinking
export type DanThinkingInstance = InstanceType<typeof Thinking>
